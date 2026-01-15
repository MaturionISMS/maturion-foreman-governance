#!/usr/bin/env python3
"""
Locked Section Protection Validation Script

Purpose: Validate locked section integrity in agent contracts
Authority: governance/canon/AGENT_CONTRACT_PROTECTION_PROTOCOL.md
Version: 1.0.0
"""

import argparse
import re
import sys
import os
from pathlib import Path
from typing import List, Dict, Set, Tuple
import subprocess


class LockedSection:
    """Represents a locked section in an agent contract"""
    
    def __init__(self, lock_id: str, file_path: str, start_line: int, end_line: int):
        self.lock_id = lock_id
        self.file_path = file_path
        self.start_line = start_line
        self.end_line = end_line
        self.metadata = {}
    
    def __repr__(self):
        return f"LockedSection({self.lock_id} in {self.file_path}:{self.start_line}-{self.end_line})"


class LockedSectionValidator:
    """Validates locked sections in agent contracts"""
    
    LOCKED_START_PATTERN = re.compile(r'<!--\s*LOCKED\s+SECTION\s+START\s*-->', re.IGNORECASE)
    LOCKED_END_PATTERN = re.compile(r'<!--\s*LOCKED\s+SECTION\s+END\s*-->', re.IGNORECASE)
    LOCK_ID_PATTERN = re.compile(r'<!--\s*Lock\s+ID:\s*(\S+)\s*-->', re.IGNORECASE)
    METADATA_END_PATTERN = re.compile(r'<!--\s*END\s+METADATA\s*-->', re.IGNORECASE)
    
    def __init__(self, contracts_dir: str):
        self.contracts_dir = Path(contracts_dir)
        self.locked_sections: List[LockedSection] = []
        self.errors: List[str] = []
        self.warnings: List[str] = []
    
    def scan_contracts(self) -> List[LockedSection]:
        """Scan all agent contracts for locked sections"""
        contract_files = list(self.contracts_dir.glob('**/*.agent.md')) + \
                        list(self.contracts_dir.glob('**/*.md'))
        
        for contract_file in contract_files:
            if contract_file.name == 'README.md':
                continue
            self._scan_file(contract_file)
        
        return self.locked_sections
    
    def _scan_file(self, file_path: Path):
        """Scan a single file for locked sections"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
        except Exception as e:
            self.errors.append(f"Error reading {file_path}: {e}")
            return
        
        in_locked_section = False
        current_section = None
        
        for i, line in enumerate(lines, start=1):
            if self.LOCKED_START_PATTERN.search(line):
                if in_locked_section:
                    self.errors.append(
                        f"{file_path}:{i} - Nested locked section detected (missing END marker?)"
                    )
                in_locked_section = True
                current_section = LockedSection('UNKNOWN', str(file_path), i, -1)
                
            elif self.LOCKED_END_PATTERN.search(line):
                if not in_locked_section:
                    self.errors.append(
                        f"{file_path}:{i} - Locked section END without START"
                    )
                else:
                    current_section.end_line = i
                    self.locked_sections.append(current_section)
                    in_locked_section = False
                    current_section = None
            
            elif in_locked_section and current_section:
                # Extract Lock ID
                lock_id_match = self.LOCK_ID_PATTERN.search(line)
                if lock_id_match:
                    current_section.lock_id = lock_id_match.group(1)
                
                # Extract other metadata (could be enhanced)
                if 'Lock Reason:' in line:
                    current_section.metadata['reason'] = line.split(':', 1)[1].strip()
                elif 'Lock Authority:' in line:
                    current_section.metadata['authority'] = line.split(':', 1)[1].strip()
        
        if in_locked_section:
            self.errors.append(
                f"{file_path}:{current_section.start_line} - Locked section START without END"
            )
    
    def validate_metadata(self) -> bool:
        """Validate locked section metadata"""
        success = True
        
        required_fields = ['Lock ID', 'Lock Reason', 'Lock Authority', 'Lock Date', 'Last Reviewed', 'Review Frequency']
        
        for section in self.locked_sections:
            if section.lock_id == 'UNKNOWN':
                self.errors.append(f"{section.file_path}:{section.start_line} - Missing Lock ID")
                success = False
            
            # Validate Lock ID format (should be LOCK-[AGENT]-[NNN])
            if not re.match(r'^LOCK-[A-Z0-9]+-\d{3}$', section.lock_id):
                self.warnings.append(
                    f"{section.file_path}:{section.start_line} - "
                    f"Lock ID '{section.lock_id}' doesn't match recommended format LOCK-[AGENT]-[NNN]"
                )
        
        return success
    
    def check_duplicate_lock_ids(self) -> bool:
        """Check for duplicate Lock IDs across contracts"""
        lock_ids = {}
        success = True
        
        for section in self.locked_sections:
            if section.lock_id in lock_ids:
                self.errors.append(
                    f"Duplicate Lock ID '{section.lock_id}' found in:\n"
                    f"  - {lock_ids[section.lock_id]}\n"
                    f"  - {section.file_path}:{section.start_line}"
                )
                success = False
            else:
                lock_ids[section.lock_id] = f"{section.file_path}:{section.start_line}"
        
        return success
    
    def detect_modifications(self, base_ref: str, head_ref: str) -> Tuple[bool, List[str]]:
        """Detect modifications to locked sections between two git refs"""
        modified_locks = []
        
        try:
            # Get diff between base and head
            diff_output = subprocess.check_output(
                ['git', 'diff', f'{base_ref}..{head_ref}', '--', '.github/agents/'],
                universal_newlines=True
            )
        except subprocess.CalledProcessError as e:
            self.errors.append(f"Error running git diff: {e}")
            return False, []
        
        # Parse diff to find modifications within locked sections
        # This is a simplified check - looks for changes to files with locked sections
        for section in self.locked_sections:
            if section.file_path in diff_output:
                # Check if the diff touches the locked section line range
                # (This is a simplified heuristic; production should be more sophisticated)
                modified_locks.append(section.lock_id)
        
        return len(modified_locks) > 0, modified_locks
    
    def verify_registry_sync(self, registry_file: str) -> bool:
        """Verify protection registry is in sync with actual locked sections"""
        registry_path = Path(registry_file)
        
        if not registry_path.exists():
            self.errors.append(f"Protection registry not found: {registry_file}")
            return False
        
        try:
            with open(registry_path, 'r', encoding='utf-8') as f:
                registry_content = f.read()
        except Exception as e:
            self.errors.append(f"Error reading registry: {e}")
            return False
        
        success = True
        
        # Check that all locked sections are registered
        for section in self.locked_sections:
            if section.lock_id not in registry_content:
                self.errors.append(
                    f"Lock ID '{section.lock_id}' in {section.file_path} not found in protection registry"
                )
                success = False
        
        return success
    
    def print_summary(self):
        """Print validation summary"""
        print("\n" + "="*80)
        print("LOCKED SECTION VALIDATION SUMMARY")
        print("="*80)
        print(f"\nScanned: {self.contracts_dir}")
        print(f"Locked sections found: {len(self.locked_sections)}")
        print(f"Errors: {len(self.errors)}")
        print(f"Warnings: {len(self.warnings)}")
        
        if self.errors:
            print("\n❌ ERRORS:")
            for error in self.errors:
                print(f"  - {error}")
        
        if self.warnings:
            print("\n⚠️  WARNINGS:")
            for warning in self.warnings:
                print(f"  - {warning}")
        
        if not self.errors and not self.warnings:
            print("\n✅ All locked section validations passed")
        
        print("="*80 + "\n")


def main():
    parser = argparse.ArgumentParser(
        description='Validate locked section integrity in agent contracts'
    )
    parser.add_argument(
        '--mode',
        choices=['detect-modifications', 'validate-metadata', 'verify-registry'],
        required=True,
        help='Validation mode'
    )
    parser.add_argument(
        '--contracts-dir',
        default='.github/agents',
        help='Directory containing agent contracts'
    )
    parser.add_argument(
        '--registry-file',
        default='governance/contracts/protection-registry.md',
        help='Path to protection registry'
    )
    parser.add_argument(
        '--base-ref',
        help='Base git reference for modification detection'
    )
    parser.add_argument(
        '--head-ref',
        help='Head git reference for modification detection'
    )
    
    args = parser.parse_args()
    
    validator = LockedSectionValidator(args.contracts_dir)
    validator.scan_contracts()
    
    success = True
    
    if args.mode == 'detect-modifications':
        if not args.base_ref or not args.head_ref:
            print("Error: --base-ref and --head-ref required for modification detection")
            sys.exit(1)
        
        modified, modified_locks = validator.detect_modifications(args.base_ref, args.head_ref)
        
        if modified:
            print("locked_sections_modified=true")
            print(f"\n⚠️  Locked section modifications detected:\n")
            for lock_id in modified_locks:
                print(f"  - {lock_id}")
            
            # Write to file for workflow consumption
            with open('/tmp/modified_lock_ids.txt', 'w') as f:
                for lock_id in modified_locks:
                    f.write(f"- {lock_id}\n")
            
            # Set GitHub Actions output
            if 'GITHUB_OUTPUT' in os.environ:
                with open(os.environ['GITHUB_OUTPUT'], 'a') as f:
                    f.write(f"locked_sections_modified=true\n")
                    f.write(f"modified_locks={', '.join(modified_locks)}\n")
        else:
            print("locked_sections_modified=false")
            print("\n✅ No locked section modifications detected")
            
            if 'GITHUB_OUTPUT' in os.environ:
                with open(os.environ['GITHUB_OUTPUT'], 'a') as f:
                    f.write(f"locked_sections_modified=false\n")
    
    elif args.mode == 'validate-metadata':
        success = validator.validate_metadata() and validator.check_duplicate_lock_ids()
        validator.print_summary()
    
    elif args.mode == 'verify-registry':
        success = validator.verify_registry_sync(args.registry_file)
        validator.print_summary()
    
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
