# Quality Integrity Enforcement Layer (QIEL) Report

**Timestamp**: 2025-12-08T09:06:28.482Z

**Overall Status**: ❌ FAILED

**Summary**: ❌ QIEL: Quality Integrity violations detected - 4 blockers, 1195 incidents


## QIC Exit Criteria Checklist

- [x] Commands executed successfully
- [ ] All log files exist
- [ ] Build logs contain zero errors or warnings
- [x] Lint logs contain zero errors or warnings
- [ ] Tests contain zero errors or warnings
- [x] Preview & production deploys both succeed
- [x] All engines initialize cleanly
- [ ] All schemas match
- [ ] Zero silent failures detected
- [ ] QI system logs zero incidents
- [ ] Governance Memory records zero unresolved QI incidents

## Blockers Found

1. Missing required log files: /tmp/build.log, /tmp/lint.log, /tmp/test.log
2. Build logs failed: build log FAILED: 1195 errors
3. Test logs failed: test log FAILED: 1016 errors
4. Schema cohesion validation FAILED - 1 engine(s) failed, 0 mismatch(es), 2 total errors

## Quality Integrity Incidents

1195 incident(s) recorded in Governance Memory:

1. **build_error** (critical)
   - ID: qi-build_error-1765184823288-aba3b952
   - Description: Build error detected: app/api/admin/approve/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:5

2. **build_error** (critical)
   - ID: qi-build_error-1765184823289-5ca16bd0
   - Description: Build error detected: app/api/builder/api/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:6

3. **build_error** (critical)
   - ID: qi-build_error-1765184823292-75d2dae5
   - Description: Build error detected: app/api/builder/integration/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:7

4. **build_error** (critical)
   - ID: qi-build_error-1765184823292-7d88586a
   - Description: Build error detected: app/api/builder/qa/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:8

5. **build_error** (critical)
   - ID: qi-build_error-1765184823293-bfd24fef
   - Description: Build error detected: app/api/builder/schema/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:9

6. **build_error** (critical)
   - ID: qi-build_error-1765184823293-7cd24b3e
   - Description: Build error detected: app/api/builder/ui/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:10

7. **build_error** (critical)
   - ID: qi-build_error-1765184823294-a2b9f3c5
   - Description: Build error detected: app/api/foreman/analytics/builders/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:11

8. **build_error** (critical)
   - ID: qi-build_error-1765184823294-9fe6319e
   - Description: Build error detected: app/api/foreman/analytics/consolidation/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:12

9. **build_error** (critical)
   - ID: qi-build_error-1765184823295-4f8effea
   - Description: Build error detected: app/api/foreman/analytics/drift/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:13

10. **build_error** (critical)
   - ID: qi-build_error-1765184823296-1c8c23d6
   - Description: Build error detected: app/api/foreman/analytics/evolution/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:14

11. **build_error** (critical)
   - ID: qi-build_error-1765184823297-26a87c38
   - Description: Build error detected: app/api/foreman/analytics/governance/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:15

12. **build_error** (critical)
   - ID: qi-build_error-1765184823297-c135c428
   - Description: Build error detected: app/api/foreman/analytics/memory/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:16

13. **build_error** (critical)
   - ID: qi-build_error-1765184823298-9dfb15f5
   - Description: Build error detected: app/api/foreman/analytics/projects/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:17

14. **build_error** (critical)
   - ID: qi-build_error-1765184823298-a1b5c5f3
   - Description: Build error detected: app/api/foreman/analytics/qiw/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:18

15. **build_error** (critical)
   - ID: qi-build_error-1765184823299-5345da7f
   - Description: Build error detected: app/api/foreman/analytics/qiw/route.ts(9,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:19

16. **build_error** (critical)
   - ID: qi-build_error-1765184823300-c515b36a
   - Description: Build error detected: app/api/foreman/analytics/qiw/route.ts(10,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:20

17. **build_error** (critical)
   - ID: qi-build_error-1765184823300-fceef321
   - Description: Build error detected: app/api/foreman/analytics/qiw/route.ts(31,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:21

18. **build_error** (critical)
   - ID: qi-build_error-1765184823301-8ec5118e
   - Description: Build error detected: app/api/foreman/analytics/qiw/route.ts(44,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:22

19. **build_error** (critical)
   - ID: qi-build_error-1765184823301-9157996c
   - Description: Build error detected: app/api/foreman/analytics/summary/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:23

20. **build_error** (critical)
   - ID: qi-build_error-1765184823302-652b4951
   - Description: Build error detected: app/api/foreman/chat/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:24

21. **build_error** (critical)
   - ID: qi-build_error-1765184823303-a5f48bcf
   - Description: Build error detected: app/api/foreman/chat/route.ts(7,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
   - Source: build.log:25

22. **build_error** (critical)
   - ID: qi-build_error-1765184823304-be650c51
   - Description: Build error detected: app/api/foreman/chat/route.ts(15,6): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:26

23. **build_error** (critical)
   - ID: qi-build_error-1765184823304-0928797a
   - Description: Build error detected: app/api/foreman/chat/route.ts(20,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:27

24. **build_error** (critical)
   - ID: qi-build_error-1765184823305-cb30af37
   - Description: Build error detected: app/api/foreman/chat/route.ts(30,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:28

25. **build_error** (critical)
   - ID: qi-build_error-1765184823306-46006e93
   - Description: Build error detected: app/api/foreman/chat/route.ts(52,37): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:29

26. **build_error** (critical)
   - ID: qi-build_error-1765184823306-7944554b
   - Description: Build error detected: app/api/foreman/feedback/route.ts(9,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:30

27. **build_error** (critical)
   - ID: qi-build_error-1765184823307-7a33223b
   - Description: Build error detected: app/api/foreman/overnight/route.ts(8,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:31

28. **build_error** (critical)
   - ID: qi-build_error-1765184823308-01cc0a94
   - Description: Build error detected: app/api/foreman/projects/[id]/blockers/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:32

29. **build_error** (critical)
   - ID: qi-build_error-1765184823309-a93c5a3a
   - Description: Build error detected: app/api/foreman/projects/[id]/dashboard/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:33

30. **build_error** (critical)
   - ID: qi-build_error-1765184823309-41639a92
   - Description: Build error detected: app/api/foreman/projects/[id]/s-curve/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:34

31. **build_error** (critical)
   - ID: qi-build_error-1765184823310-e5e80de9
   - Description: Build error detected: app/api/foreman/run-build/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:35

32. **build_error** (critical)
   - ID: qi-build_error-1765184823311-3a025339
   - Description: Build error detected: app/api/foreman/run-build/route.ts(133,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:36

33. **build_error** (critical)
   - ID: qi-build_error-1765184823311-33998640
   - Description: Build error detected: app/api/foreman/run-build/route.ts(133,61): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:37

34. **build_error** (critical)
   - ID: qi-build_error-1765184823312-8425b326
   - Description: Build error detected: app/api/foreman/run-build/route.ts(134,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:38

35. **build_error** (critical)
   - ID: qi-build_error-1765184823313-e86129b1
   - Description: Build error detected: app/api/foreman/run/route.ts(1,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:39

36. **build_error** (critical)
   - ID: qi-build_error-1765184823314-01f0a537
   - Description: Build error detected: app/api/foreman/status/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:40

37. **build_error** (critical)
   - ID: qi-build_error-1765184823314-ded97d47
   - Description: Build error detected: app/api/foreman/status/route.ts(9,22): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
   - Source: build.log:41

38. **build_error** (critical)
   - ID: qi-build_error-1765184823315-235e4abc
   - Description: Build error detected: app/api/foreman/status/route.ts(10,27): error TS2307: Cannot find module 'util' or its corresponding type declarations.
   - Source: build.log:42

39. **build_error** (critical)
   - ID: qi-build_error-1765184823316-4d473ba8
   - Description: Build error detected: app/api/foreman/status/route.ts(78,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:43

40. **build_error** (critical)
   - ID: qi-build_error-1765184823317-660c6c5b
   - Description: Build error detected: app/api/foreman/status/route.ts(79,15): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:44

41. **build_error** (critical)
   - ID: qi-build_error-1765184823317-332421c8
   - Description: Build error detected: app/api/github/webhook/route.ts(1,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:45

42. **build_error** (critical)
   - ID: qi-build_error-1765184823318-3827181c
   - Description: Build error detected: app/api/github/webhook/route.ts(25,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:46

43. **build_error** (critical)
   - ID: qi-build_error-1765184823319-52e986ab
   - Description: Build error detected: app/api/github/webhook/route.ts(37,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:47

44. **build_error** (critical)
   - ID: qi-build_error-1765184823320-0d37ddf6
   - Description: Build error detected: app/api/github/webhook/route.ts(38,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:48

45. **build_error** (critical)
   - ID: qi-build_error-1765184823320-1e6f0b36
   - Description: Build error detected: app/foreman/analytics/page.tsx(9,37): error TS2307: Cannot find module 'react' or its corresponding type declarations.
   - Source: build.log:49

46. **build_error** (critical)
   - ID: qi-build_error-1765184823321-54c03ed3
   - Description: Build error detected: app/foreman/analytics/page.tsx(81,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:50

47. **build_error** (critical)
   - ID: qi-build_error-1765184823322-a50fc92e
   - Description: Build error detected: app/foreman/analytics/page.tsx(86,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:51

48. **build_error** (critical)
   - ID: qi-build_error-1765184823322-f21b8228
   - Description: Build error detected: app/foreman/analytics/page.tsx(96,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:52

49. **build_error** (critical)
   - ID: qi-build_error-1765184823323-fb8fbcdb
   - Description: Build error detected: app/foreman/analytics/page.tsx(98,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:53

50. **build_error** (critical)
   - ID: qi-build_error-1765184823324-fa3031bf
   - Description: Build error detected: app/foreman/analytics/page.tsx(99,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:54

51. **build_error** (critical)
   - ID: qi-build_error-1765184823325-1ff29697
   - Description: Build error detected: app/foreman/analytics/page.tsx(100,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:55

52. **build_error** (critical)
   - ID: qi-build_error-1765184823326-251f5c8f
   - Description: Build error detected: app/foreman/analytics/page.tsx(102,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:56

53. **build_error** (critical)
   - ID: qi-build_error-1765184823327-594355af
   - Description: Build error detected: app/foreman/analytics/page.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:57

54. **build_error** (critical)
   - ID: qi-build_error-1765184823327-cc625d43
   - Description: Build error detected: app/foreman/analytics/page.tsx(105,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:58

55. **build_error** (critical)
   - ID: qi-build_error-1765184823328-a81938ab
   - Description: Build error detected: app/foreman/analytics/page.tsx(106,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:59

56. **build_error** (critical)
   - ID: qi-build_error-1765184823329-4b120b53
   - Description: Build error detected: app/foreman/analytics/page.tsx(107,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:60

57. **build_error** (critical)
   - ID: qi-build_error-1765184823330-7e14c972
   - Description: Build error detected: app/foreman/analytics/page.tsx(108,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:61

58. **build_error** (critical)
   - ID: qi-build_error-1765184823331-8664df75
   - Description: Build error detected: app/foreman/analytics/page.tsx(110,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:62

59. **build_error** (critical)
   - ID: qi-build_error-1765184823332-3ac85afa
   - Description: Build error detected: app/foreman/analytics/page.tsx(111,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:63

60. **build_error** (critical)
   - ID: qi-build_error-1765184823333-db49073a
   - Description: Build error detected: app/foreman/analytics/page.tsx(112,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:64

61. **build_error** (critical)
   - ID: qi-build_error-1765184823334-e8bcf530
   - Description: Build error detected: app/foreman/analytics/page.tsx(115,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
   - Source: build.log:65

62. **build_error** (critical)
   - ID: qi-build_error-1765184823335-e14c4a1e
   - Description: Build error detected: app/foreman/analytics/page.tsx(119,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:66

63. **build_error** (critical)
   - ID: qi-build_error-1765184823336-979c2b91
   - Description: Build error detected: app/foreman/analytics/page.tsx(120,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:67

64. **build_error** (critical)
   - ID: qi-build_error-1765184823337-fa0b02ac
   - Description: Build error detected: app/foreman/analytics/page.tsx(126,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:68

65. **build_error** (critical)
   - ID: qi-build_error-1765184823337-c64316ca
   - Description: Build error detected: app/foreman/analytics/page.tsx(127,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:69

66. **build_error** (critical)
   - ID: qi-build_error-1765184823338-dd425f1c
   - Description: Build error detected: app/foreman/analytics/page.tsx(128,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:70

67. **build_error** (critical)
   - ID: qi-build_error-1765184823339-dcd73331
   - Description: Build error detected: app/foreman/analytics/page.tsx(132,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:71

68. **build_error** (critical)
   - ID: qi-build_error-1765184823340-549474b8
   - Description: Build error detected: app/foreman/analytics/page.tsx(133,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:72

69. **build_error** (critical)
   - ID: qi-build_error-1765184823341-7e26a71c
   - Description: Build error detected: app/foreman/analytics/page.tsx(133,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:73

70. **build_error** (critical)
   - ID: qi-build_error-1765184823342-e2653555
   - Description: Build error detected: app/foreman/analytics/page.tsx(134,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:74

71. **build_error** (critical)
   - ID: qi-build_error-1765184823343-8ad19751
   - Description: Build error detected: app/foreman/analytics/page.tsx(139,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:75

72. **build_error** (critical)
   - ID: qi-build_error-1765184823344-7eedcdbf
   - Description: Build error detected: app/foreman/analytics/page.tsx(140,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:76

73. **build_error** (critical)
   - ID: qi-build_error-1765184823345-394ecb68
   - Description: Build error detected: app/foreman/analytics/page.tsx(141,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:77

74. **build_error** (critical)
   - ID: qi-build_error-1765184823346-3430d875
   - Description: Build error detected: app/foreman/analytics/page.tsx(142,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:78

75. **build_error** (critical)
   - ID: qi-build_error-1765184823347-afee36af
   - Description: Build error detected: app/foreman/analytics/page.tsx(142,97): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:79

76. **build_error** (critical)
   - ID: qi-build_error-1765184823347-12b2793e
   - Description: Build error detected: app/foreman/analytics/page.tsx(143,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:80

77. **build_error** (critical)
   - ID: qi-build_error-1765184823349-43ef7ee3
   - Description: Build error detected: app/foreman/analytics/page.tsx(143,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:81

78. **build_error** (critical)
   - ID: qi-build_error-1765184823349-97002a3b
   - Description: Build error detected: app/foreman/analytics/page.tsx(144,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:82

79. **build_error** (critical)
   - ID: qi-build_error-1765184823350-59b92a71
   - Description: Build error detected: app/foreman/analytics/page.tsx(144,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:83

80. **build_error** (critical)
   - ID: qi-build_error-1765184823352-fa46f89e
   - Description: Build error detected: app/foreman/analytics/page.tsx(145,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:84

81. **build_error** (critical)
   - ID: qi-build_error-1765184823353-175c2374
   - Description: Build error detected: app/foreman/analytics/page.tsx(146,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:85

82. **build_error** (critical)
   - ID: qi-build_error-1765184823354-bfe3f5ca
   - Description: Build error detected: app/foreman/analytics/page.tsx(146,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:86

83. **build_error** (critical)
   - ID: qi-build_error-1765184823355-b98c343c
   - Description: Build error detected: app/foreman/analytics/page.tsx(147,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:87

84. **build_error** (critical)
   - ID: qi-build_error-1765184823356-7c532cbe
   - Description: Build error detected: app/foreman/analytics/page.tsx(148,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:88

85. **build_error** (critical)
   - ID: qi-build_error-1765184823357-3dae4c2d
   - Description: Build error detected: app/foreman/analytics/page.tsx(153,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:89

86. **build_error** (critical)
   - ID: qi-build_error-1765184823359-df1e9519
   - Description: Build error detected: app/foreman/analytics/page.tsx(155,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:90

87. **build_error** (critical)
   - ID: qi-build_error-1765184823361-9cd6a432
   - Description: Build error detected: app/foreman/analytics/page.tsx(156,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:91

88. **build_error** (critical)
   - ID: qi-build_error-1765184823362-71bf3f74
   - Description: Build error detected: app/foreman/analytics/page.tsx(158,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:92

89. **build_error** (critical)
   - ID: qi-build_error-1765184823364-71695eb0
   - Description: Build error detected: app/foreman/analytics/page.tsx(159,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:93

90. **build_error** (critical)
   - ID: qi-build_error-1765184823365-636c0a7d
   - Description: Build error detected: app/foreman/analytics/page.tsx(160,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:94

91. **build_error** (critical)
   - ID: qi-build_error-1765184823366-ecd9d5af
   - Description: Build error detected: app/foreman/analytics/page.tsx(161,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:95

92. **build_error** (critical)
   - ID: qi-build_error-1765184823367-90fc6e1c
   - Description: Build error detected: app/foreman/analytics/page.tsx(163,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:96

93. **build_error** (critical)
   - ID: qi-build_error-1765184823369-0ceaa31d
   - Description: Build error detected: app/foreman/analytics/page.tsx(164,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:97

94. **build_error** (critical)
   - ID: qi-build_error-1765184823370-c894935b
   - Description: Build error detected: app/foreman/analytics/page.tsx(164,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:98

95. **build_error** (critical)
   - ID: qi-build_error-1765184823371-937ebf88
   - Description: Build error detected: app/foreman/analytics/page.tsx(165,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:99

96. **build_error** (critical)
   - ID: qi-build_error-1765184823373-18501234
   - Description: Build error detected: app/foreman/analytics/page.tsx(166,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:100

97. **build_error** (critical)
   - ID: qi-build_error-1765184823374-6892d789
   - Description: Build error detected: app/foreman/analytics/page.tsx(167,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:101

98. **build_error** (critical)
   - ID: qi-build_error-1765184823375-ebcfe061
   - Description: Build error detected: app/foreman/analytics/page.tsx(169,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:102

99. **build_error** (critical)
   - ID: qi-build_error-1765184823376-fd635949
   - Description: Build error detected: app/foreman/analytics/page.tsx(170,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:103

100. **build_error** (critical)
   - ID: qi-build_error-1765184823378-5a8ff4f3
   - Description: Build error detected: app/foreman/analytics/page.tsx(170,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:104

101. **build_error** (critical)
   - ID: qi-build_error-1765184823379-71a810d9
   - Description: Build error detected: app/foreman/analytics/page.tsx(171,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:105

102. **build_error** (critical)
   - ID: qi-build_error-1765184823381-4f0d0a86
   - Description: Build error detected: app/foreman/analytics/page.tsx(172,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:106

103. **build_error** (critical)
   - ID: qi-build_error-1765184823382-0d4f8fc5
   - Description: Build error detected: app/foreman/analytics/page.tsx(173,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:107

104. **build_error** (critical)
   - ID: qi-build_error-1765184823383-7fbf06a7
   - Description: Build error detected: app/foreman/analytics/page.tsx(175,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:108

105. **build_error** (critical)
   - ID: qi-build_error-1765184823385-a55b98e4
   - Description: Build error detected: app/foreman/analytics/page.tsx(176,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:109

106. **build_error** (critical)
   - ID: qi-build_error-1765184823386-23932550
   - Description: Build error detected: app/foreman/analytics/page.tsx(176,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:110

107. **build_error** (critical)
   - ID: qi-build_error-1765184823388-a9c6b8ce
   - Description: Build error detected: app/foreman/analytics/page.tsx(177,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:111

108. **build_error** (critical)
   - ID: qi-build_error-1765184823389-b5111701
   - Description: Build error detected: app/foreman/analytics/page.tsx(178,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:112

109. **build_error** (critical)
   - ID: qi-build_error-1765184823391-6c2c41ed
   - Description: Build error detected: app/foreman/analytics/page.tsx(180,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:113

110. **build_error** (critical)
   - ID: qi-build_error-1765184823392-d2fe1529
   - Description: Build error detected: app/foreman/analytics/page.tsx(181,57): error TS7006: Parameter 'alert' implicitly has an 'any' type.
   - Source: build.log:114

111. **build_error** (critical)
   - ID: qi-build_error-1765184823394-255a8e9f
   - Description: Build error detected: app/foreman/analytics/page.tsx(181,64): error TS7006: Parameter 'idx' implicitly has an 'any' type.
   - Source: build.log:115

112. **build_error** (critical)
   - ID: qi-build_error-1765184823396-9c69b617
   - Description: Build error detected: app/foreman/analytics/page.tsx(182,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:116

113. **build_error** (critical)
   - ID: qi-build_error-1765184823397-bcb10c20
   - Description: Build error detected: app/foreman/analytics/page.tsx(184,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:117

114. **build_error** (critical)
   - ID: qi-build_error-1765184823398-671a924a
   - Description: Build error detected: app/foreman/analytics/page.tsx(186,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:118

115. **build_error** (critical)
   - ID: qi-build_error-1765184823400-1ac3d81f
   - Description: Build error detected: app/foreman/analytics/page.tsx(188,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:119

116. **build_error** (critical)
   - ID: qi-build_error-1765184823401-2c5b0a2b
   - Description: Build error detected: app/foreman/analytics/page.tsx(191,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:120

117. **build_error** (critical)
   - ID: qi-build_error-1765184823403-072123ae
   - Description: Build error detected: app/foreman/analytics/page.tsx(194,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:121

118. **build_error** (critical)
   - ID: qi-build_error-1765184823404-366ce2a3
   - Description: Build error detected: app/foreman/analytics/page.tsx(195,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:122

119. **build_error** (critical)
   - ID: qi-build_error-1765184823406-8b0415cd
   - Description: Build error detected: app/foreman/analytics/page.tsx(197,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:123

120. **build_error** (critical)
   - ID: qi-build_error-1765184823408-a5241203
   - Description: Build error detected: app/foreman/analytics/page.tsx(198,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:124

121. **build_error** (critical)
   - ID: qi-build_error-1765184823410-4e72ffd6
   - Description: Build error detected: app/foreman/analytics/page.tsx(199,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:125

122. **build_error** (critical)
   - ID: qi-build_error-1765184823412-0c4df6da
   - Description: Build error detected: app/foreman/analytics/page.tsx(200,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:126

123. **build_error** (critical)
   - ID: qi-build_error-1765184823414-040714ac
   - Description: Build error detected: app/foreman/analytics/page.tsx(200,70): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:127

124. **build_error** (critical)
   - ID: qi-build_error-1765184823415-20776b85
   - Description: Build error detected: app/foreman/analytics/page.tsx(201,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:128

125. **build_error** (critical)
   - ID: qi-build_error-1765184823417-bc353bbf
   - Description: Build error detected: app/foreman/analytics/page.tsx(201,123): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:129

126. **build_error** (critical)
   - ID: qi-build_error-1765184823418-a7cb060a
   - Description: Build error detected: app/foreman/analytics/page.tsx(202,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:130

127. **build_error** (critical)
   - ID: qi-build_error-1765184823420-75bf819b
   - Description: Build error detected: app/foreman/analytics/page.tsx(203,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:131

128. **build_error** (critical)
   - ID: qi-build_error-1765184823421-09587251
   - Description: Build error detected: app/foreman/analytics/page.tsx(204,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:132

129. **build_error** (critical)
   - ID: qi-build_error-1765184823423-e4722901
   - Description: Build error detected: app/foreman/analytics/page.tsx(204,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:133

130. **build_error** (critical)
   - ID: qi-build_error-1765184823424-3c48896e
   - Description: Build error detected: app/foreman/analytics/page.tsx(205,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:134

131. **build_error** (critical)
   - ID: qi-build_error-1765184823427-a8e141d1
   - Description: Build error detected: app/foreman/analytics/page.tsx(205,129): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:135

132. **build_error** (critical)
   - ID: qi-build_error-1765184823428-e554be47
   - Description: Build error detected: app/foreman/analytics/page.tsx(206,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:136

133. **build_error** (critical)
   - ID: qi-build_error-1765184823430-b4362815
   - Description: Build error detected: app/foreman/analytics/page.tsx(207,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:137

134. **build_error** (critical)
   - ID: qi-build_error-1765184823431-248360fa
   - Description: Build error detected: app/foreman/analytics/page.tsx(208,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:138

135. **build_error** (critical)
   - ID: qi-build_error-1765184823433-e26702ea
   - Description: Build error detected: app/foreman/analytics/page.tsx(208,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:139

136. **build_error** (critical)
   - ID: qi-build_error-1765184823434-3f03b3a5
   - Description: Build error detected: app/foreman/analytics/page.tsx(209,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:140

137. **build_error** (critical)
   - ID: qi-build_error-1765184823436-6a7cb778
   - Description: Build error detected: app/foreman/analytics/page.tsx(209,125): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:141

138. **build_error** (critical)
   - ID: qi-build_error-1765184823438-1c8cfcc5
   - Description: Build error detected: app/foreman/analytics/page.tsx(210,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:142

139. **build_error** (critical)
   - ID: qi-build_error-1765184823439-6efa5d07
   - Description: Build error detected: app/foreman/analytics/page.tsx(211,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:143

140. **build_error** (critical)
   - ID: qi-build_error-1765184823441-b09da106
   - Description: Build error detected: app/foreman/analytics/page.tsx(212,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:144

141. **build_error** (critical)
   - ID: qi-build_error-1765184823443-8ffa278f
   - Description: Build error detected: app/foreman/analytics/page.tsx(212,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:145

142. **build_error** (critical)
   - ID: qi-build_error-1765184823445-1487434f
   - Description: Build error detected: app/foreman/analytics/page.tsx(213,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:146

143. **build_error** (critical)
   - ID: qi-build_error-1765184823446-3f5ca9a7
   - Description: Build error detected: app/foreman/analytics/page.tsx(215,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:147

144. **build_error** (critical)
   - ID: qi-build_error-1765184823448-e3fddd53
   - Description: Build error detected: app/foreman/analytics/page.tsx(216,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:148

145. **build_error** (critical)
   - ID: qi-build_error-1765184823450-7edc9063
   - Description: Build error detected: app/foreman/analytics/page.tsx(217,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:149

146. **build_error** (critical)
   - ID: qi-build_error-1765184823451-ed9aa56b
   - Description: Build error detected: app/foreman/analytics/page.tsx(218,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:150

147. **build_error** (critical)
   - ID: qi-build_error-1765184823453-a25063a4
   - Description: Build error detected: app/foreman/analytics/page.tsx(218,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:151

148. **build_error** (critical)
   - ID: qi-build_error-1765184823455-91be579f
   - Description: Build error detected: app/foreman/analytics/page.tsx(219,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:152

149. **build_error** (critical)
   - ID: qi-build_error-1765184823457-88b9e997
   - Description: Build error detected: app/foreman/analytics/page.tsx(219,144): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:153

150. **build_error** (critical)
   - ID: qi-build_error-1765184823459-440fb07e
   - Description: Build error detected: app/foreman/analytics/page.tsx(220,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:154

151. **build_error** (critical)
   - ID: qi-build_error-1765184823460-bca79ff2
   - Description: Build error detected: app/foreman/analytics/page.tsx(221,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:155

152. **build_error** (critical)
   - ID: qi-build_error-1765184823462-bcdfd4ca
   - Description: Build error detected: app/foreman/analytics/page.tsx(222,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:156

153. **build_error** (critical)
   - ID: qi-build_error-1765184823464-30eae89b
   - Description: Build error detected: app/foreman/analytics/page.tsx(225,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:157

154. **build_error** (critical)
   - ID: qi-build_error-1765184823466-e4e8b5e0
   - Description: Build error detected: app/foreman/analytics/page.tsx(226,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:158

155. **build_error** (critical)
   - ID: qi-build_error-1765184823467-f053bd0b
   - Description: Build error detected: app/foreman/analytics/page.tsx(228,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:159

156. **build_error** (critical)
   - ID: qi-build_error-1765184823470-0c5da22f
   - Description: Build error detected: app/foreman/analytics/page.tsx(229,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:160

157. **build_error** (critical)
   - ID: qi-build_error-1765184823472-1c9b2dbd
   - Description: Build error detected: app/foreman/analytics/page.tsx(230,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:161

158. **build_error** (critical)
   - ID: qi-build_error-1765184823473-9a6c1882
   - Description: Build error detected: app/foreman/analytics/page.tsx(231,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:162

159. **build_error** (critical)
   - ID: qi-build_error-1765184823475-080e2e4b
   - Description: Build error detected: app/foreman/analytics/page.tsx(231,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:163

160. **build_error** (critical)
   - ID: qi-build_error-1765184823477-c700e2a3
   - Description: Build error detected: app/foreman/analytics/page.tsx(232,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:164

161. **build_error** (critical)
   - ID: qi-build_error-1765184823479-dbe81b2f
   - Description: Build error detected: app/foreman/analytics/page.tsx(232,128): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:165

162. **build_error** (critical)
   - ID: qi-build_error-1765184823481-f75d8866
   - Description: Build error detected: app/foreman/analytics/page.tsx(233,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:166

163. **build_error** (critical)
   - ID: qi-build_error-1765184823483-39e8d5b0
   - Description: Build error detected: app/foreman/analytics/page.tsx(234,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:167

164. **build_error** (critical)
   - ID: qi-build_error-1765184823485-23b5cdc6
   - Description: Build error detected: app/foreman/analytics/page.tsx(235,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:168

165. **build_error** (critical)
   - ID: qi-build_error-1765184823487-d2f41282
   - Description: Build error detected: app/foreman/analytics/page.tsx(235,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:169

166. **build_error** (critical)
   - ID: qi-build_error-1765184823489-36568727
   - Description: Build error detected: app/foreman/analytics/page.tsx(236,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:170

167. **build_error** (critical)
   - ID: qi-build_error-1765184823491-b214503b
   - Description: Build error detected: app/foreman/analytics/page.tsx(236,113): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:171

168. **build_error** (critical)
   - ID: qi-build_error-1765184823492-fe565660
   - Description: Build error detected: app/foreman/analytics/page.tsx(237,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:172

169. **build_error** (critical)
   - ID: qi-build_error-1765184823494-1ebddcf2
   - Description: Build error detected: app/foreman/analytics/page.tsx(238,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:173

170. **build_error** (critical)
   - ID: qi-build_error-1765184823497-388119f1
   - Description: Build error detected: app/foreman/analytics/page.tsx(239,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:174

171. **build_error** (critical)
   - ID: qi-build_error-1765184823499-98d1a61d
   - Description: Build error detected: app/foreman/analytics/page.tsx(239,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:175

172. **build_error** (critical)
   - ID: qi-build_error-1765184823501-1b91f12e
   - Description: Build error detected: app/foreman/analytics/page.tsx(240,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:176

173. **build_error** (critical)
   - ID: qi-build_error-1765184823503-730c7cc1
   - Description: Build error detected: app/foreman/analytics/page.tsx(240,113): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:177

174. **build_error** (critical)
   - ID: qi-build_error-1765184823505-16e3cdb2
   - Description: Build error detected: app/foreman/analytics/page.tsx(241,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:178

175. **build_error** (critical)
   - ID: qi-build_error-1765184823507-2acd0fb4
   - Description: Build error detected: app/foreman/analytics/page.tsx(242,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:179

176. **build_error** (critical)
   - ID: qi-build_error-1765184823509-8cde2de3
   - Description: Build error detected: app/foreman/analytics/page.tsx(243,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:180

177. **build_error** (critical)
   - ID: qi-build_error-1765184823512-f014ce86
   - Description: Build error detected: app/foreman/analytics/page.tsx(243,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:181

178. **build_error** (critical)
   - ID: qi-build_error-1765184823514-1b224e48
   - Description: Build error detected: app/foreman/analytics/page.tsx(244,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:182

179. **build_error** (critical)
   - ID: qi-build_error-1765184823517-8183489e
   - Description: Build error detected: app/foreman/analytics/page.tsx(244,115): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:183

180. **build_error** (critical)
   - ID: qi-build_error-1765184823519-f2bac10c
   - Description: Build error detected: app/foreman/analytics/page.tsx(245,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:184

181. **build_error** (critical)
   - ID: qi-build_error-1765184823521-2bc34a74
   - Description: Build error detected: app/foreman/analytics/page.tsx(246,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:185

182. **build_error** (critical)
   - ID: qi-build_error-1765184823523-a445533b
   - Description: Build error detected: app/foreman/analytics/page.tsx(247,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:186

183. **build_error** (critical)
   - ID: qi-build_error-1765184823526-394b2caa
   - Description: Build error detected: app/foreman/analytics/page.tsx(247,60): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:187

184. **build_error** (critical)
   - ID: qi-build_error-1765184823528-5a729d1e
   - Description: Build error detected: app/foreman/analytics/page.tsx(248,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:188

185. **build_error** (critical)
   - ID: qi-build_error-1765184823530-848f5112
   - Description: Build error detected: app/foreman/analytics/page.tsx(248,110): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:189

186. **build_error** (critical)
   - ID: qi-build_error-1765184823532-aaca1c26
   - Description: Build error detected: app/foreman/analytics/page.tsx(249,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:190

187. **build_error** (critical)
   - ID: qi-build_error-1765184823535-d716178c
   - Description: Build error detected: app/foreman/analytics/page.tsx(250,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:191

188. **build_error** (critical)
   - ID: qi-build_error-1765184823537-3b022be8
   - Description: Build error detected: app/foreman/analytics/page.tsx(251,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:192

189. **build_error** (critical)
   - ID: qi-build_error-1765184823539-2794e4b7
   - Description: Build error detected: app/foreman/analytics/page.tsx(254,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:193

190. **build_error** (critical)
   - ID: qi-build_error-1765184823542-c6ceb4ff
   - Description: Build error detected: app/foreman/analytics/page.tsx(255,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:194

191. **build_error** (critical)
   - ID: qi-build_error-1765184823544-008b6b38
   - Description: Build error detected: app/foreman/analytics/page.tsx(257,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:195

192. **build_error** (critical)
   - ID: qi-build_error-1765184823546-a9aa475c
   - Description: Build error detected: app/foreman/analytics/page.tsx(258,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:196

193. **build_error** (critical)
   - ID: qi-build_error-1765184823548-26cab3a8
   - Description: Build error detected: app/foreman/analytics/page.tsx(259,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:197

194. **build_error** (critical)
   - ID: qi-build_error-1765184823550-c91298c1
   - Description: Build error detected: app/foreman/analytics/page.tsx(260,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:198

195. **build_error** (critical)
   - ID: qi-build_error-1765184823558-e41158f1
   - Description: Build error detected: app/foreman/analytics/page.tsx(260,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:199

196. **build_error** (critical)
   - ID: qi-build_error-1765184823563-be6eb7aa
   - Description: Build error detected: app/foreman/analytics/page.tsx(261,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:200

197. **build_error** (critical)
   - ID: qi-build_error-1765184823565-74305e86
   - Description: Build error detected: app/foreman/analytics/page.tsx(261,141): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:201

198. **build_error** (critical)
   - ID: qi-build_error-1765184823568-bc0b87a3
   - Description: Build error detected: app/foreman/analytics/page.tsx(262,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:202

199. **build_error** (critical)
   - ID: qi-build_error-1765184823570-59b596ea
   - Description: Build error detected: app/foreman/analytics/page.tsx(263,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:203

200. **build_error** (critical)
   - ID: qi-build_error-1765184823572-1d09071f
   - Description: Build error detected: app/foreman/analytics/page.tsx(264,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:204

201. **build_error** (critical)
   - ID: qi-build_error-1765184823575-7481a7f8
   - Description: Build error detected: app/foreman/analytics/page.tsx(264,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:205

202. **build_error** (critical)
   - ID: qi-build_error-1765184823577-b6a611a1
   - Description: Build error detected: app/foreman/analytics/page.tsx(265,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:206

203. **build_error** (critical)
   - ID: qi-build_error-1765184823579-d8cb5335
   - Description: Build error detected: app/foreman/analytics/page.tsx(265,146): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:207

204. **build_error** (critical)
   - ID: qi-build_error-1765184823582-f3cdcdfa
   - Description: Build error detected: app/foreman/analytics/page.tsx(266,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:208

205. **build_error** (critical)
   - ID: qi-build_error-1765184823585-3d7c9e91
   - Description: Build error detected: app/foreman/analytics/page.tsx(267,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:209

206. **build_error** (critical)
   - ID: qi-build_error-1765184823587-8791bcb5
   - Description: Build error detected: app/foreman/analytics/page.tsx(268,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:210

207. **build_error** (critical)
   - ID: qi-build_error-1765184823590-6153bd17
   - Description: Build error detected: app/foreman/analytics/page.tsx(268,73): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:211

208. **build_error** (critical)
   - ID: qi-build_error-1765184823594-7c7fdf94
   - Description: Build error detected: app/foreman/analytics/page.tsx(269,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:212

209. **build_error** (critical)
   - ID: qi-build_error-1765184823596-946e8dc7
   - Description: Build error detected: app/foreman/analytics/page.tsx(269,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:213

210. **build_error** (critical)
   - ID: qi-build_error-1765184823599-215cf1ad
   - Description: Build error detected: app/foreman/analytics/page.tsx(270,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:214

211. **build_error** (critical)
   - ID: qi-build_error-1765184823601-8dc7a3be
   - Description: Build error detected: app/foreman/analytics/page.tsx(271,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:215

212. **build_error** (critical)
   - ID: qi-build_error-1765184823603-a6738b59
   - Description: Build error detected: app/foreman/analytics/page.tsx(272,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:216

213. **build_error** (critical)
   - ID: qi-build_error-1765184823606-09ccfb9f
   - Description: Build error detected: app/foreman/analytics/page.tsx(272,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:217

214. **build_error** (critical)
   - ID: qi-build_error-1765184823609-6ad110b8
   - Description: Build error detected: app/foreman/analytics/page.tsx(273,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:218

215. **build_error** (critical)
   - ID: qi-build_error-1765184823612-02ed5693
   - Description: Build error detected: app/foreman/analytics/page.tsx(273,141): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:219

216. **build_error** (critical)
   - ID: qi-build_error-1765184823614-48a5267f
   - Description: Build error detected: app/foreman/analytics/page.tsx(274,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:220

217. **build_error** (critical)
   - ID: qi-build_error-1765184823617-d1b6587a
   - Description: Build error detected: app/foreman/analytics/page.tsx(275,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:221

218. **build_error** (critical)
   - ID: qi-build_error-1765184823620-b413db13
   - Description: Build error detected: app/foreman/analytics/page.tsx(276,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:222

219. **build_error** (critical)
   - ID: qi-build_error-1765184823624-d0173e76
   - Description: Build error detected: app/foreman/analytics/page.tsx(279,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:223

220. **build_error** (critical)
   - ID: qi-build_error-1765184823627-52dfbd2e
   - Description: Build error detected: app/foreman/analytics/page.tsx(280,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:224

221. **build_error** (critical)
   - ID: qi-build_error-1765184823629-5f207d83
   - Description: Build error detected: app/foreman/analytics/page.tsx(282,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:225

222. **build_error** (critical)
   - ID: qi-build_error-1765184823632-e36df335
   - Description: Build error detected: app/foreman/analytics/page.tsx(283,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:226

223. **build_error** (critical)
   - ID: qi-build_error-1765184823634-99a28ef6
   - Description: Build error detected: app/foreman/analytics/page.tsx(284,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:227

224. **build_error** (critical)
   - ID: qi-build_error-1765184823637-d091b370
   - Description: Build error detected: app/foreman/analytics/page.tsx(285,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:228

225. **build_error** (critical)
   - ID: qi-build_error-1765184823639-e1c7a740
   - Description: Build error detected: app/foreman/analytics/page.tsx(285,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:229

226. **build_error** (critical)
   - ID: qi-build_error-1765184823642-e558cc26
   - Description: Build error detected: app/foreman/analytics/page.tsx(286,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:230

227. **build_error** (critical)
   - ID: qi-build_error-1765184823644-eb947367
   - Description: Build error detected: app/foreman/analytics/page.tsx(286,130): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:231

228. **build_error** (critical)
   - ID: qi-build_error-1765184823647-4b2e164f
   - Description: Build error detected: app/foreman/analytics/page.tsx(287,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:232

229. **build_error** (critical)
   - ID: qi-build_error-1765184823649-14c4e8cf
   - Description: Build error detected: app/foreman/analytics/page.tsx(288,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:233

230. **build_error** (critical)
   - ID: qi-build_error-1765184823652-12cbc2c2
   - Description: Build error detected: app/foreman/analytics/page.tsx(289,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:234

231. **build_error** (critical)
   - ID: qi-build_error-1765184823655-69935d1c
   - Description: Build error detected: app/foreman/analytics/page.tsx(289,74): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:235

232. **build_error** (critical)
   - ID: qi-build_error-1765184823658-195ae2ff
   - Description: Build error detected: app/foreman/analytics/page.tsx(290,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:236

233. **build_error** (critical)
   - ID: qi-build_error-1765184823660-d50315c5
   - Description: Build error detected: app/foreman/analytics/page.tsx(290,133): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:237

234. **build_error** (critical)
   - ID: qi-build_error-1765184823663-93c7cc09
   - Description: Build error detected: app/foreman/analytics/page.tsx(291,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:238

235. **build_error** (critical)
   - ID: qi-build_error-1765184823665-a19fdd42
   - Description: Build error detected: app/foreman/analytics/page.tsx(292,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:239

236. **build_error** (critical)
   - ID: qi-build_error-1765184823668-d5c2a6c9
   - Description: Build error detected: app/foreman/analytics/page.tsx(293,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:240

237. **build_error** (critical)
   - ID: qi-build_error-1765184823671-bb9e1a98
   - Description: Build error detected: app/foreman/analytics/page.tsx(293,75): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:241

238. **build_error** (critical)
   - ID: qi-build_error-1765184823673-d5f88dc6
   - Description: Build error detected: app/foreman/analytics/page.tsx(294,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:242

239. **build_error** (critical)
   - ID: qi-build_error-1765184823676-3f757e56
   - Description: Build error detected: app/foreman/analytics/page.tsx(294,134): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:243

240. **build_error** (critical)
   - ID: qi-build_error-1765184823679-dae35b9b
   - Description: Build error detected: app/foreman/analytics/page.tsx(295,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:244

241. **build_error** (critical)
   - ID: qi-build_error-1765184823682-b20fa4cd
   - Description: Build error detected: app/foreman/analytics/page.tsx(296,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:245

242. **build_error** (critical)
   - ID: qi-build_error-1765184823685-8c9dd46f
   - Description: Build error detected: app/foreman/analytics/page.tsx(297,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:246

243. **build_error** (critical)
   - ID: qi-build_error-1765184823687-e97d5d8d
   - Description: Build error detected: app/foreman/analytics/page.tsx(300,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:247

244. **build_error** (critical)
   - ID: qi-build_error-1765184823690-bfb6e6ed
   - Description: Build error detected: app/foreman/analytics/page.tsx(301,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:248

245. **build_error** (critical)
   - ID: qi-build_error-1765184823693-04e004f2
   - Description: Build error detected: app/foreman/analytics/page.tsx(303,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:249

246. **build_error** (critical)
   - ID: qi-build_error-1765184823696-3a0df21f
   - Description: Build error detected: app/foreman/analytics/page.tsx(304,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:250

247. **build_error** (critical)
   - ID: qi-build_error-1765184823698-6d8497fe
   - Description: Build error detected: app/foreman/analytics/page.tsx(305,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:251

248. **build_error** (critical)
   - ID: qi-build_error-1765184823701-09f666a0
   - Description: Build error detected: app/foreman/analytics/page.tsx(306,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:252

249. **build_error** (critical)
   - ID: qi-build_error-1765184823704-942c9474
   - Description: Build error detected: app/foreman/analytics/page.tsx(306,73): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:253

250. **build_error** (critical)
   - ID: qi-build_error-1765184823707-13f48d60
   - Description: Build error detected: app/foreman/analytics/page.tsx(307,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:254

251. **build_error** (critical)
   - ID: qi-build_error-1765184823710-4b6f6770
   - Description: Build error detected: app/foreman/analytics/page.tsx(307,122): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:255

252. **build_error** (critical)
   - ID: qi-build_error-1765184823713-9e2985db
   - Description: Build error detected: app/foreman/analytics/page.tsx(308,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:256

253. **build_error** (critical)
   - ID: qi-build_error-1765184823716-e03c35d8
   - Description: Build error detected: app/foreman/analytics/page.tsx(309,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:257

254. **build_error** (critical)
   - ID: qi-build_error-1765184823718-9bd00735
   - Description: Build error detected: app/foreman/analytics/page.tsx(310,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:258

255. **build_error** (critical)
   - ID: qi-build_error-1765184823721-4e333ac5
   - Description: Build error detected: app/foreman/analytics/page.tsx(310,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:259

256. **build_error** (critical)
   - ID: qi-build_error-1765184823724-4e26cbba
   - Description: Build error detected: app/foreman/analytics/page.tsx(311,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:260

257. **build_error** (critical)
   - ID: qi-build_error-1765184823727-fc98d435
   - Description: Build error detected: app/foreman/analytics/page.tsx(311,119): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:261

258. **build_error** (critical)
   - ID: qi-build_error-1765184823729-be6cd2a6
   - Description: Build error detected: app/foreman/analytics/page.tsx(312,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:262

259. **build_error** (critical)
   - ID: qi-build_error-1765184823733-61144f57
   - Description: Build error detected: app/foreman/analytics/page.tsx(313,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:263

260. **build_error** (critical)
   - ID: qi-build_error-1765184823736-dd1f0119
   - Description: Build error detected: app/foreman/analytics/page.tsx(314,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:264

261. **build_error** (critical)
   - ID: qi-build_error-1765184823739-8848008e
   - Description: Build error detected: app/foreman/analytics/page.tsx(314,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:265

262. **build_error** (critical)
   - ID: qi-build_error-1765184823742-640ae620
   - Description: Build error detected: app/foreman/analytics/page.tsx(315,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:266

263. **build_error** (critical)
   - ID: qi-build_error-1765184823745-990e4afd
   - Description: Build error detected: app/foreman/analytics/page.tsx(315,130): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:267

264. **build_error** (critical)
   - ID: qi-build_error-1765184823748-52aca6b6
   - Description: Build error detected: app/foreman/analytics/page.tsx(316,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:268

265. **build_error** (critical)
   - ID: qi-build_error-1765184823750-191fa7d8
   - Description: Build error detected: app/foreman/analytics/page.tsx(317,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:269

266. **build_error** (critical)
   - ID: qi-build_error-1765184823753-c8852784
   - Description: Build error detected: app/foreman/analytics/page.tsx(318,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:270

267. **build_error** (critical)
   - ID: qi-build_error-1765184823756-fc5b1582
   - Description: Build error detected: app/foreman/analytics/page.tsx(318,70): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:271

268. **build_error** (critical)
   - ID: qi-build_error-1765184823760-041b4a1a
   - Description: Build error detected: app/foreman/analytics/page.tsx(319,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:272

269. **build_error** (critical)
   - ID: qi-build_error-1765184823763-e37e23c5
   - Description: Build error detected: app/foreman/analytics/page.tsx(319,135): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:273

270. **build_error** (critical)
   - ID: qi-build_error-1765184823766-c77b2211
   - Description: Build error detected: app/foreman/analytics/page.tsx(320,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:274

271. **build_error** (critical)
   - ID: qi-build_error-1765184823769-02f1e22a
   - Description: Build error detected: app/foreman/analytics/page.tsx(321,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:275

272. **build_error** (critical)
   - ID: qi-build_error-1765184823772-99563ecc
   - Description: Build error detected: app/foreman/analytics/page.tsx(322,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:276

273. **build_error** (critical)
   - ID: qi-build_error-1765184823775-b208547e
   - Description: Build error detected: app/foreman/analytics/page.tsx(325,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:277

274. **build_error** (critical)
   - ID: qi-build_error-1765184823778-a9766fef
   - Description: Build error detected: app/foreman/analytics/page.tsx(326,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:278

275. **build_error** (critical)
   - ID: qi-build_error-1765184823781-40fda3e7
   - Description: Build error detected: app/foreman/analytics/page.tsx(328,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:279

276. **build_error** (critical)
   - ID: qi-build_error-1765184823784-882cb51b
   - Description: Build error detected: app/foreman/analytics/page.tsx(329,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:280

277. **build_error** (critical)
   - ID: qi-build_error-1765184823787-10f5ee65
   - Description: Build error detected: app/foreman/analytics/page.tsx(330,73): error TS7006: Parameter 'builder' implicitly has an 'any' type.
   - Source: build.log:281

278. **build_error** (critical)
   - ID: qi-build_error-1765184823790-e97e0179
   - Description: Build error detected: app/foreman/analytics/page.tsx(330,82): error TS7006: Parameter 'idx' implicitly has an 'any' type.
   - Source: build.log:282

279. **build_error** (critical)
   - ID: qi-build_error-1765184823794-8be1de63
   - Description: Build error detected: app/foreman/analytics/page.tsx(331,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:283

280. **build_error** (critical)
   - ID: qi-build_error-1765184823797-5f7f9f89
   - Description: Build error detected: app/foreman/analytics/page.tsx(332,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:284

281. **build_error** (critical)
   - ID: qi-build_error-1765184823800-b91de776
   - Description: Build error detected: app/foreman/analytics/page.tsx(333,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:285

282. **build_error** (critical)
   - ID: qi-build_error-1765184823803-084a6104
   - Description: Build error detected: app/foreman/analytics/page.tsx(333,86): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:286

283. **build_error** (critical)
   - ID: qi-build_error-1765184823806-520a5dbc
   - Description: Build error detected: app/foreman/analytics/page.tsx(334,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:287

284. **build_error** (critical)
   - ID: qi-build_error-1765184823809-2864b6ee
   - Description: Build error detected: app/foreman/analytics/page.tsx(336,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:288

285. **build_error** (critical)
   - ID: qi-build_error-1765184823813-f9f50c4e
   - Description: Build error detected: app/foreman/analytics/page.tsx(337,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:289

286. **build_error** (critical)
   - ID: qi-build_error-1765184823816-1c0f40be
   - Description: Build error detected: app/foreman/analytics/page.tsx(338,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:290

287. **build_error** (critical)
   - ID: qi-build_error-1765184823819-e58adefe
   - Description: Build error detected: app/foreman/analytics/page.tsx(339,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:291

288. **build_error** (critical)
   - ID: qi-build_error-1765184823822-6f790de0
   - Description: Build error detected: app/foreman/analytics/page.tsx(339,83): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:292

289. **build_error** (critical)
   - ID: qi-build_error-1765184823825-40244ba4
   - Description: Build error detected: app/foreman/analytics/page.tsx(340,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:293

290. **build_error** (critical)
   - ID: qi-build_error-1765184823829-e99438d4
   - Description: Build error detected: app/foreman/analytics/page.tsx(340,82): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:294

291. **build_error** (critical)
   - ID: qi-build_error-1765184823832-1799f305
   - Description: Build error detected: app/foreman/analytics/page.tsx(341,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:295

292. **build_error** (critical)
   - ID: qi-build_error-1765184823835-a7acb7fd
   - Description: Build error detected: app/foreman/analytics/page.tsx(342,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:296

293. **build_error** (critical)
   - ID: qi-build_error-1765184823839-d7a3bf82
   - Description: Build error detected: app/foreman/analytics/page.tsx(345,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:297

294. **build_error** (critical)
   - ID: qi-build_error-1765184823842-0e2f5971
   - Description: Build error detected: app/foreman/analytics/page.tsx(347,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:298

295. **build_error** (critical)
   - ID: qi-build_error-1765184823845-8e563f6a
   - Description: Build error detected: app/foreman/analytics/page.tsx(349,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:299

296. **build_error** (critical)
   - ID: qi-build_error-1765184823849-78c6d2bc
   - Description: Build error detected: app/foreman/analytics/page.tsx(350,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:300

297. **build_error** (critical)
   - ID: qi-build_error-1765184823852-374c8e4c
   - Description: Build error detected: app/foreman/analytics/page.tsx(353,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:301

298. **build_error** (critical)
   - ID: qi-build_error-1765184823855-403d6898
   - Description: Build error detected: app/foreman/analytics/page.tsx(354,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:302

299. **build_error** (critical)
   - ID: qi-build_error-1765184823858-b3f17871
   - Description: Build error detected: app/foreman/analytics/page.tsx(356,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:303

300. **build_error** (critical)
   - ID: qi-build_error-1765184823861-674001fa
   - Description: Build error detected: app/foreman/analytics/page.tsx(357,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:304

301. **build_error** (critical)
   - ID: qi-build_error-1765184823866-291d9d97
   - Description: Build error detected: app/foreman/analytics/page.tsx(358,67): error TS7006: Parameter 'project' implicitly has an 'any' type.
   - Source: build.log:305

302. **build_error** (critical)
   - ID: qi-build_error-1765184823870-89f45810
   - Description: Build error detected: app/foreman/analytics/page.tsx(358,76): error TS7006: Parameter 'idx' implicitly has an 'any' type.
   - Source: build.log:306

303. **build_error** (critical)
   - ID: qi-build_error-1765184823873-50439a96
   - Description: Build error detected: app/foreman/analytics/page.tsx(359,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:307

304. **build_error** (critical)
   - ID: qi-build_error-1765184823876-024e5962
   - Description: Build error detected: app/foreman/analytics/page.tsx(360,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:308

305. **build_error** (critical)
   - ID: qi-build_error-1765184823879-dc33ce66
   - Description: Build error detected: app/foreman/analytics/page.tsx(361,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:309

306. **build_error** (critical)
   - ID: qi-build_error-1765184823883-82c1e73c
   - Description: Build error detected: app/foreman/analytics/page.tsx(361,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:310

307. **build_error** (critical)
   - ID: qi-build_error-1765184823886-4bf7bbda
   - Description: Build error detected: app/foreman/analytics/page.tsx(362,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:311

308. **build_error** (critical)
   - ID: qi-build_error-1765184823889-fdf5def6
   - Description: Build error detected: app/foreman/analytics/page.tsx(364,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:312

309. **build_error** (critical)
   - ID: qi-build_error-1765184823893-4bbabde2
   - Description: Build error detected: app/foreman/analytics/page.tsx(365,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:313

310. **build_error** (critical)
   - ID: qi-build_error-1765184823896-996cca5b
   - Description: Build error detected: app/foreman/analytics/page.tsx(366,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:314

311. **build_error** (critical)
   - ID: qi-build_error-1765184823900-fcb4d009
   - Description: Build error detected: app/foreman/analytics/page.tsx(367,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:315

312. **build_error** (critical)
   - ID: qi-build_error-1765184823904-7df6c049
   - Description: Build error detected: app/foreman/analytics/page.tsx(367,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:316

313. **build_error** (critical)
   - ID: qi-build_error-1765184823907-3b3c0b15
   - Description: Build error detected: app/foreman/analytics/page.tsx(368,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:317

314. **build_error** (critical)
   - ID: qi-build_error-1765184823911-f6f9db05
   - Description: Build error detected: app/foreman/analytics/page.tsx(368,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:318

315. **build_error** (critical)
   - ID: qi-build_error-1765184823915-e27a850e
   - Description: Build error detected: app/foreman/analytics/page.tsx(369,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:319

316. **build_error** (critical)
   - ID: qi-build_error-1765184823919-9dd305cc
   - Description: Build error detected: app/foreman/analytics/page.tsx(369,61): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:320

317. **build_error** (critical)
   - ID: qi-build_error-1765184823924-69156236
   - Description: Build error detected: app/foreman/analytics/page.tsx(370,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:321

318. **build_error** (critical)
   - ID: qi-build_error-1765184823927-d621adb3
   - Description: Build error detected: app/foreman/analytics/page.tsx(371,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:322

319. **build_error** (critical)
   - ID: qi-build_error-1765184823930-cfccf66e
   - Description: Build error detected: app/foreman/analytics/page.tsx(374,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:323

320. **build_error** (critical)
   - ID: qi-build_error-1765184823934-9f728883
   - Description: Build error detected: app/foreman/analytics/page.tsx(376,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:324

321. **build_error** (critical)
   - ID: qi-build_error-1765184823937-a6b504ce
   - Description: Build error detected: app/foreman/analytics/page.tsx(378,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:325

322. **build_error** (critical)
   - ID: qi-build_error-1765184823941-163e8e8c
   - Description: Build error detected: app/foreman/analytics/page.tsx(379,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:326

323. **build_error** (critical)
   - ID: qi-build_error-1765184823944-7a712d60
   - Description: Build error detected: app/foreman/analytics/page.tsx(382,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:327

324. **build_error** (critical)
   - ID: qi-build_error-1765184823947-ff798108
   - Description: Build error detected: app/foreman/analytics/page.tsx(383,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:328

325. **build_error** (critical)
   - ID: qi-build_error-1765184823951-97ecdc2a
   - Description: Build error detected: app/foreman/analytics/page.tsx(385,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:329

326. **build_error** (critical)
   - ID: qi-build_error-1765184823955-7219f2de
   - Description: Build error detected: app/foreman/analytics/page.tsx(386,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:330

327. **build_error** (critical)
   - ID: qi-build_error-1765184823959-1b131a80
   - Description: Build error detected: app/foreman/analytics/page.tsx(387,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:331

328. **build_error** (critical)
   - ID: qi-build_error-1765184823963-4cc814df
   - Description: Build error detected: app/foreman/analytics/page.tsx(388,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:332

329. **build_error** (critical)
   - ID: qi-build_error-1765184823967-8fa33e54
   - Description: Build error detected: app/foreman/analytics/page.tsx(388,75): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:333

330. **build_error** (critical)
   - ID: qi-build_error-1765184823971-25d17a39
   - Description: Build error detected: app/foreman/analytics/page.tsx(389,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:334

331. **build_error** (critical)
   - ID: qi-build_error-1765184823975-2f6b0b43
   - Description: Build error detected: app/foreman/analytics/page.tsx(389,123): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:335

332. **build_error** (critical)
   - ID: qi-build_error-1765184823980-8eb03e69
   - Description: Build error detected: app/foreman/analytics/page.tsx(390,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:336

333. **build_error** (critical)
   - ID: qi-build_error-1765184823984-583ed176
   - Description: Build error detected: app/foreman/analytics/page.tsx(391,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:337

334. **build_error** (critical)
   - ID: qi-build_error-1765184823987-2adbe183
   - Description: Build error detected: app/foreman/analytics/page.tsx(392,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:338

335. **build_error** (critical)
   - ID: qi-build_error-1765184823991-cdcb41db
   - Description: Build error detected: app/foreman/analytics/page.tsx(392,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:339

336. **build_error** (critical)
   - ID: qi-build_error-1765184823994-13e76af4
   - Description: Build error detected: app/foreman/analytics/page.tsx(393,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:340

337. **build_error** (critical)
   - ID: qi-build_error-1765184823998-80bd7ded
   - Description: Build error detected: app/foreman/analytics/page.tsx(393,136): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:341

338. **build_error** (critical)
   - ID: qi-build_error-1765184824001-3450b7ea
   - Description: Build error detected: app/foreman/analytics/page.tsx(394,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:342

339. **build_error** (critical)
   - ID: qi-build_error-1765184824005-994b4bf3
   - Description: Build error detected: app/foreman/analytics/page.tsx(395,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:343

340. **build_error** (critical)
   - ID: qi-build_error-1765184824008-24d4dc71
   - Description: Build error detected: app/foreman/analytics/page.tsx(396,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:344

341. **build_error** (critical)
   - ID: qi-build_error-1765184824012-69edcc04
   - Description: Build error detected: app/foreman/analytics/page.tsx(396,74): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:345

342. **build_error** (critical)
   - ID: qi-build_error-1765184824015-de27fe0d
   - Description: Build error detected: app/foreman/analytics/page.tsx(397,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:346

343. **build_error** (critical)
   - ID: qi-build_error-1765184824019-d13767ff
   - Description: Build error detected: app/foreman/analytics/page.tsx(397,148): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:347

344. **build_error** (critical)
   - ID: qi-build_error-1765184824023-e0d6a34a
   - Description: Build error detected: app/foreman/analytics/page.tsx(398,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:348

345. **build_error** (critical)
   - ID: qi-build_error-1765184824026-5a18e33f
   - Description: Build error detected: app/foreman/analytics/page.tsx(400,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:349

346. **build_error** (critical)
   - ID: qi-build_error-1765184824032-26388207
   - Description: Build error detected: app/foreman/analytics/page.tsx(401,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:350

347. **build_error** (critical)
   - ID: qi-build_error-1765184824035-6e1b5a37
   - Description: Build error detected: app/foreman/analytics/page.tsx(401,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:351

348. **build_error** (critical)
   - ID: qi-build_error-1765184824039-31007f71
   - Description: Build error detected: app/foreman/analytics/page.tsx(402,81): error TS7006: Parameter 'rule' implicitly has an 'any' type.
   - Source: build.log:352

349. **build_error** (critical)
   - ID: qi-build_error-1765184824043-932ba6eb
   - Description: Build error detected: app/foreman/analytics/page.tsx(402,87): error TS7006: Parameter 'idx' implicitly has an 'any' type.
   - Source: build.log:353

350. **build_error** (critical)
   - ID: qi-build_error-1765184824047-3ebad15f
   - Description: Build error detected: app/foreman/analytics/page.tsx(403,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:354

351. **build_error** (critical)
   - ID: qi-build_error-1765184824050-5cd9c30a
   - Description: Build error detected: app/foreman/analytics/page.tsx(405,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:355

352. **build_error** (critical)
   - ID: qi-build_error-1765184824054-b01ce2e3
   - Description: Build error detected: app/foreman/analytics/page.tsx(407,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:356

353. **build_error** (critical)
   - ID: qi-build_error-1765184824058-b86148f2
   - Description: Build error detected: app/foreman/analytics/page.tsx(409,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:357

354. **build_error** (critical)
   - ID: qi-build_error-1765184824061-63fe6409
   - Description: Build error detected: app/foreman/analytics/page.tsx(410,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:358

355. **build_error** (critical)
   - ID: qi-build_error-1765184824065-d980538c
   - Description: Build error detected: app/foreman/analytics/page.tsx(412,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:359

356. **build_error** (critical)
   - ID: qi-build_error-1765184824069-667ae79f
   - Description: Build error detected: app/foreman/analytics/page.tsx(413,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:360

357. **build_error** (critical)
   - ID: qi-build_error-1765184824072-37b455ee
   - Description: Build error detected: app/foreman/analytics/page.tsx(415,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:361

358. **build_error** (critical)
   - ID: qi-build_error-1765184824076-ecc62d50
   - Description: Build error detected: app/foreman/analytics/page.tsx(416,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:362

359. **build_error** (critical)
   - ID: qi-build_error-1765184824080-4f1750aa
   - Description: Build error detected: app/foreman/analytics/page.tsx(419,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:363

360. **build_error** (critical)
   - ID: qi-build_error-1765184824085-9ddbdadb
   - Description: Build error detected: app/foreman/analytics/page.tsx(424,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:364

361. **build_error** (critical)
   - ID: qi-build_error-1765184824089-4651c8cf
   - Description: Build error detected: app/foreman/analytics/page.tsx(425,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:365

362. **build_error** (critical)
   - ID: qi-build_error-1765184824093-477a06bd
   - Description: Build error detected: app/foreman/page.tsx(8,45): error TS2307: Cannot find module 'react' or its corresponding type declarations.
   - Source: build.log:366

363. **build_error** (critical)
   - ID: qi-build_error-1765184824096-d3434519
   - Description: Build error detected: app/foreman/page.tsx(55,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:367

364. **build_error** (critical)
   - ID: qi-build_error-1765184824100-ae660ba2
   - Description: Build error detected: app/foreman/page.tsx(97,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:368

365. **build_error** (critical)
   - ID: qi-build_error-1765184824104-2584947c
   - Description: Build error detected: app/foreman/page.tsx(107,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:369

366. **build_error** (critical)
   - ID: qi-build_error-1765184824107-d84c7ac6
   - Description: Build error detected: app/foreman/page.tsx(125,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:370

367. **build_error** (critical)
   - ID: qi-build_error-1765184824111-dc170e0f
   - Description: Build error detected: app/foreman/page.tsx(175,22): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:371

368. **build_error** (critical)
   - ID: qi-build_error-1765184824115-87d9051f
   - Description: Build error detected: app/foreman/page.tsx(186,22): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:372

369. **build_error** (critical)
   - ID: qi-build_error-1765184824119-ba917990
   - Description: Build error detected: app/foreman/page.tsx(197,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:373

370. **build_error** (critical)
   - ID: qi-build_error-1765184824123-81fdfc54
   - Description: Build error detected: app/foreman/page.tsx(204,30): error TS2503: Cannot find namespace 'React'.
   - Source: build.log:374

371. **build_error** (critical)
   - ID: qi-build_error-1765184824127-b325d202
   - Description: Build error detected: app/foreman/page.tsx(212,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:375

372. **build_error** (critical)
   - ID: qi-build_error-1765184824131-28d8aa43
   - Description: Build error detected: app/foreman/page.tsx(217,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:376

373. **build_error** (critical)
   - ID: qi-build_error-1765184824138-94ae9c4b
   - Description: Build error detected: app/foreman/page.tsx(231,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:377

374. **build_error** (critical)
   - ID: qi-build_error-1765184824142-0442d880
   - Description: Build error detected: app/foreman/page.tsx(233,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:378

375. **build_error** (critical)
   - ID: qi-build_error-1765184824145-432f5d4a
   - Description: Build error detected: app/foreman/page.tsx(235,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:379

376. **build_error** (critical)
   - ID: qi-build_error-1765184824149-024ba1c7
   - Description: Build error detected: app/foreman/page.tsx(237,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:380

377. **build_error** (critical)
   - ID: qi-build_error-1765184824153-41700bbc
   - Description: Build error detected: app/foreman/page.tsx(238,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:381

378. **build_error** (critical)
   - ID: qi-build_error-1765184824157-15b950f6
   - Description: Build error detected: app/foreman/page.tsx(239,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:382

379. **build_error** (critical)
   - ID: qi-build_error-1765184824161-2357df41
   - Description: Build error detected: app/foreman/page.tsx(239,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:383

380. **build_error** (critical)
   - ID: qi-build_error-1765184824165-50128655
   - Description: Build error detected: app/foreman/page.tsx(240,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:384

381. **build_error** (critical)
   - ID: qi-build_error-1765184824169-6beb4779
   - Description: Build error detected: app/foreman/page.tsx(241,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:385

382. **build_error** (critical)
   - ID: qi-build_error-1765184824173-3baaf863
   - Description: Build error detected: app/foreman/page.tsx(243,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:386

383. **build_error** (critical)
   - ID: qi-build_error-1765184824177-4a40c117
   - Description: Build error detected: app/foreman/page.tsx(244,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:387

384. **build_error** (critical)
   - ID: qi-build_error-1765184824181-e9f4faa8
   - Description: Build error detected: app/foreman/page.tsx(244,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:388

385. **build_error** (critical)
   - ID: qi-build_error-1765184824184-3d413650
   - Description: Build error detected: app/foreman/page.tsx(245,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:389

386. **build_error** (critical)
   - ID: qi-build_error-1765184824190-fa9d575e
   - Description: Build error detected: app/foreman/page.tsx(246,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:390

387. **build_error** (critical)
   - ID: qi-build_error-1765184824194-d1d429ee
   - Description: Build error detected: app/foreman/page.tsx(247,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:391

388. **build_error** (critical)
   - ID: qi-build_error-1765184824198-1d3df2b3
   - Description: Build error detected: app/foreman/page.tsx(247,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:392

389. **build_error** (critical)
   - ID: qi-build_error-1765184824202-770b6aa8
   - Description: Build error detected: app/foreman/page.tsx(248,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:393

390. **build_error** (critical)
   - ID: qi-build_error-1765184824206-e5015bd0
   - Description: Build error detected: app/foreman/page.tsx(248,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:394

391. **build_error** (critical)
   - ID: qi-build_error-1765184824210-0f65f26c
   - Description: Build error detected: app/foreman/page.tsx(249,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:395

392. **build_error** (critical)
   - ID: qi-build_error-1765184824214-eb4f3f7e
   - Description: Build error detected: app/foreman/page.tsx(250,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:396

393. **build_error** (critical)
   - ID: qi-build_error-1765184824218-ac79bf9a
   - Description: Build error detected: app/foreman/page.tsx(251,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:397

394. **build_error** (critical)
   - ID: qi-build_error-1765184824222-2934fe16
   - Description: Build error detected: app/foreman/page.tsx(251,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:398

395. **build_error** (critical)
   - ID: qi-build_error-1765184824226-30629831
   - Description: Build error detected: app/foreman/page.tsx(252,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:399

396. **build_error** (critical)
   - ID: qi-build_error-1765184824230-f0bb782e
   - Description: Build error detected: app/foreman/page.tsx(252,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:400

397. **build_error** (critical)
   - ID: qi-build_error-1765184824234-06ee819c
   - Description: Build error detected: app/foreman/page.tsx(253,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:401

398. **build_error** (critical)
   - ID: qi-build_error-1765184824240-cb4f611f
   - Description: Build error detected: app/foreman/page.tsx(254,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:402

399. **build_error** (critical)
   - ID: qi-build_error-1765184824244-6f68da3b
   - Description: Build error detected: app/foreman/page.tsx(255,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:403

400. **build_error** (critical)
   - ID: qi-build_error-1765184824248-2979fe5f
   - Description: Build error detected: app/foreman/page.tsx(255,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:404

401. **build_error** (critical)
   - ID: qi-build_error-1765184824252-cef87f8b
   - Description: Build error detected: app/foreman/page.tsx(256,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:405

402. **build_error** (critical)
   - ID: qi-build_error-1765184824256-735a80ec
   - Description: Build error detected: app/foreman/page.tsx(256,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:406

403. **build_error** (critical)
   - ID: qi-build_error-1765184824260-d9adb3b2
   - Description: Build error detected: app/foreman/page.tsx(257,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:407

404. **build_error** (critical)
   - ID: qi-build_error-1765184824264-025e5df6
   - Description: Build error detected: app/foreman/page.tsx(258,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:408

405. **build_error** (critical)
   - ID: qi-build_error-1765184824269-46f643db
   - Description: Build error detected: app/foreman/page.tsx(259,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:409

406. **build_error** (critical)
   - ID: qi-build_error-1765184824273-a3e99910
   - Description: Build error detected: app/foreman/page.tsx(259,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:410

407. **build_error** (critical)
   - ID: qi-build_error-1765184824277-b691f9a0
   - Description: Build error detected: app/foreman/page.tsx(260,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:411

408. **build_error** (critical)
   - ID: qi-build_error-1765184824281-faffc427
   - Description: Build error detected: app/foreman/page.tsx(260,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:412

409. **build_error** (critical)
   - ID: qi-build_error-1765184824285-38cef0d7
   - Description: Build error detected: app/foreman/page.tsx(261,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:413

410. **build_error** (critical)
   - ID: qi-build_error-1765184824291-17373faa
   - Description: Build error detected: app/foreman/page.tsx(262,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:414

411. **build_error** (critical)
   - ID: qi-build_error-1765184824295-e509ab27
   - Description: Build error detected: app/foreman/page.tsx(263,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:415

412. **build_error** (critical)
   - ID: qi-build_error-1765184824299-2556b28a
   - Description: Build error detected: app/foreman/page.tsx(266,30): error TS7006: Parameter 'message' implicitly has an 'any' type.
   - Source: build.log:416

413. **build_error** (critical)
   - ID: qi-build_error-1765184824303-47acb575
   - Description: Build error detected: app/foreman/page.tsx(267,29): error TS2322: Type '{ key: any; message: any; }' is not assignable to type 'ChatBubbleProps'.
   - Source: build.log:417

414. **build_error** (critical)
   - ID: qi-build_error-1765184824308-b22425d0
   - Description: Build error detected: app/foreman/page.tsx(272,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:419

415. **build_error** (critical)
   - ID: qi-build_error-1765184824313-600a3ad0
   - Description: Build error detected: app/foreman/page.tsx(274,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:420

416. **build_error** (critical)
   - ID: qi-build_error-1765184824319-e8b1f672
   - Description: Build error detected: app/foreman/page.tsx(278,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:421

417. **build_error** (critical)
   - ID: qi-build_error-1765184824326-8f4ec16d
   - Description: Build error detected: app/foreman/page.tsx(279,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:422

418. **build_error** (critical)
   - ID: qi-build_error-1765184824332-3b70db8c
   - Description: Build error detected: app/foreman/page.tsx(280,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:423

419. **build_error** (critical)
   - ID: qi-build_error-1765184824339-1203719c
   - Description: Build error detected: app/foreman/page.tsx(281,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:424

420. **build_error** (critical)
   - ID: qi-build_error-1765184824345-62cd1f24
   - Description: Build error detected: app/foreman/page.tsx(282,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:425

421. **build_error** (critical)
   - ID: qi-build_error-1765184824351-c91ea21b
   - Description: Build error detected: app/foreman/page.tsx(282,103): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:426

422. **build_error** (critical)
   - ID: qi-build_error-1765184824359-0bfb65c9
   - Description: Build error detected: app/foreman/page.tsx(283,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:427

423. **build_error** (critical)
   - ID: qi-build_error-1765184824365-727fb2ae
   - Description: Build error detected: app/foreman/page.tsx(283,138): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:428

424. **build_error** (critical)
   - ID: qi-build_error-1765184824371-24f30f88
   - Description: Build error detected: app/foreman/page.tsx(284,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:429

425. **build_error** (critical)
   - ID: qi-build_error-1765184824378-5b673224
   - Description: Build error detected: app/foreman/page.tsx(284,138): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:430

426. **build_error** (critical)
   - ID: qi-build_error-1765184824384-cbd123a5
   - Description: Build error detected: app/foreman/page.tsx(285,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:431

427. **build_error** (critical)
   - ID: qi-build_error-1765184824391-4cd937cb
   - Description: Build error detected: app/foreman/page.tsx(286,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:432

428. **build_error** (critical)
   - ID: qi-build_error-1765184824397-2d1bd256
   - Description: Build error detected: app/foreman/page.tsx(286,85): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:433

429. **build_error** (critical)
   - ID: qi-build_error-1765184824403-0cdf4376
   - Description: Build error detected: app/foreman/page.tsx(287,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:434

430. **build_error** (critical)
   - ID: qi-build_error-1765184824410-630437a1
   - Description: Build error detected: app/foreman/page.tsx(288,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:435

431. **build_error** (critical)
   - ID: qi-build_error-1765184824416-66e02f94
   - Description: Build error detected: app/foreman/page.tsx(289,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:436

432. **build_error** (critical)
   - ID: qi-build_error-1765184824423-d315ff0a
   - Description: Build error detected: app/foreman/page.tsx(292,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:437

433. **build_error** (critical)
   - ID: qi-build_error-1765184824429-81ecd613
   - Description: Build error detected: app/foreman/page.tsx(293,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:438

434. **build_error** (critical)
   - ID: qi-build_error-1765184824435-449f80cd
   - Description: Build error detected: app/foreman/page.tsx(296,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:439

435. **build_error** (critical)
   - ID: qi-build_error-1765184824439-adf35c49
   - Description: Build error detected: app/foreman/page.tsx(297,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:440

436. **build_error** (critical)
   - ID: qi-build_error-1765184824444-3b1cd240
   - Description: Build error detected: app/foreman/page.tsx(298,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:441

437. **build_error** (critical)
   - ID: qi-build_error-1765184824448-a98e8eb7
   - Description: Build error detected: app/foreman/page.tsx(301,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
   - Source: build.log:442

438. **build_error** (critical)
   - ID: qi-build_error-1765184824453-61a96cae
   - Description: Build error detected: app/foreman/page.tsx(307,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:443

439. **build_error** (critical)
   - ID: qi-build_error-1765184824457-6d3adb25
   - Description: Build error detected: app/foreman/page.tsx(313,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:444

440. **build_error** (critical)
   - ID: qi-build_error-1765184824462-658023dc
   - Description: Build error detected: app/foreman/page.tsx(314,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:445

441. **build_error** (critical)
   - ID: qi-build_error-1765184824467-cd4c20fb
   - Description: Build error detected: app/foreman/page.tsx(315,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:446

442. **build_error** (critical)
   - ID: qi-build_error-1765184824472-920448b5
   - Description: Build error detected: app/foreman/page.tsx(317,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:447

443. **build_error** (critical)
   - ID: qi-build_error-1765184824476-05f5831b
   - Description: Build error detected: app/foreman/page.tsx(318,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:448

444. **build_error** (critical)
   - ID: qi-build_error-1765184824481-f949b87f
   - Description: Build error detected: app/foreman/page.tsx(319,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:449

445. **build_error** (critical)
   - ID: qi-build_error-1765184824487-25aff8fe
   - Description: Build error detected: app/foreman/page.tsx(322,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:450

446. **build_error** (critical)
   - ID: qi-build_error-1765184824492-93673525
   - Description: Build error detected: app/foreman/page.tsx(323,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:451

447. **build_error** (critical)
   - ID: qi-build_error-1765184824497-b641c031
   - Description: Build error detected: app/foreman/page.tsx(324,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:452

448. **build_error** (critical)
   - ID: qi-build_error-1765184824502-193ded34
   - Description: Build error detected: app/foreman/page.tsx(326,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:453

449. **build_error** (critical)
   - ID: qi-build_error-1765184824507-d98f723f
   - Description: Build error detected: app/foreman/page.tsx(335,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:454

450. **build_error** (critical)
   - ID: qi-build_error-1765184824511-368f2704
   - Description: Build error detected: app/foreman/page.tsx(336,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:455

451. **build_error** (critical)
   - ID: qi-build_error-1765184824516-403319f4
   - Description: Build error detected: app/foreman/page.tsx(336,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:456

452. **build_error** (critical)
   - ID: qi-build_error-1765184824521-b305f791
   - Description: Build error detected: app/foreman/page.tsx(337,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:457

453. **build_error** (critical)
   - ID: qi-build_error-1765184824526-19b7336e
   - Description: Build error detected: app/foreman/page.tsx(339,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:458

454. **build_error** (critical)
   - ID: qi-build_error-1765184824531-6d000d71
   - Description: Build error detected: app/foreman/page.tsx(340,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:459

455. **build_error** (critical)
   - ID: qi-build_error-1765184824536-e49d7803
   - Description: Build error detected: app/foreman/page.tsx(342,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:460

456. **build_error** (critical)
   - ID: qi-build_error-1765184824542-f08d07b5
   - Description: Build error detected: app/foreman/page.tsx(345,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:461

457. **build_error** (critical)
   - ID: qi-build_error-1765184824547-e4ba62b1
   - Description: Build error detected: app/foreman/page.tsx(346,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:462

458. **build_error** (critical)
   - ID: qi-build_error-1765184824552-a795777f
   - Description: Build error detected: app/foreman/page.tsx(348,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:463

459. **build_error** (critical)
   - ID: qi-build_error-1765184824557-86732083
   - Description: Build error detected: app/foreman/page.tsx(350,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:464

460. **build_error** (critical)
   - ID: qi-build_error-1765184824562-e6fed809
   - Description: Build error detected: app/foreman/page.tsx(353,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:465

461. **build_error** (critical)
   - ID: qi-build_error-1765184824567-beb6f570
   - Description: Build error detected: app/foreman/page.tsx(354,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:466

462. **build_error** (critical)
   - ID: qi-build_error-1765184824572-08017e69
   - Description: Build error detected: app/foreman/page.tsx(356,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:467

463. **build_error** (critical)
   - ID: qi-build_error-1765184824578-29dc9a6a
   - Description: Build error detected: app/foreman/page.tsx(357,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:468

464. **build_error** (critical)
   - ID: qi-build_error-1765184824583-ec08b8fd
   - Description: Build error detected: app/foreman/page.tsx(358,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:469

465. **build_error** (critical)
   - ID: qi-build_error-1765184824588-fe1474a0
   - Description: Build error detected: app/foreman/page.tsx(360,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:470

466. **build_error** (critical)
   - ID: qi-build_error-1765184824592-1d8ba813
   - Description: Build error detected: app/foreman/page.tsx(361,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:471

467. **build_error** (critical)
   - ID: qi-build_error-1765184824599-487d609d
   - Description: Build error detected: app/foreman/page.tsx(363,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:472

468. **build_error** (critical)
   - ID: qi-build_error-1765184824604-ef0f0ea9
   - Description: Build error detected: app/foreman/page.tsx(364,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:473

469. **build_error** (critical)
   - ID: qi-build_error-1765184824610-8fd72dc9
   - Description: Build error detected: app/foreman/page.tsx(366,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:474

470. **build_error** (critical)
   - ID: qi-build_error-1765184824615-c62a41a0
   - Description: Build error detected: app/foreman/page.tsx(367,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:475

471. **build_error** (critical)
   - ID: qi-build_error-1765184824620-6305ad52
   - Description: Build error detected: app/foreman/page.tsx(368,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:476

472. **build_error** (critical)
   - ID: qi-build_error-1765184824626-4c1f2366
   - Description: Build error detected: app/foreman/page.tsx(369,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:477

473. **build_error** (critical)
   - ID: qi-build_error-1765184824631-8beec9a9
   - Description: Build error detected: app/foreman/page.tsx(370,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:478

474. **build_error** (critical)
   - ID: qi-build_error-1765184824636-5b351d45
   - Description: Build error detected: app/foreman/page.tsx(371,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:479

475. **build_error** (critical)
   - ID: qi-build_error-1765184824641-eac014d9
   - Description: Build error detected: app/foreman/page.tsx(374,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:480

476. **build_error** (critical)
   - ID: qi-build_error-1765184824647-de38d354
   - Description: Build error detected: app/foreman/page.tsx(379,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:481

477. **build_error** (critical)
   - ID: qi-build_error-1765184824654-8e954162
   - Description: Build error detected: app/foreman/page.tsx(380,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:482

478. **build_error** (critical)
   - ID: qi-build_error-1765184824659-1ed4b00b
   - Description: Build error detected: app/layout.tsx(1,31): error TS2307: Cannot find module 'next' or its corresponding type declarations.
   - Source: build.log:483

479. **build_error** (critical)
   - ID: qi-build_error-1765184824665-35270def
   - Description: Build error detected: app/layout.tsx(12,13): error TS2503: Cannot find namespace 'React'.
   - Source: build.log:484

480. **build_error** (critical)
   - ID: qi-build_error-1765184824670-49dc247d
   - Description: Build error detected: app/layout.tsx(15,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:485

481. **build_error** (critical)
   - ID: qi-build_error-1765184824675-906770e6
   - Description: Build error detected: app/layout.tsx(16,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:486

482. **build_error** (critical)
   - ID: qi-build_error-1765184824680-ae2a0acb
   - Description: Build error detected: app/layout.tsx(16,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:487

483. **build_error** (critical)
   - ID: qi-build_error-1765184824685-3f7700c3
   - Description: Build error detected: app/layout.tsx(17,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:488

484. **build_error** (critical)
   - ID: qi-build_error-1765184824690-cf0883b5
   - Description: Build error detected: app/page.tsx(5,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:489

485. **build_error** (critical)
   - ID: qi-build_error-1765184824696-008afed3
   - Description: Build error detected: app/page.tsx(6,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:490

486. **build_error** (critical)
   - ID: qi-build_error-1765184824701-768011a4
   - Description: Build error detected: app/page.tsx(7,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:491

487. **build_error** (critical)
   - ID: qi-build_error-1765184824708-685e52cb
   - Description: Build error detected: app/page.tsx(7,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:492

488. **build_error** (critical)
   - ID: qi-build_error-1765184824713-e5217093
   - Description: Build error detected: app/page.tsx(8,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:493

489. **build_error** (critical)
   - ID: qi-build_error-1765184824718-5523d23c
   - Description: Build error detected: app/page.tsx(10,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:494

490. **build_error** (critical)
   - ID: qi-build_error-1765184824723-2aaed854
   - Description: Build error detected: app/page.tsx(12,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:495

491. **build_error** (critical)
   - ID: qi-build_error-1765184824728-c2327dec
   - Description: Build error detected: app/page.tsx(13,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:496

492. **build_error** (critical)
   - ID: qi-build_error-1765184824733-425a4853
   - Description: Build error detected: components/ForemanStatus.tsx(8,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:497

493. **build_error** (critical)
   - ID: qi-build_error-1765184824739-58c72699
   - Description: Build error detected: components/ForemanStatus.tsx(9,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:498

494. **build_error** (critical)
   - ID: qi-build_error-1765184824744-d6185067
   - Description: Build error detected: components/ForemanStatus.tsx(9,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:499

495. **build_error** (critical)
   - ID: qi-build_error-1765184824749-0a98987d
   - Description: Build error detected: components/ForemanStatus.tsx(10,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:500

496. **build_error** (critical)
   - ID: qi-build_error-1765184824754-ad3a1acd
   - Description: Build error detected: components/ForemanStatus.tsx(11,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:501

497. **build_error** (critical)
   - ID: qi-build_error-1765184824761-adbf1993
   - Description: Build error detected: components/ForemanStatus.tsx(12,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:502

498. **build_error** (critical)
   - ID: qi-build_error-1765184824766-8b0b9e21
   - Description: Build error detected: components/ForemanStatus.tsx(12,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:503

499. **build_error** (critical)
   - ID: qi-build_error-1765184824772-ddf5d9cf
   - Description: Build error detected: components/ForemanStatus.tsx(13,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:504

500. **build_error** (critical)
   - ID: qi-build_error-1765184824777-a49aa654
   - Description: Build error detected: components/ForemanStatus.tsx(13,62): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:505

501. **build_error** (critical)
   - ID: qi-build_error-1765184824782-b7f1c98e
   - Description: Build error detected: components/ForemanStatus.tsx(14,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:506

502. **build_error** (critical)
   - ID: qi-build_error-1765184824788-579dd7c5
   - Description: Build error detected: components/ForemanStatus.tsx(15,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:507

503. **build_error** (critical)
   - ID: qi-build_error-1765184824793-54f17841
   - Description: Build error detected: components/ForemanStatus.tsx(16,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:508

504. **build_error** (critical)
   - ID: qi-build_error-1765184824798-79f54862
   - Description: Build error detected: components/ForemanStatus.tsx(16,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:509

505. **build_error** (critical)
   - ID: qi-build_error-1765184824804-964aa43d
   - Description: Build error detected: components/ForemanStatus.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:510

506. **build_error** (critical)
   - ID: qi-build_error-1765184824809-9575ad39
   - Description: Build error detected: components/ForemanStatus.tsx(17,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:511

507. **build_error** (critical)
   - ID: qi-build_error-1765184824816-ae841ed6
   - Description: Build error detected: components/ForemanStatus.tsx(18,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:512

508. **build_error** (critical)
   - ID: qi-build_error-1765184824821-fa62696b
   - Description: Build error detected: components/ForemanStatus.tsx(19,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:513

509. **build_error** (critical)
   - ID: qi-build_error-1765184824826-c679d3ef
   - Description: Build error detected: components/ForemanStatus.tsx(20,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:514

510. **build_error** (critical)
   - ID: qi-build_error-1765184824832-1876fd96
   - Description: Build error detected: components/ForemanStatus.tsx(20,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:515

511. **build_error** (critical)
   - ID: qi-build_error-1765184824837-0de34073
   - Description: Build error detected: components/ForemanStatus.tsx(21,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:516

512. **build_error** (critical)
   - ID: qi-build_error-1765184824843-90f7000f
   - Description: Build error detected: components/ForemanStatus.tsx(21,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:517

513. **build_error** (critical)
   - ID: qi-build_error-1765184824848-dedaf409
   - Description: Build error detected: components/ForemanStatus.tsx(22,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:518

514. **build_error** (critical)
   - ID: qi-build_error-1765184824853-81650a4e
   - Description: Build error detected: components/ForemanStatus.tsx(23,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:519

515. **build_error** (critical)
   - ID: qi-build_error-1765184824859-0ac8e410
   - Description: Build error detected: components/ForemanStatus.tsx(24,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:520

516. **build_error** (critical)
   - ID: qi-build_error-1765184824864-50c827ee
   - Description: Build error detected: components/LayoutShell.tsx(6,27): error TS2307: Cannot find module 'react' or its corresponding type declarations.
   - Source: build.log:521

517. **build_error** (critical)
   - ID: qi-build_error-1765184824871-e30b8b1b
   - Description: Build error detected: components/LayoutShell.tsx(14,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:522

518. **build_error** (critical)
   - ID: qi-build_error-1765184824876-729c6595
   - Description: Build error detected: components/LayoutShell.tsx(15,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:523

519. **build_error** (critical)
   - ID: qi-build_error-1765184824882-87157d30
   - Description: Build error detected: components/LayoutShell.tsx(16,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:524

520. **build_error** (critical)
   - ID: qi-build_error-1765184824887-82912049
   - Description: Build error detected: components/LayoutShell.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:525

521. **build_error** (critical)
   - ID: qi-build_error-1765184824893-a2a13202
   - Description: Build error detected: components/LayoutShell.tsx(18,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:526

522. **build_error** (critical)
   - ID: qi-build_error-1765184824898-3aeaa065
   - Description: Build error detected: components/LayoutShell.tsx(20,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:527

523. **build_error** (critical)
   - ID: qi-build_error-1765184824904-ebfc954f
   - Description: Build error detected: components/LayoutShell.tsx(21,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:528

524. **build_error** (critical)
   - ID: qi-build_error-1765184824910-564fa1f5
   - Description: Build error detected: components/LayoutShell.tsx(22,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:529

525. **build_error** (critical)
   - ID: qi-build_error-1765184824915-7d3385f8
   - Description: Build error detected: components/LayoutShell.tsx(24,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:530

526. **build_error** (critical)
   - ID: qi-build_error-1765184824922-bdcf7753
   - Description: Build error detected: components/LayoutShell.tsx(25,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:531

527. **build_error** (critical)
   - ID: qi-build_error-1765184824928-691fbcda
   - Description: Build error detected: components/LayoutShell.tsx(27,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:532

528. **build_error** (critical)
   - ID: qi-build_error-1765184824934-55540356
   - Description: Build error detected: components/LayoutShell.tsx(28,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:533

529. **build_error** (critical)
   - ID: qi-build_error-1765184824939-c0572f39
   - Description: Build error detected: components/LayoutShell.tsx(29,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:534

530. **build_error** (critical)
   - ID: qi-build_error-1765184824945-797cd9db
   - Description: Build error detected: components/LayoutShell.tsx(30,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:535

531. **build_error** (critical)
   - ID: qi-build_error-1765184824950-f1492076
   - Description: Build error detected: components/LayoutShell.tsx(31,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:536

532. **build_error** (critical)
   - ID: qi-build_error-1765184824956-204de629
   - Description: Build error detected: components/LayoutShell.tsx(32,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:537

533. **build_error** (critical)
   - ID: qi-build_error-1765184824962-820f99a1
   - Description: Build error detected: components/LayoutShell.tsx(34,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:538

534. **build_error** (critical)
   - ID: qi-build_error-1765184824967-faeb3f73
   - Description: Build error detected: components/LayoutShell.tsx(35,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:539

535. **build_error** (critical)
   - ID: qi-build_error-1765184824975-03b4b45c
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(30,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:540

536. **build_error** (critical)
   - ID: qi-build_error-1765184824980-dedd36ca
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(31,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:541

537. **build_error** (critical)
   - ID: qi-build_error-1765184824986-0b628f67
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(31,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:542

538. **build_error** (critical)
   - ID: qi-build_error-1765184824992-113ed76a
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(32,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:543

539. **build_error** (critical)
   - ID: qi-build_error-1765184824997-d5150752
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(39,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:544

540. **build_error** (critical)
   - ID: qi-build_error-1765184825003-3237c38b
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(41,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:545

541. **build_error** (critical)
   - ID: qi-build_error-1765184825009-8dda11f9
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(52,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:546

542. **build_error** (critical)
   - ID: qi-build_error-1765184825015-4e3973a2
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(52,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:547

543. **build_error** (critical)
   - ID: qi-build_error-1765184825023-16b8fc26
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(53,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:548

544. **build_error** (critical)
   - ID: qi-build_error-1765184825034-5afbc60b
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(56,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:549

545. **build_error** (critical)
   - ID: qi-build_error-1765184825040-f51e0992
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(57,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:550

546. **build_error** (critical)
   - ID: qi-build_error-1765184825046-50f2e431
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(69,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:551

547. **build_error** (critical)
   - ID: qi-build_error-1765184825051-3d712a36
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(71,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:552

548. **build_error** (critical)
   - ID: qi-build_error-1765184825057-a5c6b642
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(71,81): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:553

549. **build_error** (critical)
   - ID: qi-build_error-1765184825063-9a368da6
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(73,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:554

550. **build_error** (critical)
   - ID: qi-build_error-1765184825069-c688b757
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(77,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:555

551. **build_error** (critical)
   - ID: qi-build_error-1765184825074-eecfe8b7
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(77,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:556

552. **build_error** (critical)
   - ID: qi-build_error-1765184825080-6f1cc2e7
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(80,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:557

553. **build_error** (critical)
   - ID: qi-build_error-1765184825087-69737f69
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(80,56): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:558

554. **build_error** (critical)
   - ID: qi-build_error-1765184825093-8c1f45a9
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(82,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:559

555. **build_error** (critical)
   - ID: qi-build_error-1765184825099-15ffb15b
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(85,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:560

556. **build_error** (critical)
   - ID: qi-build_error-1765184825105-1522b53a
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(89,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:561

557. **build_error** (critical)
   - ID: qi-build_error-1765184825110-4afdc1d5
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(90,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:562

558. **build_error** (critical)
   - ID: qi-build_error-1765184825116-709327a6
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(92,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:563

559. **build_error** (critical)
   - ID: qi-build_error-1765184825122-2de0cbec
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(93,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:564

560. **build_error** (critical)
   - ID: qi-build_error-1765184825128-c4d435fc
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(93,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:565

561. **build_error** (critical)
   - ID: qi-build_error-1765184825134-5a1fe44a
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(94,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:566

562. **build_error** (critical)
   - ID: qi-build_error-1765184825142-b3d0b3c2
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(96,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:567

563. **build_error** (critical)
   - ID: qi-build_error-1765184825148-00692945
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(97,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:568

564. **build_error** (critical)
   - ID: qi-build_error-1765184825153-ede644c8
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(100,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:569

565. **build_error** (critical)
   - ID: qi-build_error-1765184825159-61091090
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(101,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:570

566. **build_error** (critical)
   - ID: qi-build_error-1765184825165-a4579993
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(101,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:571

567. **build_error** (critical)
   - ID: qi-build_error-1765184825171-e5fcfdee
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(102,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:572

568. **build_error** (critical)
   - ID: qi-build_error-1765184825177-7ba123d9
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(102,91): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:573

569. **build_error** (critical)
   - ID: qi-build_error-1765184825183-930f3637
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:574

570. **build_error** (critical)
   - ID: qi-build_error-1765184825189-8da65d87
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(106,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:575

571. **build_error** (critical)
   - ID: qi-build_error-1765184825196-3747bfc3
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(107,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:576

572. **build_error** (critical)
   - ID: qi-build_error-1765184825202-eb712516
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(107,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:577

573. **build_error** (critical)
   - ID: qi-build_error-1765184825208-3ae7817e
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(108,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:578

574. **build_error** (critical)
   - ID: qi-build_error-1765184825214-43d24fde
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(115,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:579

575. **build_error** (critical)
   - ID: qi-build_error-1765184825221-706d0846
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(116,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:580

576. **build_error** (critical)
   - ID: qi-build_error-1765184825227-d6c0eee3
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(118,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:581

577. **build_error** (critical)
   - ID: qi-build_error-1765184825233-e06f3932
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(119,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:582

578. **build_error** (critical)
   - ID: qi-build_error-1765184825239-a4b400b1
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(124,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:583

579. **build_error** (critical)
   - ID: qi-build_error-1765184825245-78da0cd7
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(125,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:584

580. **build_error** (critical)
   - ID: qi-build_error-1765184825252-f76e62b4
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(126,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:585

581. **build_error** (critical)
   - ID: qi-build_error-1765184825258-a114722b
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(126,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:586

582. **build_error** (critical)
   - ID: qi-build_error-1765184825264-6a82e5c0
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(127,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:587

583. **build_error** (critical)
   - ID: qi-build_error-1765184825270-cd70f863
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(127,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:588

584. **build_error** (critical)
   - ID: qi-build_error-1765184825277-9aedc08b
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(128,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:589

585. **build_error** (critical)
   - ID: qi-build_error-1765184825283-c574805c
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(129,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:590

586. **build_error** (critical)
   - ID: qi-build_error-1765184825289-a19e6545
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(131,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:591

587. **build_error** (critical)
   - ID: qi-build_error-1765184825295-76edd705
   - Description: Build error detected: components/foreman/ChatBubble.tsx(8,27): error TS2307: Cannot find module 'react-markdown' or its corresponding type declarations.
   - Source: build.log:592

588. **build_error** (critical)
   - ID: qi-build_error-1765184825303-6324bb0f
   - Description: Build error detected: components/foreman/ChatBubble.tsx(9,23): error TS2307: Cannot find module 'remark-gfm' or its corresponding type declarations.
   - Source: build.log:593

589. **build_error** (critical)
   - ID: qi-build_error-1765184825310-1df4423b
   - Description: Build error detected: components/foreman/ChatBubble.tsx(22,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:594

590. **build_error** (critical)
   - ID: qi-build_error-1765184825316-b0c132aa
   - Description: Build error detected: components/foreman/ChatBubble.tsx(23,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:595

591. **build_error** (critical)
   - ID: qi-build_error-1765184825322-bcca885a
   - Description: Build error detected: components/foreman/ChatBubble.tsx(31,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:596

592. **build_error** (critical)
   - ID: qi-build_error-1765184825328-2336b90f
   - Description: Build error detected: components/foreman/ChatBubble.tsx(34,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:597

593. **build_error** (critical)
   - ID: qi-build_error-1765184825334-2b5ab61a
   - Description: Build error detected: components/foreman/ChatBubble.tsx(34,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:598

594. **build_error** (critical)
   - ID: qi-build_error-1765184825341-caff461b
   - Description: Build error detected: components/foreman/ChatBubble.tsx(35,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:599

595. **build_error** (critical)
   - ID: qi-build_error-1765184825347-717bc5c4
   - Description: Build error detected: components/foreman/ChatBubble.tsx(35,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:600

596. **build_error** (critical)
   - ID: qi-build_error-1765184825355-c9c7382a
   - Description: Build error detected: components/foreman/ChatBubble.tsx(36,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:601

597. **build_error** (critical)
   - ID: qi-build_error-1765184825362-992b90cb
   - Description: Build error detected: components/foreman/ChatBubble.tsx(38,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:602

598. **build_error** (critical)
   - ID: qi-build_error-1765184825368-c9723ca6
   - Description: Build error detected: components/foreman/ChatBubble.tsx(39,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:603

599. **build_error** (critical)
   - ID: qi-build_error-1765184825374-36b6b3ef
   - Description: Build error detected: components/foreman/ChatBubble.tsx(42,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:604

600. **build_error** (critical)
   - ID: qi-build_error-1765184825381-fa7a5bad
   - Description: Build error detected: components/foreman/ChatBubble.tsx(43,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:605

601. **build_error** (critical)
   - ID: qi-build_error-1765184825387-0c1e2a9a
   - Description: Build error detected: components/foreman/ChatBubble.tsx(51,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:606

602. **build_error** (critical)
   - ID: qi-build_error-1765184825393-c66189e6
   - Description: Build error detected: components/foreman/ChatBubble.tsx(52,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:607

603. **build_error** (critical)
   - ID: qi-build_error-1765184825400-c5988a20
   - Description: Build error detected: components/foreman/ChatBubble.tsx(56,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:608

604. **build_error** (critical)
   - ID: qi-build_error-1765184825408-2e97b2ea
   - Description: Build error detected: components/foreman/ChatBubble.tsx(58,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:609

605. **build_error** (critical)
   - ID: qi-build_error-1765184825415-e2fbd1e2
   - Description: Build error detected: components/foreman/ChatBubble.tsx(64,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:610

606. **build_error** (critical)
   - ID: qi-build_error-1765184825421-d9fb01f7
   - Description: Build error detected: components/foreman/ChatBubble.tsx(67,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:611

607. **build_error** (critical)
   - ID: qi-build_error-1765184825427-f52dc8dd
   - Description: Build error detected: components/foreman/ChatBubble.tsx(73,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:612

608. **build_error** (critical)
   - ID: qi-build_error-1765184825434-0088465c
   - Description: Build error detected: components/foreman/ChatBubble.tsx(76,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:613

609. **build_error** (critical)
   - ID: qi-build_error-1765184825440-0ad4588a
   - Description: Build error detected: components/foreman/ChatBubble.tsx(82,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:614

610. **build_error** (critical)
   - ID: qi-build_error-1765184825447-13f98abe
   - Description: Build error detected: components/foreman/ChatBubble.tsx(85,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:615

611. **build_error** (critical)
   - ID: qi-build_error-1765184825453-a8a7fde6
   - Description: Build error detected: components/foreman/ChatBubble.tsx(91,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:616

612. **build_error** (critical)
   - ID: qi-build_error-1765184825461-b8259a23
   - Description: Build error detected: components/foreman/ChatBubble.tsx(94,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:617

613. **build_error** (critical)
   - ID: qi-build_error-1765184825467-29d42925
   - Description: Build error detected: components/foreman/ChatBubble.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:618

614. **build_error** (critical)
   - ID: qi-build_error-1765184825474-c98db8d3
   - Description: Build error detected: components/foreman/ChatBubble.tsx(105,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:619

615. **build_error** (critical)
   - ID: qi-build_error-1765184825480-ccb395b3
   - Description: Build error detected: components/foreman/ChatBubble.tsx(110,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:620

616. **build_error** (critical)
   - ID: qi-build_error-1765184825487-2f457273
   - Description: Build error detected: components/foreman/ChatBubble.tsx(113,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:621

617. **build_error** (critical)
   - ID: qi-build_error-1765184825493-cd41f79b
   - Description: Build error detected: components/foreman/ChatBubble.tsx(113,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:622

618. **build_error** (critical)
   - ID: qi-build_error-1765184825500-92b0fde8
   - Description: Build error detected: components/foreman/ChatBubble.tsx(114,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:623

619. **build_error** (critical)
   - ID: qi-build_error-1765184825506-3da51f73
   - Description: Build error detected: components/foreman/ChatBubble.tsx(116,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:624

620. **build_error** (critical)
   - ID: qi-build_error-1765184825514-e0ee9e9d
   - Description: Build error detected: components/foreman/ChatBubble.tsx(124,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:625

621. **build_error** (critical)
   - ID: qi-build_error-1765184825521-621b73e5
   - Description: Build error detected: components/foreman/ChatBubble.tsx(124,61): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:626

622. **build_error** (critical)
   - ID: qi-build_error-1765184825527-5ffed0cc
   - Description: Build error detected: components/foreman/ChatBubble.tsx(126,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:627

623. **build_error** (critical)
   - ID: qi-build_error-1765184825533-27b6c36d
   - Description: Build error detected: components/foreman/ChatBubble.tsx(128,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:628

624. **build_error** (critical)
   - ID: qi-build_error-1765184825540-876753a5
   - Description: Build error detected: components/foreman/ChatBubble.tsx(131,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:629

625. **build_error** (critical)
   - ID: qi-build_error-1765184825547-dae5c3a4
   - Description: Build error detected: components/foreman/ChatBubble.tsx(133,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:630

626. **build_error** (critical)
   - ID: qi-build_error-1765184825553-257cc151
   - Description: Build error detected: components/foreman/ChatBubble.tsx(135,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:631

627. **build_error** (critical)
   - ID: qi-build_error-1765184825559-9c234191
   - Description: Build error detected: components/foreman/ChatBubble.tsx(137,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:632

628. **build_error** (critical)
   - ID: qi-build_error-1765184825567-ec6adccf
   - Description: Build error detected: components/foreman/ChatBubble.tsx(138,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:633

629. **build_error** (critical)
   - ID: qi-build_error-1765184825574-c14ea59a
   - Description: Build error detected: components/foreman/ChatBubble.tsx(140,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:634

630. **build_error** (critical)
   - ID: qi-build_error-1765184825581-1a874c46
   - Description: Build error detected: components/foreman/ChatBubble.tsx(141,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:635

631. **build_error** (critical)
   - ID: qi-build_error-1765184825587-03b9cfd6
   - Description: Build error detected: components/foreman/Header.tsx(32,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:636

632. **build_error** (critical)
   - ID: qi-build_error-1765184825594-7fe3e1e2
   - Description: Build error detected: components/foreman/Header.tsx(33,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:637

633. **build_error** (critical)
   - ID: qi-build_error-1765184825600-30e10389
   - Description: Build error detected: components/foreman/Header.tsx(34,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:638

634. **build_error** (critical)
   - ID: qi-build_error-1765184825607-755c86cf
   - Description: Build error detected: components/foreman/Header.tsx(36,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:639

635. **build_error** (critical)
   - ID: qi-build_error-1765184825613-81b9208d
   - Description: Build error detected: components/foreman/Header.tsx(37,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:640

636. **build_error** (critical)
   - ID: qi-build_error-1765184825622-f8903bc2
   - Description: Build error detected: components/foreman/Header.tsx(37,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:641

637. **build_error** (critical)
   - ID: qi-build_error-1765184825629-54621e4e
   - Description: Build error detected: components/foreman/Header.tsx(38,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:642

638. **build_error** (critical)
   - ID: qi-build_error-1765184825635-0e4db18b
   - Description: Build error detected: components/foreman/Header.tsx(40,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:643

639. **build_error** (critical)
   - ID: qi-build_error-1765184825642-2fd63352
   - Description: Build error detected: components/foreman/Header.tsx(41,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:644

640. **build_error** (critical)
   - ID: qi-build_error-1765184825649-eea2b235
   - Description: Build error detected: components/foreman/Header.tsx(43,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:645

641. **build_error** (critical)
   - ID: qi-build_error-1765184825655-d8fd1272
   - Description: Build error detected: components/foreman/Header.tsx(44,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:646

642. **build_error** (critical)
   - ID: qi-build_error-1765184825662-cf0f65cd
   - Description: Build error detected: components/foreman/Header.tsx(46,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:647

643. **build_error** (critical)
   - ID: qi-build_error-1765184825669-a59471e3
   - Description: Build error detected: components/foreman/Header.tsx(47,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:648

644. **build_error** (critical)
   - ID: qi-build_error-1765184825677-9542c3ec
   - Description: Build error detected: components/foreman/Header.tsx(47,81): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:649

645. **build_error** (critical)
   - ID: qi-build_error-1765184825683-f7e28c63
   - Description: Build error detected: components/foreman/Header.tsx(48,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:650

646. **build_error** (critical)
   - ID: qi-build_error-1765184825690-b7be0bf4
   - Description: Build error detected: components/foreman/Header.tsx(48,79): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:651

647. **build_error** (critical)
   - ID: qi-build_error-1765184825697-dc222c54
   - Description: Build error detected: components/foreman/Header.tsx(49,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:652

648. **build_error** (critical)
   - ID: qi-build_error-1765184825704-3cf34377
   - Description: Build error detected: components/foreman/Header.tsx(53,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:653

649. **build_error** (critical)
   - ID: qi-build_error-1765184825711-47aa183a
   - Description: Build error detected: components/foreman/Header.tsx(53,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:654

650. **build_error** (critical)
   - ID: qi-build_error-1765184825718-143eddd9
   - Description: Build error detected: components/foreman/Header.tsx(54,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:655

651. **build_error** (critical)
   - ID: qi-build_error-1765184825727-a8fcb3c6
   - Description: Build error detected: components/foreman/Header.tsx(56,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:656

652. **build_error** (critical)
   - ID: qi-build_error-1765184825734-3667db87
   - Description: Build error detected: components/foreman/Header.tsx(59,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:657

653. **build_error** (critical)
   - ID: qi-build_error-1765184825741-e8e76acc
   - Description: Build error detected: components/foreman/Header.tsx(60,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:658

654. **build_error** (critical)
   - ID: qi-build_error-1765184825747-499dd7c9
   - Description: Build error detected: components/foreman/Header.tsx(61,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:659

655. **build_error** (critical)
   - ID: qi-build_error-1765184825754-e6527105
   - Description: Build error detected: components/foreman/Header.tsx(65,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:660

656. **build_error** (critical)
   - ID: qi-build_error-1765184825761-f6dc7499
   - Description: Build error detected: components/foreman/Header.tsx(70,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:661

657. **build_error** (critical)
   - ID: qi-build_error-1765184825768-84d76932
   - Description: Build error detected: components/foreman/Header.tsx(70,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:662

658. **build_error** (critical)
   - ID: qi-build_error-1765184825777-e3b5c505
   - Description: Build error detected: components/foreman/Header.tsx(71,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:663

659. **build_error** (critical)
   - ID: qi-build_error-1765184825784-eaa10ad7
   - Description: Build error detected: components/foreman/Header.tsx(71,34): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:664

660. **build_error** (critical)
   - ID: qi-build_error-1765184825790-8916ae82
   - Description: Build error detected: components/foreman/Header.tsx(72,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:665

661. **build_error** (critical)
   - ID: qi-build_error-1765184825797-3b42d039
   - Description: Build error detected: components/foreman/Header.tsx(74,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:666

662. **build_error** (critical)
   - ID: qi-build_error-1765184825804-9b5f94cd
   - Description: Build error detected: components/foreman/Header.tsx(75,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:667

663. **build_error** (critical)
   - ID: qi-build_error-1765184825811-205f9c3f
   - Description: Build error detected: components/foreman/Sidebar.tsx(8,26): error TS2307: Cannot find module 'react' or its corresponding type declarations.
   - Source: build.log:668

664. **build_error** (critical)
   - ID: qi-build_error-1765184825818-b813e9bf
   - Description: Build error detected: components/foreman/Sidebar.tsx(32,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:669

665. **build_error** (critical)
   - ID: qi-build_error-1765184825827-c8545134
   - Description: Build error detected: components/foreman/Sidebar.tsx(34,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:670

666. **build_error** (critical)
   - ID: qi-build_error-1765184825834-04e37d0f
   - Description: Build error detected: components/foreman/Sidebar.tsx(35,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:671

667. **build_error** (critical)
   - ID: qi-build_error-1765184825840-2c4d0086
   - Description: Build error detected: components/foreman/Sidebar.tsx(39,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:672

668. **build_error** (critical)
   - ID: qi-build_error-1765184825847-a9d603f7
   - Description: Build error detected: components/foreman/Sidebar.tsx(39,54): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:673

669. **build_error** (critical)
   - ID: qi-build_error-1765184825854-452f52f1
   - Description: Build error detected: components/foreman/Sidebar.tsx(40,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:674

670. **build_error** (critical)
   - ID: qi-build_error-1765184825861-39da6f2d
   - Description: Build error detected: components/foreman/Sidebar.tsx(40,67): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:675

671. **build_error** (critical)
   - ID: qi-build_error-1765184825868-6e9ca141
   - Description: Build error detected: components/foreman/Sidebar.tsx(52,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:676

672. **build_error** (critical)
   - ID: qi-build_error-1765184825877-aa5216c2
   - Description: Build error detected: components/foreman/Sidebar.tsx(59,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:677

673. **build_error** (critical)
   - ID: qi-build_error-1765184825884-a41c3ab8
   - Description: Build error detected: components/foreman/Sidebar.tsx(64,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:678

674. **build_error** (critical)
   - ID: qi-build_error-1765184825891-3e27d3c1
   - Description: Build error detected: components/foreman/Sidebar.tsx(70,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:679

675. **build_error** (critical)
   - ID: qi-build_error-1765184825898-c776ca51
   - Description: Build error detected: components/foreman/Sidebar.tsx(73,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:680

676. **build_error** (critical)
   - ID: qi-build_error-1765184825905-7f4fbabc
   - Description: Build error detected: components/foreman/Sidebar.tsx(74,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:681

677. **build_error** (critical)
   - ID: qi-build_error-1765184825912-5eda7dd8
   - Description: Build error detected: components/foreman/Sidebar.tsx(77,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:682

678. **build_error** (critical)
   - ID: qi-build_error-1765184825919-fcf422f7
   - Description: Build error detected: components/foreman/Sidebar.tsx(78,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:683

679. **build_error** (critical)
   - ID: qi-build_error-1765184825928-45aad5f4
   - Description: Build error detected: components/foreman/Sidebar.tsx(84,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:684

680. **build_error** (critical)
   - ID: qi-build_error-1765184825935-d421e2e7
   - Description: Build error detected: components/foreman/Sidebar.tsx(84,39): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:685

681. **build_error** (critical)
   - ID: qi-build_error-1765184825942-fd5d7bf4
   - Description: Build error detected: components/foreman/Sidebar.tsx(85,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:686

682. **build_error** (critical)
   - ID: qi-build_error-1765184825949-2164c2f5
   - Description: Build error detected: components/foreman/Sidebar.tsx(85,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:687

683. **build_error** (critical)
   - ID: qi-build_error-1765184825956-e69b9489
   - Description: Build error detected: components/foreman/Sidebar.tsx(86,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:688

684. **build_error** (critical)
   - ID: qi-build_error-1765184825963-d7e63db1
   - Description: Build error detected: components/foreman/Sidebar.tsx(87,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:689

685. **build_error** (critical)
   - ID: qi-build_error-1765184825970-5ff8f00d
   - Description: Build error detected: components/foreman/Sidebar.tsx(88,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:690

686. **build_error** (critical)
   - ID: qi-build_error-1765184825979-83466883
   - Description: Build error detected: components/foreman/StatusEvent.tsx(39,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:691

687. **build_error** (critical)
   - ID: qi-build_error-1765184825986-5fb6efe8
   - Description: Build error detected: components/foreman/StatusEvent.tsx(42,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:692

688. **build_error** (critical)
   - ID: qi-build_error-1765184825994-fcc05e7b
   - Description: Build error detected: components/foreman/StatusEvent.tsx(42,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:693

689. **build_error** (critical)
   - ID: qi-build_error-1765184826001-3f03f2d6
   - Description: Build error detected: components/foreman/StatusEvent.tsx(43,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:694

690. **build_error** (critical)
   - ID: qi-build_error-1765184826008-b022ede0
   - Description: Build error detected: components/foreman/StatusEvent.tsx(44,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:695

691. **build_error** (critical)
   - ID: qi-build_error-1765184826015-5269d19a
   - Description: Build error detected: components/foreman/StatusEvent.tsx(44,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:696

692. **build_error** (critical)
   - ID: qi-build_error-1765184826022-bc7a4d1f
   - Description: Build error detected: components/foreman/StatusEvent.tsx(46,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:697

693. **build_error** (critical)
   - ID: qi-build_error-1765184826031-1b8fa17e
   - Description: Build error detected: components/foreman/StatusEvent.tsx(48,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:698

694. **build_error** (critical)
   - ID: qi-build_error-1765184826038-94aa0f97
   - Description: Build error detected: components/foreman/StatusEvent.tsx(50,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:699

695. **build_error** (critical)
   - ID: qi-build_error-1765184826045-31ba1303
   - Description: Build error detected: components/foreman/StatusEvent.tsx(51,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:700

696. **build_error** (critical)
   - ID: qi-build_error-1765184826053-951025dc
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(8,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:701

697. **build_error** (critical)
   - ID: qi-build_error-1765184826060-2878ba5a
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(9,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:702

698. **build_error** (critical)
   - ID: qi-build_error-1765184826067-81d900eb
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(10,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:703

699. **build_error** (critical)
   - ID: qi-build_error-1765184826074-89716f35
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(11,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:704

700. **build_error** (critical)
   - ID: qi-build_error-1765184826084-1d058132
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(11,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:705

701. **build_error** (critical)
   - ID: qi-build_error-1765184826091-fddb5f90
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(12,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:706

702. **build_error** (critical)
   - ID: qi-build_error-1765184826098-7b65380c
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(13,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:707

703. **build_error** (critical)
   - ID: qi-build_error-1765184826105-8e9b5f6d
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(14,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:708

704. **build_error** (critical)
   - ID: qi-build_error-1765184826112-2673544d
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(14,85): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:709

705. **build_error** (critical)
   - ID: qi-build_error-1765184826119-5ef37d20
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(15,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:710

706. **build_error** (critical)
   - ID: qi-build_error-1765184826126-2dcbbe25
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:711

707. **build_error** (critical)
   - ID: qi-build_error-1765184826135-c0275f77
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(18,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:712

708. **build_error** (critical)
   - ID: qi-build_error-1765184826142-8599500e
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(19,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:713

709. **build_error** (critical)
   - ID: qi-build_error-1765184826149-c9f65d63
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(24,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:714

710. **build_error** (critical)
   - ID: qi-build_error-1765184826156-4c3a84c3
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(25,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:715

711. **build_error** (critical)
   - ID: qi-build_error-1765184826163-6117b0ba
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(26,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:716

712. **build_error** (critical)
   - ID: qi-build_error-1765184826169-feb4bc68
   - Description: Build error detected: lib/builder/memory-injector.ts(167,23): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:717

713. **build_error** (critical)
   - ID: qi-build_error-1765184826176-b4c833f7
   - Description: Build error detected: lib/builder/memory-injector.ts(371,12): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:718

714. **build_error** (critical)
   - ID: qi-build_error-1765184826185-c73339c2
   - Description: Build error detected: lib/builder/memory-injector.ts(376,12): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:719

715. **build_error** (critical)
   - ID: qi-build_error-1765184826192-a2d2ddcb
   - Description: Build error detected: lib/foreman/analytics/consolidation-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:720

716. **build_error** (critical)
   - ID: qi-build_error-1765184826199-bb0a92af
   - Description: Build error detected: lib/foreman/analytics/consolidation-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:721

717. **build_error** (critical)
   - ID: qi-build_error-1765184826206-61a2b9bf
   - Description: Build error detected: lib/foreman/analytics/evolution-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:722

718. **build_error** (critical)
   - ID: qi-build_error-1765184826213-b3b0577f
   - Description: Build error detected: lib/foreman/analytics/evolution-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:723

719. **build_error** (critical)
   - ID: qi-build_error-1765184826220-8d181889
   - Description: Build error detected: lib/foreman/analytics/governance-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:724

720. **build_error** (critical)
   - ID: qi-build_error-1765184826227-5d35cf90
   - Description: Build error detected: lib/foreman/analytics/governance-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:725

721. **build_error** (critical)
   - ID: qi-build_error-1765184826235-e4c08f2f
   - Description: Build error detected: lib/foreman/analytics/memory-analytics.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:726

722. **build_error** (critical)
   - ID: qi-build_error-1765184826242-426c3a11
   - Description: Build error detected: lib/foreman/analytics/memory-analytics.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:727

723. **build_error** (critical)
   - ID: qi-build_error-1765184826249-fe22e428
   - Description: Build error detected: lib/foreman/analytics/retirement-analytics.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:728

724. **build_error** (critical)
   - ID: qi-build_error-1765184826256-8643dc69
   - Description: Build error detected: lib/foreman/analytics/retirement-analytics.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:729

725. **build_error** (critical)
   - ID: qi-build_error-1765184826263-db0203b0
   - Description: Build error detected: lib/foreman/build-report.ts(8,31): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:730

726. **build_error** (critical)
   - ID: qi-build_error-1765184826270-ce0d250c
   - Description: Build error detected: lib/foreman/build-report.ts(9,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:731

727. **build_error** (critical)
   - ID: qi-build_error-1765184826277-5936e351
   - Description: Build error detected: lib/foreman/build-report.ts(473,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:732

728. **build_error** (critical)
   - ID: qi-build_error-1765184826285-43bd1f38
   - Description: Build error detected: lib/foreman/build-sequence.ts(6,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
   - Source: build.log:733

729. **build_error** (critical)
   - ID: qi-build_error-1765184826292-39c0aa22
   - Description: Build error detected: lib/foreman/build-sequence.ts(27,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:734

730. **build_error** (critical)
   - ID: qi-build_error-1765184826300-4c42d58a
   - Description: Build error detected: lib/foreman/build-sequence.ts(53,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:735

731. **build_error** (critical)
   - ID: qi-build_error-1765184826307-3521fe88
   - Description: Build error detected: lib/foreman/build-sequence.ts(54,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:736

732. **build_error** (critical)
   - ID: qi-build_error-1765184826314-d05ddcf4
   - Description: Build error detected: lib/foreman/build-sequence.ts(58,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:737

733. **build_error** (critical)
   - ID: qi-build_error-1765184826321-271f023d
   - Description: Build error detected: lib/foreman/chat-executor.ts(1371,29): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:738

734. **build_error** (critical)
   - ID: qi-build_error-1765184826328-6e726302
   - Description: Build error detected: lib/foreman/chat-executor.ts(1372,31): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:739

735. **build_error** (critical)
   - ID: qi-build_error-1765184826337-cb2f7014
   - Description: Build error detected: lib/foreman/chat-executor.ts(1374,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:740

736. **build_error** (critical)
   - ID: qi-build_error-1765184826344-1e0c0be4
   - Description: Build error detected: lib/foreman/desktop-sync.ts(16,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:741

737. **build_error** (critical)
   - ID: qi-build_error-1765184826351-693ce1f8
   - Description: Build error detected: lib/foreman/desktop-sync.ts(18,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:742

738. **build_error** (critical)
   - ID: qi-build_error-1765184826359-cffd0309
   - Description: Build error detected: lib/foreman/desktop-sync.ts(19,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:743

739. **build_error** (critical)
   - ID: qi-build_error-1765184826366-f2adeb9f
   - Description: Build error detected: lib/foreman/desktop-sync.ts(248,12): error TS2503: Cannot find namespace 'NodeJS'.
   - Source: build.log:744

740. **build_error** (critical)
   - ID: qi-build_error-1765184826373-aa3ec890
   - Description: Build error detected: lib/foreman/desktop-sync.ts(302,53): error TS2503: Cannot find namespace 'NodeJS'.
   - Source: build.log:745

741. **build_error** (critical)
   - ID: qi-build_error-1765184826380-548fb1c7
   - Description: Build error detected: lib/foreman/dispatch.ts(55,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:746

742. **build_error** (critical)
   - ID: qi-build_error-1765184826389-82740af7
   - Description: Build error detected: lib/foreman/dispatch.ts(56,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:747

743. **build_error** (critical)
   - ID: qi-build_error-1765184826396-4ef1f338
   - Description: Build error detected: lib/foreman/dispatch.ts(60,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:748

744. **build_error** (critical)
   - ID: qi-build_error-1765184826403-fc9ba769
   - Description: Build error detected: lib/foreman/dispatch.ts(69,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:749

745. **build_error** (critical)
   - ID: qi-build_error-1765184826411-e2c89f84
   - Description: Build error detected: lib/foreman/dispatch.ts(70,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:750

746. **build_error** (critical)
   - ID: qi-build_error-1765184826419-deef914d
   - Description: Build error detected: lib/foreman/dispatch.ts(72,36): error TS7006: Parameter 's' implicitly has an 'any' type.
   - Source: build.log:751

747. **build_error** (critical)
   - ID: qi-build_error-1765184826426-9291e7ae
   - Description: Build error detected: lib/foreman/feedback/processor.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:752

748. **build_error** (critical)
   - ID: qi-build_error-1765184826435-7ba575a0
   - Description: Build error detected: lib/foreman/feedback/processor.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:753

749. **build_error** (critical)
   - ID: qi-build_error-1765184826443-e4281417
   - Description: Build error detected: lib/foreman/feedback/processor.ts(32,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:754

750. **build_error** (critical)
   - ID: qi-build_error-1765184826450-dabde792
   - Description: Build error detected: lib/foreman/feedback/processor.ts(314,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:755

751. **build_error** (critical)
   - ID: qi-build_error-1765184826457-7245f71c
   - Description: Build error detected: lib/foreman/feedback/processor.ts(353,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:756

752. **build_error** (critical)
   - ID: qi-build_error-1765184826464-c911aac6
   - Description: Build error detected: lib/foreman/governance/type-safety-events.ts(8,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:757

753. **build_error** (critical)
   - ID: qi-build_error-1765184826472-8264467f
   - Description: Build error detected: lib/foreman/governance/type-safety-events.ts(9,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:758

754. **build_error** (critical)
   - ID: qi-build_error-1765184826481-ed19815b
   - Description: Build error detected: lib/foreman/governance/type-safety-events.ts(76,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:759

755. **build_error** (critical)
   - ID: qi-build_error-1765184826488-5fa580f6
   - Description: Build error detected: lib/foreman/governance/type-safety-events.ts(113,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:760

756. **build_error** (critical)
   - ID: qi-build_error-1765184826496-5368042e
   - Description: Build error detected: lib/foreman/initialization.ts(6,41): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:761

757. **build_error** (critical)
   - ID: qi-build_error-1765184826503-3e57f96e
   - Description: Build error detected: lib/foreman/initialization.ts(7,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:762

758. **build_error** (critical)
   - ID: qi-build_error-1765184826510-35e8a621
   - Description: Build error detected: lib/foreman/initialization.ts(34,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:763

759. **build_error** (critical)
   - ID: qi-build_error-1765184826518-76093a01
   - Description: Build error detected: lib/foreman/initialization.ts(35,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:764

760. **build_error** (critical)
   - ID: qi-build_error-1765184826527-d83b1742
   - Description: Build error detected: lib/foreman/initialization.ts(36,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:765

761. **build_error** (critical)
   - ID: qi-build_error-1765184826534-7662b941
   - Description: Build error detected: lib/foreman/initialization.ts(37,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:766

762. **build_error** (critical)
   - ID: qi-build_error-1765184826541-69c06d5a
   - Description: Build error detected: lib/foreman/initialization.ts(66,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:767

763. **build_error** (critical)
   - ID: qi-build_error-1765184826549-048b56b7
   - Description: Build error detected: lib/foreman/initialization.ts(89,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:768

764. **build_error** (critical)
   - ID: qi-build_error-1765184826556-21763aa7
   - Description: Build error detected: lib/foreman/initialization.ts(90,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:769

765. **build_error** (critical)
   - ID: qi-build_error-1765184826564-31d66376
   - Description: Build error detected: lib/foreman/initialization.ts(91,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:770

766. **build_error** (critical)
   - ID: qi-build_error-1765184826573-51a98cd8
   - Description: Build error detected: lib/foreman/initialization.ts(92,23): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:771

767. **build_error** (critical)
   - ID: qi-build_error-1765184826580-6dcbcbc5
   - Description: Build error detected: lib/foreman/initialization.ts(125,29): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:772

768. **build_error** (critical)
   - ID: qi-build_error-1765184826587-6e246501
   - Description: Build error detected: lib/foreman/initialization.ts(203,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:773

769. **build_error** (critical)
   - ID: qi-build_error-1765184826595-112cf4a5
   - Description: Build error detected: lib/foreman/initialization.ts(203,66): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:774

770. **build_error** (critical)
   - ID: qi-build_error-1765184826603-a794c12f
   - Description: Build error detected: lib/foreman/initialization.ts(204,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:775

771. **build_error** (critical)
   - ID: qi-build_error-1765184826610-ae76ea7b
   - Description: Build error detected: lib/foreman/initialization.ts(204,64): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:776

772. **build_error** (critical)
   - ID: qi-build_error-1765184826619-291a4e94
   - Description: Build error detected: lib/foreman/initialization.ts(216,57): error TS7006: Parameter 's' implicitly has an 'any' type.
   - Source: build.log:777

773. **build_error** (critical)
   - ID: qi-build_error-1765184826627-3d2a29f0
   - Description: Build error detected: lib/foreman/initialization.ts(232,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:778

774. **build_error** (critical)
   - ID: qi-build_error-1765184826635-0b7776c3
   - Description: Build error detected: lib/foreman/initialization.ts(258,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:779

775. **build_error** (critical)
   - ID: qi-build_error-1765184826642-a7e3bcee
   - Description: Build error detected: lib/foreman/local-builder.ts(64,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:780

776. **build_error** (critical)
   - ID: qi-build_error-1765184826650-c63ae7fa
   - Description: Build error detected: lib/foreman/local-builder.ts(110,28): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:781

777. **build_error** (critical)
   - ID: qi-build_error-1765184826657-78e8e632
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:782

778. **build_error** (critical)
   - ID: qi-build_error-1765184826666-94cf642d
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:783

779. **build_error** (critical)
   - ID: qi-build_error-1765184826674-c3fc0853
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(11,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
   - Source: build.log:784

780. **build_error** (critical)
   - ID: qi-build_error-1765184826682-4ae0237b
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(12,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
   - Source: build.log:785

781. **build_error** (critical)
   - ID: qi-build_error-1765184826689-45c88cac
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(56,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:786

782. **build_error** (critical)
   - ID: qi-build_error-1765184826697-5d7013ac
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(84,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:787

783. **build_error** (critical)
   - ID: qi-build_error-1765184826705-56f6670e
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(324,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:788

784. **build_error** (critical)
   - ID: qi-build_error-1765184826714-34f4782b
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(21,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:789

785. **build_error** (critical)
   - ID: qi-build_error-1765184826722-ff852d67
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(22,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:790

786. **build_error** (critical)
   - ID: qi-build_error-1765184826730-222790a8
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(23,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
   - Source: build.log:791

787. **build_error** (critical)
   - ID: qi-build_error-1765184826737-bbfcffa4
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(24,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
   - Source: build.log:792

788. **build_error** (critical)
   - ID: qi-build_error-1765184826745-b0a3199c
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(90,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:793

789. **build_error** (critical)
   - ID: qi-build_error-1765184826752-b54d30a6
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(398,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:794

790. **build_error** (critical)
   - ID: qi-build_error-1765184826762-4bd4ac83
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(595,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:795

791. **build_error** (critical)
   - ID: qi-build_error-1765184826769-66c347a0
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(930,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:796

792. **build_error** (critical)
   - ID: qi-build_error-1765184826777-cb3bf70d
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:797

793. **build_error** (critical)
   - ID: qi-build_error-1765184826785-19c44df6
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:798

794. **build_error** (critical)
   - ID: qi-build_error-1765184826793-28f6d0b5
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(114,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:799

795. **build_error** (critical)
   - ID: qi-build_error-1765184826800-312d05e4
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(134,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:800

796. **build_error** (critical)
   - ID: qi-build_error-1765184826810-52b68d2a
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(193,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:801

797. **build_error** (critical)
   - ID: qi-build_error-1765184826818-a5bb7303
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(199,50): error TS7006: Parameter 'f' implicitly has an 'any' type.
   - Source: build.log:802

798. **build_error** (critical)
   - ID: qi-build_error-1765184826826-3949ce1b
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(259,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:803

799. **build_error** (critical)
   - ID: qi-build_error-1765184826833-aa24526b
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(294,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:804

800. **build_error** (critical)
   - ID: qi-build_error-1765184826841-35bf3bca
   - Description: Build error detected: lib/foreman/memory/retirement-engine.ts(15,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:805

801. **build_error** (critical)
   - ID: qi-build_error-1765184826849-5d31917a
   - Description: Build error detected: lib/foreman/memory/retirement-engine.ts(16,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:806

802. **build_error** (critical)
   - ID: qi-build_error-1765184826858-c5100b4d
   - Description: Build error detected: lib/foreman/memory/retirement-engine.ts(65,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:807

803. **build_error** (critical)
   - ID: qi-build_error-1765184826866-fe208673
   - Description: Build error detected: lib/foreman/memory/retirement-engine.ts(89,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:808

804. **build_error** (critical)
   - ID: qi-build_error-1765184826874-27779c25
   - Description: Build error detected: lib/foreman/memory/retirement-engine.ts(394,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:809

805. **build_error** (critical)
   - ID: qi-build_error-1765184826882-dd2a6dfb
   - Description: Build error detected: lib/foreman/memory/storage.ts(6,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:810

806. **build_error** (critical)
   - ID: qi-build_error-1765184826890-e567b543
   - Description: Build error detected: lib/foreman/memory/storage.ts(7,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:811

807. **build_error** (critical)
   - ID: qi-build_error-1765184826897-c686a3f7
   - Description: Build error detected: lib/foreman/memory/storage.ts(19,23): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:812

808. **build_error** (critical)
   - ID: qi-build_error-1765184826907-e846a90f
   - Description: Build error detected: lib/foreman/orchestrator.ts(1,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
   - Source: build.log:813

809. **build_error** (critical)
   - ID: qi-build_error-1765184826915-a613335d
   - Description: Build error detected: lib/foreman/orchestrator.ts(6,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:814

810. **build_error** (critical)
   - ID: qi-build_error-1765184826923-b573edb4
   - Description: Build error detected: lib/foreman/overnight-execution.ts(24,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:815

811. **build_error** (critical)
   - ID: qi-build_error-1765184826931-f548c33e
   - Description: Build error detected: lib/foreman/overnight-execution.ts(48,23): error TS7006: Parameter 'issue' implicitly has an 'any' type.
   - Source: build.log:816

812. **build_error** (critical)
   - ID: qi-build_error-1765184826939-27b6d52a
   - Description: Build error detected: lib/foreman/overnight-execution.ts(52,32): error TS7006: Parameter 'label' implicitly has an 'any' type.
   - Source: build.log:817

813. **build_error** (critical)
   - ID: qi-build_error-1765184826947-b972c5ec
   - Description: Build error detected: lib/foreman/pilot-qa-check.ts(6,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:818

814. **build_error** (critical)
   - ID: qi-build_error-1765184826956-a1b61474
   - Description: Build error detected: lib/foreman/pilot-qa-check.ts(7,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:819

815. **build_error** (critical)
   - ID: qi-build_error-1765184826964-1248cedb
   - Description: Build error detected: lib/foreman/pilot-qa-check.ts(26,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:820

816. **build_error** (critical)
   - ID: qi-build_error-1765184826975-fe49a66d
   - Description: Build error detected: lib/foreman/pilot-qa-check.ts(91,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:821

817. **build_error** (critical)
   - ID: qi-build_error-1765184826983-80171160
   - Description: Build error detected: lib/foreman/projects/storage.ts(6,16): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
   - Source: build.log:822

818. **build_error** (critical)
   - ID: qi-build_error-1765184826990-34836ba8
   - Description: Build error detected: lib/foreman/projects/storage.ts(7,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:823

819. **build_error** (critical)
   - ID: qi-build_error-1765184826998-6121d4a9
   - Description: Build error detected: lib/foreman/projects/storage.ts(14,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:824

820. **build_error** (critical)
   - ID: qi-build_error-1765184827008-b6cdf9d4
   - Description: Build error detected: lib/foreman/projects/storage.ts(15,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:825

821. **build_error** (critical)
   - ID: qi-build_error-1765184827016-7892a989
   - Description: Build error detected: lib/foreman/projects/storage.ts(15,53): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:826

822. **build_error** (critical)
   - ID: qi-build_error-1765184827024-9c093734
   - Description: Build error detected: lib/foreman/qa/enhanced-qa-runner.ts(33,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:827

823. **build_error** (critical)
   - ID: qi-build_error-1765184827031-39e16a97
   - Description: Build error detected: lib/foreman/qa/enhanced-qa-runner.ts(65,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:828

824. **build_error** (critical)
   - ID: qi-build_error-1765184827039-487b5eee
   - Description: Build error detected: lib/foreman/qa/enhanced-qa-runner.ts(277,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:829

825. **build_error** (critical)
   - ID: qi-build_error-1765184827047-14472e74
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(19,26): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
   - Source: build.log:830

826. **build_error** (critical)
   - ID: qi-build_error-1765184827057-dbb89a5d
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(20,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:831

827. **build_error** (critical)
   - ID: qi-build_error-1765184827065-289203ce
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(21,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:832

828. **build_error** (critical)
   - ID: qi-build_error-1765184827073-847edb7e
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(42,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:833

829. **build_error** (critical)
   - ID: qi-build_error-1765184827081-6592dd1a
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(64,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:834

830. **build_error** (critical)
   - ID: qi-build_error-1765184827089-a8b1aae9
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(115,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:835

831. **build_error** (critical)
   - ID: qi-build_error-1765184827097-869f06df
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(145,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:836

832. **build_error** (critical)
   - ID: qi-build_error-1765184827106-7ac9b852
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(175,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:837

833. **build_error** (critical)
   - ID: qi-build_error-1765184827115-d31f816b
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(205,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:838

834. **build_error** (critical)
   - ID: qi-build_error-1765184827123-35b9da37
   - Description: Build error detected: lib/foreman/qa/log-parsing-qa.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:839

835. **build_error** (critical)
   - ID: qi-build_error-1765184827131-d79283ed
   - Description: Build error detected: lib/foreman/qa/log-parsing-qa.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:840

836. **build_error** (critical)
   - ID: qi-build_error-1765184827140-faafeebb
   - Description: Build error detected: lib/foreman/qa/log-parsing-qa.ts(82,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:841

837. **build_error** (critical)
   - ID: qi-build_error-1765184827148-e362c445
   - Description: Build error detected: lib/foreman/qa/log-parsing-qa.ts(144,20): error TS7006: Parameter 'line' implicitly has an 'any' type.
   - Source: build.log:842

838. **build_error** (critical)
   - ID: qi-build_error-1765184827157-d2c32616
   - Description: Build error detected: lib/foreman/qa/log-parsing-qa.ts(144,26): error TS7006: Parameter 'index' implicitly has an 'any' type.
   - Source: build.log:843

839. **build_error** (critical)
   - ID: qi-build_error-1765184827165-29dd6a2c
   - Description: Build error detected: lib/foreman/qa/qi-incident-writer.ts(23,25): error TS2307: Cannot find module 'crypto' or its corresponding type declarations.
   - Source: build.log:844

840. **build_error** (critical)
   - ID: qi-build_error-1765184827173-e32fe5a9
   - Description: Build error detected: lib/foreman/qa/qiel-runner.ts(109,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:845

841. **build_error** (critical)
   - ID: qi-build_error-1765184827181-8d795de7
   - Description: Build error detected: lib/foreman/qa/qiel-runner.ts(500,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:846

842. **build_error** (critical)
   - ID: qi-build_error-1765184827190-d040a440
   - Description: Build error detected: lib/foreman/qa/qiel-runner.ts(518,14): error TS2580: Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:847

843. **build_error** (critical)
   - ID: qi-build_error-1765184827198-6b63e482
   - Description: Build error detected: lib/foreman/qa/regression-test-generator.ts(13,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:848

844. **build_error** (critical)
   - ID: qi-build_error-1765184827208-52698a06
   - Description: Build error detected: lib/foreman/qa/regression-test-generator.ts(14,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:849

845. **build_error** (critical)
   - ID: qi-build_error-1765184827216-31982064
   - Description: Build error detected: lib/foreman/qa/regression-test-generator.ts(274,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:850

846. **build_error** (critical)
   - ID: qi-build_error-1765184827224-a09a5ec0
   - Description: Build error detected: lib/foreman/qa/regression-test-generator.ts(333,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:851

847. **build_error** (critical)
   - ID: qi-build_error-1765184827232-c96d8961
   - Description: Build error detected: lib/foreman/qa/regression-test-generator.ts(340,23): error TS7006: Parameter 'f' implicitly has an 'any' type.
   - Source: build.log:852

848. **build_error** (critical)
   - ID: qi-build_error-1765184827240-2be65140
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:853

849. **build_error** (critical)
   - ID: qi-build_error-1765184827249-cdf2b6c6
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:854

850. **build_error** (critical)
   - ID: qi-build_error-1765184827258-68e27e2e
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(13,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
   - Source: build.log:855

851. **build_error** (critical)
   - ID: qi-build_error-1765184827266-e29afb1e
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(14,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
   - Source: build.log:856

852. **build_error** (critical)
   - ID: qi-build_error-1765184827274-93f8accc
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(86,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:857

853. **build_error** (critical)
   - ID: qi-build_error-1765184827283-6dc959bb
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(147,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:858

854. **build_error** (critical)
   - ID: qi-build_error-1765184827291-8231ff93
   - Description: Build error detected: lib/foreman/qa/vercel-simulation-qa.ts(14,26): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
   - Source: build.log:859

855. **build_error** (critical)
   - ID: qi-build_error-1765184827299-65686e98
   - Description: Build error detected: lib/foreman/qa/vercel-simulation-qa.ts(15,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:860

856. **build_error** (critical)
   - ID: qi-build_error-1765184827309-d2340e63
   - Description: Build error detected: lib/foreman/qa/vercel-simulation-qa.ts(16,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:861

857. **build_error** (critical)
   - ID: qi-build_error-1765184827317-149bf067
   - Description: Build error detected: lib/foreman/qa/vercel-simulation-qa.ts(45,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:862

858. **build_error** (critical)
   - ID: qi-build_error-1765184827326-026ef4d8
   - Description: Build error detected: lib/foreman/qa/vercel-simulation-qa.ts(203,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:863

859. **build_error** (critical)
   - ID: qi-build_error-1765184827334-df816b2f
   - Description: Build error detected: lib/foreman/qa/zero-warning-policy.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:864

860. **build_error** (critical)
   - ID: qi-build_error-1765184827342-8e6496c7
   - Description: Build error detected: lib/foreman/qa/zero-warning-policy.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:865

861. **build_error** (critical)
   - ID: qi-build_error-1765184827350-8cb4c358
   - Description: Build error detected: lib/foreman/qiel-config.ts(19,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:866

862. **build_error** (critical)
   - ID: qi-build_error-1765184827360-bd640350
   - Description: Build error detected: lib/foreman/qiel-config.ts(20,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:867

863. **build_error** (critical)
   - ID: qi-build_error-1765184827369-92265c8b
   - Description: Build error detected: lib/foreman/qiel-config.ts(332,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:868

864. **build_error** (critical)
   - ID: qi-build_error-1765184827377-bbe0b7c0
   - Description: Build error detected: lib/foreman/qiel-config.ts(367,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:869

865. **build_error** (critical)
   - ID: qi-build_error-1765184827385-4eb151c4
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(57,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:870

866. **build_error** (critical)
   - ID: qi-build_error-1765184827394-2f9a0e0a
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(58,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:871

867. **build_error** (critical)
   - ID: qi-build_error-1765184827402-5e0e4cb9
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(691,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:872

868. **build_error** (critical)
   - ID: qi-build_error-1765184827412-b23af1f2
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(702,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:873

869. **build_error** (critical)
   - ID: qi-build_error-1765184827421-ed3e3cba
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(718,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:874

870. **build_error** (critical)
   - ID: qi-build_error-1765184827429-f88db0ac
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(738,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:875

871. **build_error** (critical)
   - ID: qi-build_error-1765184827437-f5dfdee5
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(754,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:876

872. **build_error** (critical)
   - ID: qi-build_error-1765184827446-ada4241d
   - Description: Build error detected: lib/foreman/reasoning/evolution-engine.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:877

873. **build_error** (critical)
   - ID: qi-build_error-1765184827456-0d0135f1
   - Description: Build error detected: lib/foreman/reasoning/evolution-engine.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:878

874. **build_error** (critical)
   - ID: qi-build_error-1765184827465-a025811b
   - Description: Build error detected: lib/foreman/reasoning/evolution-engine.ts(314,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:879

875. **build_error** (critical)
   - ID: qi-build_error-1765184827473-efeb7b58
   - Description: Build error detected: lib/foreman/reasoning/evolution-engine.ts(351,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:880

876. **build_error** (critical)
   - ID: qi-build_error-1765184827482-5fd045a9
   - Description: Build error detected: lib/foreman/reasoning/evolution-engine.ts(533,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:881

877. **build_error** (critical)
   - ID: qi-build_error-1765184827490-bc7c02ff
   - Description: Build error detected: lib/foreman/reasoning/patterns.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:882

878. **build_error** (critical)
   - ID: qi-build_error-1765184827500-425461ec
   - Description: Build error detected: lib/foreman/reasoning/patterns.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:883

879. **build_error** (critical)
   - ID: qi-build_error-1765184827509-97233528
   - Description: Build error detected: lib/foreman/reasoning/patterns.ts(123,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:884

880. **build_error** (critical)
   - ID: qi-build_error-1765184827517-b0fb624b
   - Description: Build error detected: lib/foreman/run-self-test.ts(6,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
   - Source: build.log:885

881. **build_error** (critical)
   - ID: qi-build_error-1765184827526-b2bd239c
   - Description: Build error detected: lib/foreman/run-self-test.ts(87,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:886

882. **build_error** (critical)
   - ID: qi-build_error-1765184827534-0b69730b
   - Description: Build error detected: lib/foreman/run-self-test.ts(93,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:887

883. **build_error** (critical)
   - ID: qi-build_error-1765184827544-28bcd1e5
   - Description: Build error detected: lib/foreman/run-self-test.ts(125,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:888

884. **build_error** (critical)
   - ID: qi-build_error-1765184827553-e9399ef4
   - Description: Build error detected: lib/foreman/run-self-test.ts(127,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:889

885. **build_error** (critical)
   - ID: qi-build_error-1765184827561-d7b0842b
   - Description: Build error detected: lib/foreman/run-self-test.ts(127,56): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:890

886. **build_error** (critical)
   - ID: qi-build_error-1765184827570-c04cd784
   - Description: Build error detected: lib/foreman/run-self-test.ts(167,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:891

887. **build_error** (critical)
   - ID: qi-build_error-1765184827578-bad2585c
   - Description: Build error detected: lib/foreman/run-self-test.ts(177,15): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:892

888. **build_error** (critical)
   - ID: qi-build_error-1765184827588-600b5618
   - Description: Build error detected: lib/foreman/run-self-test.ts(204,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:893

889. **build_error** (critical)
   - ID: qi-build_error-1765184827597-2fcaa819
   - Description: Build error detected: lib/foreman/run-self-test.ts(210,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:894

890. **build_error** (critical)
   - ID: qi-build_error-1765184827606-b03cd757
   - Description: Build error detected: lib/foreman/run-self-test.ts(215,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:895

891. **build_error** (critical)
   - ID: qi-build_error-1765184827614-86d8b053
   - Description: Build error detected: lib/foreman/watchdog/quality-integrity-watchdog.ts(20,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:896

892. **build_error** (critical)
   - ID: qi-build_error-1765184827623-fc4666f8
   - Description: Build error detected: lib/foreman/watchdog/quality-integrity-watchdog.ts(21,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:897

893. **build_error** (critical)
   - ID: qi-build_error-1765184827633-56893a10
   - Description: Build error detected: lib/foreman/watchdog/quality-integrity-watchdog.ts(144,20): error TS7006: Parameter 'line' implicitly has an 'any' type.
   - Source: build.log:898

894. **build_error** (critical)
   - ID: qi-build_error-1765184827642-abc68c4a
   - Description: Build error detected: lib/foreman/watchdog/quality-integrity-watchdog.ts(144,26): error TS7006: Parameter 'index' implicitly has an 'any' type.
   - Source: build.log:899

895. **build_error** (critical)
   - ID: qi-build_error-1765184827651-6e5dbe4a
   - Description: Build error detected: lib/foreman/watchdog/quality-integrity-watchdog.ts(420,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:900

896. **build_error** (critical)
   - ID: qi-build_error-1765184827659-4d6cfff0
   - Description: Build error detected: lib/github.ts(22,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:901

897. **build_error** (critical)
   - ID: qi-build_error-1765184827668-2628dd80
   - Description: Build error detected: lib/github.ts(23,44): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:902

898. **build_error** (critical)
   - ID: qi-build_error-1765184827678-c9c9fdcd
   - Description: Build error detected: lib/github.ts(24,52): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:903

899. **build_error** (critical)
   - ID: qi-build_error-1765184827687-9f4a8bb2
   - Description: Build error detected: lib/github.ts(25,50): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:904

900. **build_error** (critical)
   - ID: qi-build_error-1765184827696-11891b31
   - Description: Build error detected: lib/github/client.ts(1,25): error TS2307: Cannot find module 'octokit' or its corresponding type declarations.
   - Source: build.log:905

901. **build_error** (critical)
   - ID: qi-build_error-1765184827705-362fb151
   - Description: Build error detected: lib/github/client.ts(4,9): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:906

902. **build_error** (critical)
   - ID: qi-build_error-1765184827713-09291f42
   - Description: Build error detected: lib/github/loadFiles.ts(2,35): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
   - Source: build.log:907

903. **build_error** (critical)
   - ID: qi-build_error-1765184827724-75ecb75b
   - Description: Build error detected: lib/github/loadFiles.ts(3,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:908

904. **build_error** (critical)
   - ID: qi-build_error-1765184827733-6dfc2ceb
   - Description: Build error detected: lib/github/loadFiles.ts(39,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:909

905. **build_error** (critical)
   - ID: qi-build_error-1765184827741-54ba15b2
   - Description: Build error detected: lib/github/loadFiles.ts(40,16): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:910

906. **build_error** (critical)
   - ID: qi-build_error-1765184827750-0ec112bb
   - Description: Build error detected: lib/github/loadFiles.ts(41,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:911

907. **build_error** (critical)
   - ID: qi-build_error-1765184827759-1fd7c7a4
   - Description: Build error detected: lib/github/loadFiles.ts(91,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:912

908. **build_error** (critical)
   - ID: qi-build_error-1765184827770-6fc00965
   - Description: Build error detected: lib/github/pr-builder.ts(6,25): error TS2307: Cannot find module 'octokit' or its corresponding type declarations.
   - Source: build.log:913

909. **build_error** (critical)
   - ID: qi-build_error-1765184827779-7a7cf31a
   - Description: Build error detected: lib/openai.ts(16,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:914

910. **build_error** (critical)
   - ID: qi-build_error-1765184827789-928ae5ef
   - Description: Build error detected: tailwind.config.ts(1,29): error TS2307: Cannot find module 'tailwindcss' or its corresponding type declarations.
   - Source: build.log:915

911. **build_error** (critical)
   - ID: qi-build_error-1765184827798-71092ba8
   - Description: Build error detected: tailwind.config.ts(24,5): error TS2580: Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:916

912. **build_error** (critical)
   - ID: qi-build_error-1765184827807-82b2ba03
   - Description: Build error detected: tests/analytics/builder-performance.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:917

913. **build_error** (critical)
   - ID: qi-build_error-1765184827818-db3be893
   - Description: Build error detected: tests/analytics/consolidation-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:918

914. **build_error** (critical)
   - ID: qi-build_error-1765184827828-ded947a8
   - Description: Build error detected: tests/analytics/drift-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:919

915. **build_error** (critical)
   - ID: qi-build_error-1765184827837-ecf760ea
   - Description: Build error detected: tests/analytics/evolution-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:920

916. **build_error** (critical)
   - ID: qi-build_error-1765184827847-db82cd85
   - Description: Build error detected: tests/analytics/governance-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:921

917. **build_error** (critical)
   - ID: qi-build_error-1765184827856-97e76d4a
   - Description: Build error detected: tests/analytics/memory-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:922

918. **build_error** (critical)
   - ID: qi-build_error-1765184827867-e22006af
   - Description: Build error detected: tests/analytics/project-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:923

919. **build_error** (critical)
   - ID: qi-build_error-1765184827877-473e06ad
   - Description: Build error detected: tests/analytics/retirement-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:924

920. **build_error** (critical)
   - ID: qi-build_error-1765184827887-9765ed61
   - Description: Build error detected: tests/analytics/summary-endpoint.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:925

921. **build_error** (critical)
   - ID: qi-build_error-1765184827896-29aa0da2
   - Description: Build error detected: tests/builder-memory/context-filtering.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:926

922. **build_error** (critical)
   - ID: qi-build_error-1765184827906-88825bd0
   - Description: Build error detected: tests/builder-memory/context-filtering.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:927

923. **build_error** (critical)
   - ID: qi-build_error-1765184827917-fc9a3c0c
   - Description: Build error detected: tests/builder-memory/context-size-limit.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:928

924. **build_error** (critical)
   - ID: qi-build_error-1765184827927-12ce0256
   - Description: Build error detected: tests/builder-memory/context-size-limit.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:929

925. **build_error** (critical)
   - ID: qi-build_error-1765184827936-86ba0a86
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:930

926. **build_error** (critical)
   - ID: qi-build_error-1765184827946-8b1b599f
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:931

927. **build_error** (critical)
   - ID: qi-build_error-1765184827956-bbabdea6
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(32,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:932

928. **build_error** (critical)
   - ID: qi-build_error-1765184827967-6668f48d
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(37,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:933

929. **build_error** (critical)
   - ID: qi-build_error-1765184827976-ee2b5c84
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(86,7): error TS18048: 'task.memoryContext' is possibly 'undefined'.
   - Source: build.log:934

930. **build_error** (critical)
   - ID: qi-build_error-1765184827986-63934a65
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(90,7): error TS18048: 'task.memoryContext' is possibly 'undefined'.
   - Source: build.log:935

931. **build_error** (critical)
   - ID: qi-build_error-1765184828000-4ba89a95
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(143,29): error TS18048: 'task.memoryContext' is possibly 'undefined'.
   - Source: build.log:936

932. **build_error** (critical)
   - ID: qi-build_error-1765184828010-84e88400
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:937

933. **build_error** (critical)
   - ID: qi-build_error-1765184828022-13feb90f
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:938

934. **build_error** (critical)
   - ID: qi-build_error-1765184828031-0a004c9e
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(109,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:939

935. **build_error** (critical)
   - ID: qi-build_error-1765184828040-a7b213c3
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(110,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:940

936. **build_error** (critical)
   - ID: qi-build_error-1765184828049-863658a6
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(135,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:941

937. **build_error** (critical)
   - ID: qi-build_error-1765184828058-ee71662d
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(141,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:942

938. **build_error** (critical)
   - ID: qi-build_error-1765184828070-08aaf958
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(142,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:943

939. **build_error** (critical)
   - ID: qi-build_error-1765184828079-149e6ec3
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(176,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:944

940. **build_error** (critical)
   - ID: qi-build_error-1765184828088-64789333
   - Description: Build error detected: tests/builder-memory/integration-drift-guard.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:945

941. **build_error** (critical)
   - ID: qi-build_error-1765184828097-01b24a74
   - Description: Build error detected: tests/builder-memory/integration-drift-guard.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:946

942. **build_error** (critical)
   - ID: qi-build_error-1765184828107-349ba15f
   - Description: Build error detected: tests/builder-memory/integration-drift-guard.test.ts(121,7): error TS18048: 'task.memoryContext' is possibly 'undefined'.
   - Source: build.log:947

943. **build_error** (critical)
   - ID: qi-build_error-1765184828118-43a57d87
   - Description: Build error detected: tests/consolidation/engine.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:948

944. **build_error** (critical)
   - ID: qi-build_error-1765184828127-8b511bf4
   - Description: Build error detected: tests/consolidation/engine.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:949

945. **build_error** (critical)
   - ID: qi-build_error-1765184828137-3ff6cf36
   - Description: Build error detected: tests/consolidation/engine.test.ts(51,26): error TS18048: 'qaPattern' is possibly 'undefined'.
   - Source: build.log:950

946. **build_error** (critical)
   - ID: qi-build_error-1765184828146-2f67acc2
   - Description: Build error detected: tests/consolidation/engine.test.ts(67,26): error TS18048: 'archPattern' is possibly 'undefined'.
   - Source: build.log:951

947. **build_error** (critical)
   - ID: qi-build_error-1765184828156-37c56694
   - Description: Build error detected: tests/dashboard/blockers.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:952

948. **build_error** (critical)
   - ID: qi-build_error-1765184828167-4aba2689
   - Description: Build error detected: tests/dashboard/dashboard.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:953

949. **build_error** (critical)
   - ID: qi-build_error-1765184828176-6b193c66
   - Description: Build error detected: tests/dashboard/deployment.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:954

950. **build_error** (critical)
   - ID: qi-build_error-1765184828185-8a16c20f
   - Description: Build error detected: tests/dashboard/memory.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:955

951. **build_error** (critical)
   - ID: qi-build_error-1765184828195-2b6b46aa
   - Description: Build error detected: tests/dashboard/milestones.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:956

952. **build_error** (critical)
   - ID: qi-build_error-1765184828204-96c0d51f
   - Description: Build error detected: tests/dashboard/s-curve.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:957

953. **build_error** (critical)
   - ID: qi-build_error-1765184828216-46ca616a
   - Description: Build error detected: tests/dashboard/status.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:958

954. **build_error** (critical)
   - ID: qi-build_error-1765184828225-f159feb7
   - Description: Build error detected: tests/dashboard/test-utils.ts(6,30): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:959

955. **build_error** (critical)
   - ID: qi-build_error-1765184828234-ab4e423d
   - Description: Build error detected: tests/dashboard/test-utils.ts(7,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:960

956. **build_error** (critical)
   - ID: qi-build_error-1765184828244-c98d050e
   - Description: Build error detected: tests/dashboard/test-utils.ts(14,28): error TS2304: Cannot find name '__dirname'.
   - Source: build.log:961

957. **build_error** (critical)
   - ID: qi-build_error-1765184828253-da62b524
   - Description: Build error detected: tests/dashboard/timeline.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:962

958. **build_error** (critical)
   - ID: qi-build_error-1765184828264-6e103073
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(6,42): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:963

959. **build_error** (critical)
   - ID: qi-build_error-1765184828273-15acf725
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:964

960. **build_error** (critical)
   - ID: qi-build_error-1765184828283-2df47620
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:965

961. **build_error** (critical)
   - ID: qi-build_error-1765184828292-d75039a5
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:966

962. **build_error** (critical)
   - ID: qi-build_error-1765184828302-62119db2
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(14,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:967

963. **build_error** (critical)
   - ID: qi-build_error-1765184828313-631ec90f
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(114,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:968

964. **build_error** (critical)
   - ID: qi-build_error-1765184828322-a925d6c3
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(143,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:969

965. **build_error** (critical)
   - ID: qi-build_error-1765184828332-20960a3e
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(167,15): error TS18048: 'result.errors' is possibly 'undefined'.
   - Source: build.log:970

966. **build_error** (critical)
   - ID: qi-build_error-1765184828341-1e8c1c23
   - Description: Build error detected: tests/feedback/drift-detection-agent-experience.test.ts(6,42): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:971

967. **build_error** (critical)
   - ID: qi-build_error-1765184828351-796b7b86
   - Description: Build error detected: tests/feedback/drift-detection-agent-experience.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:972

968. **build_error** (critical)
   - ID: qi-build_error-1765184828362-55e3dc60
   - Description: Build error detected: tests/feedback/drift-detection-agent-experience.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:973

969. **build_error** (critical)
   - ID: qi-build_error-1765184828371-62887483
   - Description: Build error detected: tests/feedback/drift-detection-agent-experience.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:974

970. **build_error** (critical)
   - ID: qi-build_error-1765184828381-122c93f9
   - Description: Build error detected: tests/feedback/drift-detection-agent-experience.test.ts(15,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:975

971. **build_error** (critical)
   - ID: qi-build_error-1765184828390-0edc2434
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:976

972. **build_error** (critical)
   - ID: qi-build_error-1765184828400-107d094a
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:977

973. **build_error** (critical)
   - ID: qi-build_error-1765184828412-f9605b42
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(35,15): error TS18048: 'result.errors' is possibly 'undefined'.
   - Source: build.log:978

974. **build_error** (critical)
   - ID: qi-build_error-1765184828422-3faa9cad
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(49,15): error TS18048: 'result.errors' is possibly 'undefined'.
   - Source: build.log:979

975. **build_error** (critical)
   - ID: qi-build_error-1765184828431-2220a0be
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(63,15): error TS18048: 'result.errors' is possibly 'undefined'.
   - Source: build.log:980

976. **build_error** (critical)
   - ID: qi-build_error-1765184828441-a27d9057
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(77,15): error TS18048: 'result.errors' is possibly 'undefined'.
   - Source: build.log:981

977. **build_error** (critical)
   - ID: qi-build_error-1765184828451-947064b0
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(91,15): error TS18048: 'result.warnings' is possibly 'undefined'.
   - Source: build.log:982

978. **build_error** (critical)
   - ID: qi-build_error-1765184828462-910c4246
   - Description: Build error detected: tests/feedback/governance-conflict-detection.test.ts(6,42): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:983

979. **build_error** (critical)
   - ID: qi-build_error-1765184828471-423a363d
   - Description: Build error detected: tests/feedback/governance-conflict-detection.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:984

980. **build_error** (critical)
   - ID: qi-build_error-1765184828481-f0ecac8e
   - Description: Build error detected: tests/feedback/governance-conflict-detection.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:985

981. **build_error** (critical)
   - ID: qi-build_error-1765184828491-433afe03
   - Description: Build error detected: tests/feedback/governance-conflict-detection.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:986

982. **build_error** (critical)
   - ID: qi-build_error-1765184828500-1531d6c3
   - Description: Build error detected: tests/feedback/governance-conflict-detection.test.ts(14,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:987

983. **build_error** (critical)
   - ID: qi-build_error-1765184828511-031a06b5
   - Description: Build error detected: tests/feedback/multi-agent-harmonization.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:988

984. **build_error** (critical)
   - ID: qi-build_error-1765184828521-bab5a836
   - Description: Build error detected: tests/feedback/multi-agent-harmonization.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:989

985. **build_error** (critical)
   - ID: qi-build_error-1765184828531-c8055756
   - Description: Build error detected: tests/feedback/multi-agent-harmonization.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:990

986. **build_error** (critical)
   - ID: qi-build_error-1765184828541-dbf81ade
   - Description: Build error detected: tests/feedback/multi-agent-harmonization.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:991

987. **build_error** (critical)
   - ID: qi-build_error-1765184828550-59cc6cc7
   - Description: Build error detected: tests/feedback/multi-agent-harmonization.test.ts(71,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:992

988. **build_error** (critical)
   - ID: qi-build_error-1765184828561-86f76b40
   - Description: Build error detected: tests/feedback/regression.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:993

989. **build_error** (critical)
   - ID: qi-build_error-1765184828571-2c32ea09
   - Description: Build error detected: tests/feedback/regression.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:994

990. **build_error** (critical)
   - ID: qi-build_error-1765184828581-225d5e2e
   - Description: Build error detected: tests/gsr/gsr-enforcement.test.ts(13,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:995

991. **build_error** (critical)
   - ID: qi-build_error-1765184828591-b7451691
   - Description: Build error detected: tests/gsr/gsr-enforcement.test.ts(14,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:996

992. **build_error** (critical)
   - ID: qi-build_error-1765184828600-c3426034
   - Description: Build error detected: tests/gsr/gsr-enforcement.test.ts(250,15): error TS18048: 'result.uiReviewMessage' is possibly 'undefined'.
   - Source: build.log:997

993. **build_error** (critical)
   - ID: qi-build_error-1765184828612-2bf87c43
   - Description: Build error detected: tests/gsr/gsr-enforcement.test.ts(347,15): error TS18048: 'result.uiReviewMessage' is possibly 'undefined'.
   - Source: build.log:998

994. **build_error** (critical)
   - ID: qi-build_error-1765184828622-0f0aed3b
   - Description: Build error detected: tests/gsr/gsr-enforcement.test.ts(348,15): error TS18048: 'result.uiReviewMessage' is possibly 'undefined'.
   - Source: build.log:999

995. **build_error** (critical)
   - ID: qi-build_error-1765184828632-5273939a
   - Description: Build error detected: tests/local-builder/fallback.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1000

996. **build_error** (critical)
   - ID: qi-build_error-1765184828642-464ff5fb
   - Description: Build error detected: tests/local-builder/fallback.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1001

997. **build_error** (critical)
   - ID: qi-build_error-1765184828651-47e22c64
   - Description: Build error detected: tests/local-builder/fallback.test.ts(46,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1002

998. **build_error** (critical)
   - ID: qi-build_error-1765184828663-55279942
   - Description: Build error detected: tests/local-builder/fallback.test.ts(53,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1003

999. **build_error** (critical)
   - ID: qi-build_error-1765184828673-a19800fd
   - Description: Build error detected: tests/local-builder/fallback.test.ts(58,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1004

1000. **build_error** (critical)
   - ID: qi-build_error-1765184828682-76dc915d
   - Description: Build error detected: tests/local-builder/fallback.test.ts(79,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1005

1001. **build_error** (critical)
   - ID: qi-build_error-1765184828692-b7667362
   - Description: Build error detected: tests/local-builder/fallback.test.ts(86,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1006

1002. **build_error** (critical)
   - ID: qi-build_error-1765184828703-5c4ab38f
   - Description: Build error detected: tests/local-builder/fallback.test.ts(99,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1007

1003. **build_error** (critical)
   - ID: qi-build_error-1765184828727-15d36f81
   - Description: Build error detected: tests/local-builder/fallback.test.ts(106,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1008

1004. **build_error** (critical)
   - ID: qi-build_error-1765184828737-82dbc882
   - Description: Build error detected: tests/local-builder/fallback.test.ts(128,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1009

1005. **build_error** (critical)
   - ID: qi-build_error-1765184828747-5dc11f54
   - Description: Build error detected: tests/local-builder/fallback.test.ts(129,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1010

1006. **build_error** (critical)
   - ID: qi-build_error-1765184828756-77e30f1d
   - Description: Build error detected: tests/local-builder/integration.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1011

1007. **build_error** (critical)
   - ID: qi-build_error-1765184828766-e410c3ef
   - Description: Build error detected: tests/local-builder/integration.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1012

1008. **build_error** (critical)
   - ID: qi-build_error-1765184828778-d88e5e3b
   - Description: Build error detected: tests/local-builder/integration.test.ts(15,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1013

1009. **build_error** (critical)
   - ID: qi-build_error-1765184828788-84e365c1
   - Description: Build error detected: tests/local-builder/integration.test.ts(16,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1014

1010. **build_error** (critical)
   - ID: qi-build_error-1765184828798-8b0f070a
   - Description: Build error detected: tests/local-builder/integration.test.ts(48,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1015

1011. **build_error** (critical)
   - ID: qi-build_error-1765184828808-b4224b4f
   - Description: Build error detected: tests/local-builder/integration.test.ts(49,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1016

1012. **build_error** (critical)
   - ID: qi-build_error-1765184828819-58f47565
   - Description: Build error detected: tests/local-builder/integration.test.ts(63,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1017

1013. **build_error** (critical)
   - ID: qi-build_error-1765184828831-0a7745f7
   - Description: Build error detected: tests/local-builder/integration.test.ts(64,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1018

1014. **build_error** (critical)
   - ID: qi-build_error-1765184828841-df3c4682
   - Description: Build error detected: tests/local-builder/integration.test.ts(65,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1019

1015. **build_error** (critical)
   - ID: qi-build_error-1765184828851-1e7e9e39
   - Description: Build error detected: tests/local-builder/integration.test.ts(85,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1020

1016. **build_error** (critical)
   - ID: qi-build_error-1765184828861-efd04bb6
   - Description: Build error detected: tests/local-builder/integration.test.ts(86,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1021

1017. **build_error** (critical)
   - ID: qi-build_error-1765184828871-a78bff9a
   - Description: Build error detected: tests/local-builder/integration.test.ts(87,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1022

1018. **build_error** (critical)
   - ID: qi-build_error-1765184828882-17d3dd1a
   - Description: Build error detected: tests/local-builder/integration.test.ts(92,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1023

1019. **build_error** (critical)
   - ID: qi-build_error-1765184828892-8e335a1e
   - Description: Build error detected: tests/local-builder/integration.test.ts(112,26): error TS18048: 'task.input' is possibly 'undefined'.
   - Source: build.log:1024

1020. **build_error** (critical)
   - ID: qi-build_error-1765184828903-30cf7910
   - Description: Build error detected: tests/local-builder/integration.test.ts(113,17): error TS18048: 'task.input' is possibly 'undefined'.
   - Source: build.log:1025

1021. **build_error** (critical)
   - ID: qi-build_error-1765184828913-3f429deb
   - Description: Build error detected: tests/local-builder/integration.test.ts(114,17): error TS18048: 'task.input' is possibly 'undefined'.
   - Source: build.log:1026

1022. **build_error** (critical)
   - ID: qi-build_error-1765184828923-7c85b9c9
   - Description: Build error detected: tests/local-builder/integration.test.ts(118,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1027

1023. **build_error** (critical)
   - ID: qi-build_error-1765184828935-c2a1989b
   - Description: Build error detected: tests/local-builder/integration.test.ts(124,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1028

1024. **build_error** (critical)
   - ID: qi-build_error-1765184828945-05ed2330
   - Description: Build error detected: tests/local-builder/integration.test.ts(125,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1029

1025. **build_error** (critical)
   - ID: qi-build_error-1765184828955-8fbd0b2d
   - Description: Build error detected: tests/local-builder/integration.test.ts(148,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1030

1026. **build_error** (critical)
   - ID: qi-build_error-1765184828965-8026529c
   - Description: Build error detected: tests/local-builder/integration.test.ts(149,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1031

1027. **build_error** (critical)
   - ID: qi-build_error-1765184828975-89882d84
   - Description: Build error detected: tests/memory-drift/auto-recommendation.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1032

1028. **build_error** (critical)
   - ID: qi-build_error-1765184828987-d46b3fb6
   - Description: Build error detected: tests/memory-drift/auto-recommendation.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1033

1029. **build_error** (critical)
   - ID: qi-build_error-1765184828997-49455257
   - Description: Build error detected: tests/memory-drift/contradiction-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1034

1030. **build_error** (critical)
   - ID: qi-build_error-1765184829007-789859a8
   - Description: Build error detected: tests/memory-drift/contradiction-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1035

1031. **build_error** (critical)
   - ID: qi-build_error-1765184829017-c85191f1
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1036

1032. **build_error** (critical)
   - ID: qi-build_error-1765184829027-5a541533
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1037

1033. **build_error** (critical)
   - ID: qi-build_error-1765184829039-72770b4a
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(12,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1038

1034. **build_error** (critical)
   - ID: qi-build_error-1765184829049-deca9740
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(13,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1039

1035. **build_error** (critical)
   - ID: qi-build_error-1765184829059-ff6a0b99
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(33,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1040

1036. **build_error** (critical)
   - ID: qi-build_error-1765184829070-4626fe09
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(68,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1041

1037. **build_error** (critical)
   - ID: qi-build_error-1765184829080-f55d779b
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(96,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1042

1038. **build_error** (critical)
   - ID: qi-build_error-1765184829092-53b54bab
   - Description: Build error detected: tests/memory-drift/governance-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1043

1039. **build_error** (critical)
   - ID: qi-build_error-1765184829102-3a5f71d5
   - Description: Build error detected: tests/memory-drift/governance-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1044

1040. **build_error** (critical)
   - ID: qi-build_error-1765184829112-b6235618
   - Description: Build error detected: tests/memory-drift/integration.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1045

1041. **build_error** (critical)
   - ID: qi-build_error-1765184829123-157fe107
   - Description: Build error detected: tests/memory-drift/integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1046

1042. **build_error** (critical)
   - ID: qi-build_error-1765184829136-9ee9f3cb
   - Description: Build error detected: tests/memory-drift/schema-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1047

1043. **build_error** (critical)
   - ID: qi-build_error-1765184829146-9281aee6
   - Description: Build error detected: tests/memory-drift/schema-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1048

1044. **build_error** (critical)
   - ID: qi-build_error-1765184829157-f28ce130
   - Description: Build error detected: tests/memory-drift/staleness-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1049

1045. **build_error** (critical)
   - ID: qi-build_error-1765184829167-49b2e087
   - Description: Build error detected: tests/memory-drift/staleness-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1050

1046. **build_error** (critical)
   - ID: qi-build_error-1765184829179-3fc5a887
   - Description: Build error detected: tests/memory-fabric/structure.test.ts(15,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1051

1047. **build_error** (critical)
   - ID: qi-build_error-1765184829190-19731bf9
   - Description: Build error detected: tests/memory-fabric/structure.test.ts(16,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
   - Source: build.log:1052

1048. **build_error** (critical)
   - ID: qi-build_error-1765184829200-6a841422
   - Description: Build error detected: tests/memory-fabric/structure.test.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1053

1049. **build_error** (critical)
   - ID: qi-build_error-1765184829210-666153f4
   - Description: Build error detected: tests/memory-fabric/structure.test.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1054

1050. **build_error** (critical)
   - ID: qi-build_error-1765184829222-729e7302
   - Description: Build error detected: tests/memory-fabric/structure.test.ts(28,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1055

1051. **build_error** (critical)
   - ID: qi-build_error-1765184829233-010dc79e
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1056

1052. **build_error** (critical)
   - ID: qi-build_error-1765184829243-b54e553e
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(8,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1057

1053. **build_error** (critical)
   - ID: qi-build_error-1765184829254-adb2f7a3
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(88,24): error TS18048: 'heavyTaskRule' is possibly 'undefined'.
   - Source: build.log:1058

1054. **build_error** (critical)
   - ID: qi-build_error-1765184829266-e31df18e
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(92,24): error TS18048: 'multiFileRule' is possibly 'undefined'.
   - Source: build.log:1059

1055. **build_error** (critical)
   - ID: qi-build_error-1765184829277-47628ee1
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(97,24): error TS18048: 'archRule' is possibly 'undefined'.
   - Source: build.log:1060

1056. **build_error** (critical)
   - ID: qi-build_error-1765184829288-4beae192
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(206,15): error TS18048: 'escalationIssue' is possibly 'undefined'.
   - Source: build.log:1061

1057. **build_error** (critical)
   - ID: qi-build_error-1765184829298-d209ea56
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(214,15): error TS18048: 'syncIssue' is possibly 'undefined'.
   - Source: build.log:1062

1058. **build_error** (critical)
   - ID: qi-build_error-1765184829310-de9e001d
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(222,15): error TS18048: 'healIssue' is possibly 'undefined'.
   - Source: build.log:1063

1059. **build_error** (critical)
   - ID: qi-build_error-1765184829321-8a8ac8fa
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(230,15): error TS18048: 'gsrIssue' is possibly 'undefined'.
   - Source: build.log:1064

1060. **build_error** (critical)
   - ID: qi-build_error-1765184829331-f1f28354
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(14,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1065

1061. **build_error** (critical)
   - ID: qi-build_error-1765184829342-b8d8ce20
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(15,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
   - Source: build.log:1066

1062. **build_error** (critical)
   - ID: qi-build_error-1765184829354-1813cca5
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(16,22): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
   - Source: build.log:1067

1063. **build_error** (critical)
   - ID: qi-build_error-1765184829365-07ba2a88
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(17,27): error TS2307: Cannot find module 'util' or its corresponding type declarations.
   - Source: build.log:1068

1064. **build_error** (critical)
   - ID: qi-build_error-1765184829376-853d0194
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1069

1065. **build_error** (critical)
   - ID: qi-build_error-1765184829387-3edb3427
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(21,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1070

1066. **build_error** (critical)
   - ID: qi-build_error-1765184829399-380c559d
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(65,31): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
   - Source: build.log:1071

1067. **build_error** (critical)
   - ID: qi-build_error-1765184829409-ccb4b693
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(90,16): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1072

1068. **build_error** (critical)
   - ID: qi-build_error-1765184829421-41109e38
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(158,31): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
   - Source: build.log:1073

1069. **build_error** (critical)
   - ID: qi-build_error-1765184829431-26dc11fb
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(187,31): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
   - Source: build.log:1074

1070. **build_error** (critical)
   - ID: qi-build_error-1765184829444-5003392f
   - Description: Build error detected: tests/qa-structural/cross-engine-interface.test.ts(14,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1075

1071. **build_error** (critical)
   - ID: qi-build_error-1765184829454-76d8751c
   - Description: Build error detected: tests/qa-structural/cross-engine-interface.test.ts(15,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
   - Source: build.log:1076

1072. **build_error** (critical)
   - ID: qi-build_error-1765184829465-568cc6f1
   - Description: Build error detected: tests/qa-structural/type-validation.test.ts(14,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1077

1073. **build_error** (critical)
   - ID: qi-build_error-1765184829476-40f6fd6e
   - Description: Build error detected: tests/qa-structural/type-validation.test.ts(15,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
   - Source: build.log:1078

1074. **build_error** (critical)
   - ID: qi-build_error-1765184829488-c1163648
   - Description: Build error detected: tests/qa/qa-system.test.ts(11,37): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1079

1075. **build_error** (critical)
   - ID: qi-build_error-1765184829499-b778d733
   - Description: Build error detected: tests/qa/qa-system.test.ts(12,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1080

1076. **build_error** (critical)
   - ID: qi-build_error-1765184829510-06800025
   - Description: Build error detected: tests/qa/qa-system.test.ts(13,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1081

1077. **build_error** (critical)
   - ID: qi-build_error-1765184829520-237055ac
   - Description: Build error detected: tests/qa/qa-system.test.ts(14,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1082

1078. **build_error** (critical)
   - ID: qi-build_error-1765184829533-1ed27a2a
   - Description: Build error detected: tests/qa/qa-system.test.ts(24,19): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1083

1079. **build_error** (critical)
   - ID: qi-build_error-1765184829544-bd00d4a0
   - Description: Build error detected: tests/qa/qa-system.test.ts(32,33): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1084

1080. **build_error** (critical)
   - ID: qi-build_error-1765184829554-9cc019ed
   - Description: Build error detected: tests/qa/qa-system.test.ts(177,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1085

1081. **build_error** (critical)
   - ID: qi-build_error-1765184829565-dfd5879a
   - Description: Build error detected: tests/qa/qa-system.test.ts(183,33): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1086

1082. **build_error** (critical)
   - ID: qi-build_error-1765184829577-114034a2
   - Description: Build error detected: tests/qa/qa-system.test.ts(237,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1087

1083. **build_error** (critical)
   - ID: qi-build_error-1765184829588-a9145471
   - Description: Build error detected: tests/qic/qic-loader.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1088

1084. **build_error** (critical)
   - ID: qi-build_error-1765184829599-3135bba7
   - Description: Build error detected: tests/qic/qic-loader.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1089

1085. **build_error** (critical)
   - ID: qi-build_error-1765184829610-b5b1ef84
   - Description: Build error detected: tests/qic/qiel-system.test.ts(12,37): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1090

1086. **build_error** (critical)
   - ID: qi-build_error-1765184829622-024206d2
   - Description: Build error detected: tests/qic/qiel-system.test.ts(13,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1091

1087. **build_error** (critical)
   - ID: qi-build_error-1765184829633-cb5b63f4
   - Description: Build error detected: tests/qic/qiel-system.test.ts(14,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1092

1088. **build_error** (critical)
   - ID: qi-build_error-1765184829644-f99d84ee
   - Description: Build error detected: tests/qic/qiel-system.test.ts(15,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1093

1089. **build_error** (critical)
   - ID: qi-build_error-1765184829655-cdb04290
   - Description: Build error detected: tests/qic/qiel-system.test.ts(169,39): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1094

1090. **build_error** (critical)
   - ID: qi-build_error-1765184829668-e3e37ed7
   - Description: Build error detected: tests/qic/qiel-system.test.ts(219,33): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1095

1091. **build_error** (critical)
   - ID: qi-build_error-1765184829679-949d495e
   - Description: Build error detected: tests/qic/qiel-system.test.ts(300,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1096

1092. **build_error** (critical)
   - ID: qi-build_error-1765184829690-8b097348
   - Description: Build error detected: tests/qiel/env-diff.test.ts(13,36): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1097

1093. **build_error** (critical)
   - ID: qi-build_error-1765184829701-4d62dc62
   - Description: Build error detected: tests/qiel/env-diff.test.ts(14,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1098

1094. **build_error** (critical)
   - ID: qi-build_error-1765184829713-a750153d
   - Description: Build error detected: tests/qiel/env-diff.test.ts(15,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1099

1095. **build_error** (critical)
   - ID: qi-build_error-1765184829724-e39332d2
   - Description: Build error detected: tests/qiel/env-diff.test.ts(16,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1100

1096. **build_error** (critical)
   - ID: qi-build_error-1765184829735-701a2f15
   - Description: Build error detected: tests/qiel/env-diff.test.ts(95,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1101

1097. **build_error** (critical)
   - ID: qi-build_error-1765184829746-5370b87d
   - Description: Build error detected: tests/qiel/env-diff.test.ts(122,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1102

1098. **build_error** (critical)
   - ID: qi-build_error-1765184829759-c40887c6
   - Description: Build error detected: tests/qiel/env-diff.test.ts(137,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1103

1099. **build_error** (critical)
   - ID: qi-build_error-1765184829772-11cdf7e4
   - Description: Build error detected: tests/qiel/env-diff.test.ts(155,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1104

1100. **build_error** (critical)
   - ID: qi-build_error-1765184829783-b4b67645
   - Description: Build error detected: tests/qiel/env-diff.test.ts(169,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1105

1101. **build_error** (critical)
   - ID: qi-build_error-1765184829794-86919090
   - Description: Build error detected: tests/qiel/env-diff.test.ts(278,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1106

1102. **build_error** (critical)
   - ID: qi-build_error-1765184829807-dc2ea501
   - Description: Build error detected: tests/qiel/env-diff.test.ts(290,41): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1107

1103. **build_error** (critical)
   - ID: qi-build_error-1765184829818-451904be
   - Description: Build error detected: tests/qiel/env-diff.test.ts(328,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1108

1104. **build_error** (critical)
   - ID: qi-build_error-1765184829829-8492fc81
   - Description: Build error detected: tests/qiel/env-diff.test.ts(333,41): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1109

1105. **build_error** (critical)
   - ID: qi-build_error-1765184829840-b5368dab
   - Description: Build error detected: tests/qiel/qiel-alignment.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1110

1106. **build_error** (critical)
   - ID: qi-build_error-1765184829853-29a7b1e8
   - Description: Build error detected: tests/qiel/qiel-alignment.test.ts(8,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1111

1107. **build_error** (critical)
   - ID: qi-build_error-1765184829864-ed9ab97d
   - Description: Build error detected: tests/qiel/qiel-alignment.test.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1112

1108. **build_error** (critical)
   - ID: qi-build_error-1765184829875-77ded4dc
   - Description: Build error detected: tests/qiel/qiel-alignment.test.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1113

1109. **build_error** (critical)
   - ID: qi-build_error-1765184829886-babef071
   - Description: Build error detected: tests/reasoning/engine.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1114

1110. **build_error** (critical)
   - ID: qi-build_error-1765184829898-7e079552
   - Description: Build error detected: tests/reasoning/engine.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1115

1111. **build_error** (critical)
   - ID: qi-build_error-1765184829909-09e6e0c6
   - Description: Build error detected: tests/reasoning/engine.test.ts(217,26): error TS18047: 'snapshot.project' is possibly 'null'.
   - Source: build.log:1116

1112. **build_error** (critical)
   - ID: qi-build_error-1765184829920-e138f58b
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1117

1113. **build_error** (critical)
   - ID: qi-build_error-1765184829931-23abdcf7
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1118

1114. **build_error** (critical)
   - ID: qi-build_error-1765184829944-07de7824
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(16,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1119

1115. **build_error** (critical)
   - ID: qi-build_error-1765184829956-537b6dac
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(17,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1120

1116. **build_error** (critical)
   - ID: qi-build_error-1765184829967-2a2ad894
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(28,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1121

1117. **build_error** (critical)
   - ID: qi-build_error-1765184829978-0f32c5e1
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(36,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1122

1118. **build_error** (critical)
   - ID: qi-build_error-1765184829991-bee6f92e
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(124,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1123

1119. **build_error** (critical)
   - ID: qi-build_error-1765184830002-8f10077b
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(214,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1124

1120. **build_error** (critical)
   - ID: qi-build_error-1765184830013-3e93361c
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(281,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1125

1121. **build_error** (critical)
   - ID: qi-build_error-1765184830024-861a259c
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(333,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1126

1122. **build_error** (critical)
   - ID: qi-build_error-1765184830037-c353637c
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1127

1123. **build_error** (critical)
   - ID: qi-build_error-1765184830049-9307c25c
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1128

1124. **build_error** (critical)
   - ID: qi-build_error-1765184830061-3e8209cf
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(15,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1129

1125. **build_error** (critical)
   - ID: qi-build_error-1765184830072-2b84e38c
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(16,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1130

1126. **build_error** (critical)
   - ID: qi-build_error-1765184830085-b8db40e3
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(26,44): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1131

1127. **build_error** (critical)
   - ID: qi-build_error-1765184830097-7b8ddcaa
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(30,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1132

1128. **build_error** (critical)
   - ID: qi-build_error-1765184830108-a604384c
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(41,32): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1133

1129. **build_error** (critical)
   - ID: qi-build_error-1765184830119-76cd4ea6
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(99,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1134

1130. **build_error** (critical)
   - ID: qi-build_error-1765184830132-eb189540
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(201,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1135

1131. **build_error** (critical)
   - ID: qi-build_error-1765184830144-507131bf
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(229,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1136

1132. **build_error** (critical)
   - ID: qi-build_error-1765184830155-554f858e
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(297,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1137

1133. **build_error** (critical)
   - ID: qi-build_error-1765184830167-4cc18fc9
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(307,36): error TS7006: Parameter 'f' implicitly has an 'any' type.
   - Source: build.log:1138

1134. **build_error** (critical)
   - ID: qi-build_error-1765184830180-a4a64231
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1139

1135. **build_error** (critical)
   - ID: qi-build_error-1765184830191-04e40121
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1140

1136. **build_error** (critical)
   - ID: qi-build_error-1765184830202-4cd10d1d
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(14,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1141

1137. **build_error** (critical)
   - ID: qi-build_error-1765184830214-3db547a2
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(15,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1142

1138. **build_error** (critical)
   - ID: qi-build_error-1765184830227-d29b69a5
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(26,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1143

1139. **build_error** (critical)
   - ID: qi-build_error-1765184830238-af99b7c0
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(38,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1144

1140. **build_error** (critical)
   - ID: qi-build_error-1765184830250-c8034b59
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(77,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1145

1141. **build_error** (critical)
   - ID: qi-build_error-1765184830261-0f6416b1
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(99,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1146

1142. **build_error** (critical)
   - ID: qi-build_error-1765184830275-d6d82b7c
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1147

1143. **build_error** (critical)
   - ID: qi-build_error-1765184830286-99402935
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1148

1144. **build_error** (critical)
   - ID: qi-build_error-1765184830298-ae71dee9
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(12,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1149

1145. **build_error** (critical)
   - ID: qi-build_error-1765184830309-e462a1b8
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(13,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1150

1146. **build_error** (critical)
   - ID: qi-build_error-1765184830323-626eb25d
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(23,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1151

1147. **build_error** (critical)
   - ID: qi-build_error-1765184830334-e898652a
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(31,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1152

1148. **build_error** (critical)
   - ID: qi-build_error-1765184830346-ff6dd232
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(38,37): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1153

1149. **build_error** (critical)
   - ID: qi-build_error-1765184830357-afa67da0
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(64,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1154

1150. **build_error** (critical)
   - ID: qi-build_error-1765184830372-137d130d
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(87,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1155

1151. **build_error** (critical)
   - ID: qi-build_error-1765184830383-e3182a5c
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(95,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1156

1152. **build_error** (critical)
   - ID: qi-build_error-1765184830395-37a22b0b
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(133,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1157

1153. **build_error** (critical)
   - ID: qi-build_error-1765184830407-d3cd76b1
   - Description: Build error detected: tests/reasoning/evolution/pattern-scoring.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1158

1154. **build_error** (critical)
   - ID: qi-build_error-1765184830422-eba2c76e
   - Description: Build error detected: tests/reasoning/evolution/pattern-scoring.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1159

1155. **build_error** (critical)
   - ID: qi-build_error-1765184830434-fda9dda4
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1160

1156. **build_error** (critical)
   - ID: qi-build_error-1765184830446-86819d13
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1161

1157. **build_error** (critical)
   - ID: qi-build_error-1765184830457-71efbe3b
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(16,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1162

1158. **build_error** (critical)
   - ID: qi-build_error-1765184830471-9af1f3cf
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(17,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1163

1159. **build_error** (critical)
   - ID: qi-build_error-1765184830483-2f7fa215
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(38,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1164

1160. **build_error** (critical)
   - ID: qi-build_error-1765184830494-04ff37d8
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(46,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1165

1161. **build_error** (critical)
   - ID: qi-build_error-1765184830506-a2f3975a
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(52,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1166

1162. **build_error** (critical)
   - ID: qi-build_error-1765184830520-e7cb8d7a
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(145,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1167

1163. **build_error** (critical)
   - ID: qi-build_error-1765184830531-72d0f8bd
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(203,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1168

1164. **build_error** (critical)
   - ID: qi-build_error-1765184830543-c59156bb
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(341,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1169

1165. **build_error** (critical)
   - ID: qi-build_error-1765184830555-58c4e763
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1170

1166. **build_error** (critical)
   - ID: qi-build_error-1765184830568-56d3ccb9
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1171

1167. **build_error** (critical)
   - ID: qi-build_error-1765184830580-0f1e7394
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(16,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1172

1168. **build_error** (critical)
   - ID: qi-build_error-1765184830592-0193e0af
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(17,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1173

1169. **build_error** (critical)
   - ID: qi-build_error-1765184830603-3ef7af78
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(28,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1174

1170. **build_error** (critical)
   - ID: qi-build_error-1765184830617-0c794472
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(36,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1175

1171. **build_error** (critical)
   - ID: qi-build_error-1765184830629-0b92171d
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(42,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1176

1172. **build_error** (critical)
   - ID: qi-build_error-1765184830641-2bf0db71
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(151,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1177

1173. **build_error** (critical)
   - ID: qi-build_error-1765184830653-2cdbae30
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(303,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1178

1174. **build_error** (critical)
   - ID: qi-build_error-1765184830667-2553332b
   - Description: Build error detected: tests/retirement/immutability.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1179

1175. **build_error** (critical)
   - ID: qi-build_error-1765184830679-ddb503e2
   - Description: Build error detected: tests/retirement/immutability.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1180

1176. **build_error** (critical)
   - ID: qi-build_error-1765184830690-f142a1a7
   - Description: Build error detected: tests/retirement/integration.test.ts(6,38): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1181

1177. **build_error** (critical)
   - ID: qi-build_error-1765184830703-25e872a6
   - Description: Build error detected: tests/retirement/integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1182

1178. **build_error** (critical)
   - ID: qi-build_error-1765184830716-fd92b339
   - Description: Build error detected: tests/retirement/integration.test.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1183

1179. **build_error** (critical)
   - ID: qi-build_error-1765184830728-8434872e
   - Description: Build error detected: tests/retirement/integration.test.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1184

1180. **build_error** (critical)
   - ID: qi-build_error-1765184830740-8c6fa2a8
   - Description: Build error detected: tests/retirement/integration.test.ts(13,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1185

1181. **build_error** (critical)
   - ID: qi-build_error-1765184830752-2e2a74cd
   - Description: Build error detected: tests/retirement/reasoning-integration.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1186

1182. **build_error** (critical)
   - ID: qi-build_error-1765184830765-867211a1
   - Description: Build error detected: tests/retirement/reasoning-integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1187

1183. **build_error** (critical)
   - ID: qi-build_error-1765184830777-83876ca5
   - Description: Build error detected: tests/retirement/staleness-retirement.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1188

1184. **build_error** (critical)
   - ID: qi-build_error-1765184830789-cc41617b
   - Description: Build error detected: tests/retirement/staleness-retirement.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1189

1185. **build_error** (critical)
   - ID: qi-build_error-1765184830801-ef9aa45b
   - Description: Build error detected: tests/retirement/supersession-retirement.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1190

1186. **build_error** (critical)
   - ID: qi-build_error-1765184830815-6b425dd7
   - Description: Build error detected: tests/retirement/supersession-retirement.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1191

1187. **build_error** (critical)
   - ID: qi-build_error-1765184830827-d226bfc7
   - Description: Build error detected: tests/watchdog/qiw-integration.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1192

1188. **build_error** (critical)
   - ID: qi-build_error-1765184830839-4b430976
   - Description: Build error detected: tests/watchdog/qiw-integration.test.ts(8,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1193

1189. **build_error** (critical)
   - ID: qi-build_error-1765184830852-85d6198e
   - Description: Build error detected: tests/watchdog/qiw-integration.test.ts(9,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1194

1190. **build_error** (critical)
   - ID: qi-build_error-1765184830865-dcb78e4e
   - Description: Build error detected: tests/watchdog/qiw-integration.test.ts(10,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1195

1191. **build_error** (critical)
   - ID: qi-build_error-1765184830877-4cc81b90
   - Description: Build error detected: tests/watchdog/qiw.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1196

1192. **build_error** (critical)
   - ID: qi-build_error-1765184830890-54b45f81
   - Description: Build error detected: tests/watchdog/qiw.test.ts(8,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1197

1193. **build_error** (critical)
   - ID: qi-build_error-1765184830902-a7a3c3a5
   - Description: Build error detected: tests/watchdog/qiw.test.ts(9,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1198

1194. **build_error** (critical)
   - ID: qi-build_error-1765184830916-4be2562d
   - Description: Build error detected: tests/watchdog/qiw.test.ts(10,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1199

1195. **build_error** (critical)
   - ID: qi-build_error-1765184830928-eea5a97b
   - Description: Build error detected: tests/watchdog/qiw.test.ts(259,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1200

## Auto-Generated Regression Tests

- **Tests Generated This Run**: 1195
- **Total Regression Tests**: 1198

---

# Log Parsing QA Report

**Overall Status**: ❌ FAILED

**Summary**: Log parsing FAILED: Build: build log FAILED: 1195 errors; Test: test log FAILED: 1016 errors

## Build Log

- **File**: /tmp/build.log
- **Exists**: Yes
- **Parsed**: Yes
- **Errors**: 1195
- **Warnings**: 0
- **Unwhitelisted Warnings**: 0
- **Status**: ❌ FAILED

### Build Errors

- Line 5: app/api/admin/approve/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 6: app/api/builder/api/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 7: app/api/builder/integration/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 8: app/api/builder/qa/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 9: app/api/builder/schema/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 10: app/api/builder/ui/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 11: app/api/foreman/analytics/builders/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 12: app/api/foreman/analytics/consolidation/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 13: app/api/foreman/analytics/drift/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 14: app/api/foreman/analytics/evolution/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 15: app/api/foreman/analytics/governance/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 16: app/api/foreman/analytics/memory/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 17: app/api/foreman/analytics/projects/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 18: app/api/foreman/analytics/qiw/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 19: app/api/foreman/analytics/qiw/route.ts(9,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 20: app/api/foreman/analytics/qiw/route.ts(10,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 21: app/api/foreman/analytics/qiw/route.ts(31,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 22: app/api/foreman/analytics/qiw/route.ts(44,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 23: app/api/foreman/analytics/summary/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 24: app/api/foreman/chat/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 25: app/api/foreman/chat/route.ts(7,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
- Line 26: app/api/foreman/chat/route.ts(15,6): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 27: app/api/foreman/chat/route.ts(20,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 28: app/api/foreman/chat/route.ts(30,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 29: app/api/foreman/chat/route.ts(52,37): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 30: app/api/foreman/feedback/route.ts(9,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 31: app/api/foreman/overnight/route.ts(8,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 32: app/api/foreman/projects/[id]/blockers/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 33: app/api/foreman/projects/[id]/dashboard/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 34: app/api/foreman/projects/[id]/s-curve/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 35: app/api/foreman/run-build/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 36: app/api/foreman/run-build/route.ts(133,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 37: app/api/foreman/run-build/route.ts(133,61): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 38: app/api/foreman/run-build/route.ts(134,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 39: app/api/foreman/run/route.ts(1,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 40: app/api/foreman/status/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 41: app/api/foreman/status/route.ts(9,22): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
- Line 42: app/api/foreman/status/route.ts(10,27): error TS2307: Cannot find module 'util' or its corresponding type declarations.
- Line 43: app/api/foreman/status/route.ts(78,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 44: app/api/foreman/status/route.ts(79,15): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 45: app/api/github/webhook/route.ts(1,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 46: app/api/github/webhook/route.ts(25,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 47: app/api/github/webhook/route.ts(37,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 48: app/api/github/webhook/route.ts(38,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 49: app/foreman/analytics/page.tsx(9,37): error TS2307: Cannot find module 'react' or its corresponding type declarations.
- Line 50: app/foreman/analytics/page.tsx(81,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 51: app/foreman/analytics/page.tsx(86,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 52: app/foreman/analytics/page.tsx(96,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 53: app/foreman/analytics/page.tsx(98,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 54: app/foreman/analytics/page.tsx(99,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 55: app/foreman/analytics/page.tsx(100,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 56: app/foreman/analytics/page.tsx(102,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 57: app/foreman/analytics/page.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 58: app/foreman/analytics/page.tsx(105,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 59: app/foreman/analytics/page.tsx(106,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 60: app/foreman/analytics/page.tsx(107,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 61: app/foreman/analytics/page.tsx(108,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 62: app/foreman/analytics/page.tsx(110,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 63: app/foreman/analytics/page.tsx(111,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 64: app/foreman/analytics/page.tsx(112,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 65: app/foreman/analytics/page.tsx(115,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
- Line 66: app/foreman/analytics/page.tsx(119,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 67: app/foreman/analytics/page.tsx(120,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 68: app/foreman/analytics/page.tsx(126,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 69: app/foreman/analytics/page.tsx(127,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 70: app/foreman/analytics/page.tsx(128,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 71: app/foreman/analytics/page.tsx(132,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 72: app/foreman/analytics/page.tsx(133,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 73: app/foreman/analytics/page.tsx(133,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 74: app/foreman/analytics/page.tsx(134,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 75: app/foreman/analytics/page.tsx(139,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 76: app/foreman/analytics/page.tsx(140,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 77: app/foreman/analytics/page.tsx(141,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 78: app/foreman/analytics/page.tsx(142,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 79: app/foreman/analytics/page.tsx(142,97): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 80: app/foreman/analytics/page.tsx(143,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 81: app/foreman/analytics/page.tsx(143,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 82: app/foreman/analytics/page.tsx(144,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 83: app/foreman/analytics/page.tsx(144,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 84: app/foreman/analytics/page.tsx(145,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 85: app/foreman/analytics/page.tsx(146,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 86: app/foreman/analytics/page.tsx(146,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 87: app/foreman/analytics/page.tsx(147,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 88: app/foreman/analytics/page.tsx(148,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 89: app/foreman/analytics/page.tsx(153,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 90: app/foreman/analytics/page.tsx(155,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 91: app/foreman/analytics/page.tsx(156,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 92: app/foreman/analytics/page.tsx(158,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 93: app/foreman/analytics/page.tsx(159,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 94: app/foreman/analytics/page.tsx(160,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 95: app/foreman/analytics/page.tsx(161,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 96: app/foreman/analytics/page.tsx(163,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 97: app/foreman/analytics/page.tsx(164,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 98: app/foreman/analytics/page.tsx(164,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 99: app/foreman/analytics/page.tsx(165,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 100: app/foreman/analytics/page.tsx(166,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 101: app/foreman/analytics/page.tsx(167,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 102: app/foreman/analytics/page.tsx(169,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 103: app/foreman/analytics/page.tsx(170,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 104: app/foreman/analytics/page.tsx(170,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 105: app/foreman/analytics/page.tsx(171,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 106: app/foreman/analytics/page.tsx(172,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 107: app/foreman/analytics/page.tsx(173,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 108: app/foreman/analytics/page.tsx(175,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 109: app/foreman/analytics/page.tsx(176,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 110: app/foreman/analytics/page.tsx(176,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 111: app/foreman/analytics/page.tsx(177,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 112: app/foreman/analytics/page.tsx(178,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 113: app/foreman/analytics/page.tsx(180,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 114: app/foreman/analytics/page.tsx(181,57): error TS7006: Parameter 'alert' implicitly has an 'any' type.
- Line 115: app/foreman/analytics/page.tsx(181,64): error TS7006: Parameter 'idx' implicitly has an 'any' type.
- Line 116: app/foreman/analytics/page.tsx(182,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 117: app/foreman/analytics/page.tsx(184,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 118: app/foreman/analytics/page.tsx(186,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 119: app/foreman/analytics/page.tsx(188,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 120: app/foreman/analytics/page.tsx(191,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 121: app/foreman/analytics/page.tsx(194,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 122: app/foreman/analytics/page.tsx(195,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 123: app/foreman/analytics/page.tsx(197,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 124: app/foreman/analytics/page.tsx(198,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 125: app/foreman/analytics/page.tsx(199,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 126: app/foreman/analytics/page.tsx(200,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 127: app/foreman/analytics/page.tsx(200,70): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 128: app/foreman/analytics/page.tsx(201,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 129: app/foreman/analytics/page.tsx(201,123): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 130: app/foreman/analytics/page.tsx(202,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 131: app/foreman/analytics/page.tsx(203,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 132: app/foreman/analytics/page.tsx(204,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 133: app/foreman/analytics/page.tsx(204,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 134: app/foreman/analytics/page.tsx(205,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 135: app/foreman/analytics/page.tsx(205,129): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 136: app/foreman/analytics/page.tsx(206,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 137: app/foreman/analytics/page.tsx(207,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 138: app/foreman/analytics/page.tsx(208,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 139: app/foreman/analytics/page.tsx(208,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 140: app/foreman/analytics/page.tsx(209,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 141: app/foreman/analytics/page.tsx(209,125): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 142: app/foreman/analytics/page.tsx(210,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 143: app/foreman/analytics/page.tsx(211,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 144: app/foreman/analytics/page.tsx(212,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 145: app/foreman/analytics/page.tsx(212,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 146: app/foreman/analytics/page.tsx(213,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 147: app/foreman/analytics/page.tsx(215,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 148: app/foreman/analytics/page.tsx(216,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 149: app/foreman/analytics/page.tsx(217,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 150: app/foreman/analytics/page.tsx(218,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 151: app/foreman/analytics/page.tsx(218,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 152: app/foreman/analytics/page.tsx(219,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 153: app/foreman/analytics/page.tsx(219,144): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 154: app/foreman/analytics/page.tsx(220,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 155: app/foreman/analytics/page.tsx(221,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 156: app/foreman/analytics/page.tsx(222,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 157: app/foreman/analytics/page.tsx(225,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 158: app/foreman/analytics/page.tsx(226,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 159: app/foreman/analytics/page.tsx(228,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 160: app/foreman/analytics/page.tsx(229,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 161: app/foreman/analytics/page.tsx(230,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 162: app/foreman/analytics/page.tsx(231,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 163: app/foreman/analytics/page.tsx(231,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 164: app/foreman/analytics/page.tsx(232,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 165: app/foreman/analytics/page.tsx(232,128): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 166: app/foreman/analytics/page.tsx(233,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 167: app/foreman/analytics/page.tsx(234,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 168: app/foreman/analytics/page.tsx(235,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 169: app/foreman/analytics/page.tsx(235,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 170: app/foreman/analytics/page.tsx(236,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 171: app/foreman/analytics/page.tsx(236,113): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 172: app/foreman/analytics/page.tsx(237,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 173: app/foreman/analytics/page.tsx(238,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 174: app/foreman/analytics/page.tsx(239,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 175: app/foreman/analytics/page.tsx(239,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 176: app/foreman/analytics/page.tsx(240,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 177: app/foreman/analytics/page.tsx(240,113): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 178: app/foreman/analytics/page.tsx(241,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 179: app/foreman/analytics/page.tsx(242,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 180: app/foreman/analytics/page.tsx(243,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 181: app/foreman/analytics/page.tsx(243,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 182: app/foreman/analytics/page.tsx(244,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 183: app/foreman/analytics/page.tsx(244,115): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 184: app/foreman/analytics/page.tsx(245,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 185: app/foreman/analytics/page.tsx(246,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 186: app/foreman/analytics/page.tsx(247,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 187: app/foreman/analytics/page.tsx(247,60): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 188: app/foreman/analytics/page.tsx(248,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 189: app/foreman/analytics/page.tsx(248,110): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 190: app/foreman/analytics/page.tsx(249,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 191: app/foreman/analytics/page.tsx(250,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 192: app/foreman/analytics/page.tsx(251,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 193: app/foreman/analytics/page.tsx(254,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 194: app/foreman/analytics/page.tsx(255,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 195: app/foreman/analytics/page.tsx(257,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 196: app/foreman/analytics/page.tsx(258,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 197: app/foreman/analytics/page.tsx(259,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 198: app/foreman/analytics/page.tsx(260,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 199: app/foreman/analytics/page.tsx(260,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 200: app/foreman/analytics/page.tsx(261,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 201: app/foreman/analytics/page.tsx(261,141): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 202: app/foreman/analytics/page.tsx(262,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 203: app/foreman/analytics/page.tsx(263,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 204: app/foreman/analytics/page.tsx(264,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 205: app/foreman/analytics/page.tsx(264,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 206: app/foreman/analytics/page.tsx(265,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 207: app/foreman/analytics/page.tsx(265,146): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 208: app/foreman/analytics/page.tsx(266,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 209: app/foreman/analytics/page.tsx(267,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 210: app/foreman/analytics/page.tsx(268,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 211: app/foreman/analytics/page.tsx(268,73): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 212: app/foreman/analytics/page.tsx(269,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 213: app/foreman/analytics/page.tsx(269,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 214: app/foreman/analytics/page.tsx(270,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 215: app/foreman/analytics/page.tsx(271,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 216: app/foreman/analytics/page.tsx(272,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 217: app/foreman/analytics/page.tsx(272,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 218: app/foreman/analytics/page.tsx(273,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 219: app/foreman/analytics/page.tsx(273,141): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 220: app/foreman/analytics/page.tsx(274,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 221: app/foreman/analytics/page.tsx(275,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 222: app/foreman/analytics/page.tsx(276,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 223: app/foreman/analytics/page.tsx(279,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 224: app/foreman/analytics/page.tsx(280,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 225: app/foreman/analytics/page.tsx(282,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 226: app/foreman/analytics/page.tsx(283,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 227: app/foreman/analytics/page.tsx(284,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 228: app/foreman/analytics/page.tsx(285,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 229: app/foreman/analytics/page.tsx(285,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 230: app/foreman/analytics/page.tsx(286,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 231: app/foreman/analytics/page.tsx(286,130): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 232: app/foreman/analytics/page.tsx(287,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 233: app/foreman/analytics/page.tsx(288,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 234: app/foreman/analytics/page.tsx(289,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 235: app/foreman/analytics/page.tsx(289,74): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 236: app/foreman/analytics/page.tsx(290,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 237: app/foreman/analytics/page.tsx(290,133): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 238: app/foreman/analytics/page.tsx(291,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 239: app/foreman/analytics/page.tsx(292,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 240: app/foreman/analytics/page.tsx(293,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 241: app/foreman/analytics/page.tsx(293,75): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 242: app/foreman/analytics/page.tsx(294,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 243: app/foreman/analytics/page.tsx(294,134): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 244: app/foreman/analytics/page.tsx(295,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 245: app/foreman/analytics/page.tsx(296,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 246: app/foreman/analytics/page.tsx(297,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 247: app/foreman/analytics/page.tsx(300,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 248: app/foreman/analytics/page.tsx(301,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 249: app/foreman/analytics/page.tsx(303,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 250: app/foreman/analytics/page.tsx(304,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 251: app/foreman/analytics/page.tsx(305,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 252: app/foreman/analytics/page.tsx(306,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 253: app/foreman/analytics/page.tsx(306,73): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 254: app/foreman/analytics/page.tsx(307,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 255: app/foreman/analytics/page.tsx(307,122): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 256: app/foreman/analytics/page.tsx(308,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 257: app/foreman/analytics/page.tsx(309,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 258: app/foreman/analytics/page.tsx(310,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 259: app/foreman/analytics/page.tsx(310,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 260: app/foreman/analytics/page.tsx(311,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 261: app/foreman/analytics/page.tsx(311,119): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 262: app/foreman/analytics/page.tsx(312,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 263: app/foreman/analytics/page.tsx(313,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 264: app/foreman/analytics/page.tsx(314,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 265: app/foreman/analytics/page.tsx(314,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 266: app/foreman/analytics/page.tsx(315,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 267: app/foreman/analytics/page.tsx(315,130): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 268: app/foreman/analytics/page.tsx(316,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 269: app/foreman/analytics/page.tsx(317,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 270: app/foreman/analytics/page.tsx(318,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 271: app/foreman/analytics/page.tsx(318,70): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 272: app/foreman/analytics/page.tsx(319,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 273: app/foreman/analytics/page.tsx(319,135): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 274: app/foreman/analytics/page.tsx(320,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 275: app/foreman/analytics/page.tsx(321,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 276: app/foreman/analytics/page.tsx(322,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 277: app/foreman/analytics/page.tsx(325,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 278: app/foreman/analytics/page.tsx(326,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 279: app/foreman/analytics/page.tsx(328,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 280: app/foreman/analytics/page.tsx(329,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 281: app/foreman/analytics/page.tsx(330,73): error TS7006: Parameter 'builder' implicitly has an 'any' type.
- Line 282: app/foreman/analytics/page.tsx(330,82): error TS7006: Parameter 'idx' implicitly has an 'any' type.
- Line 283: app/foreman/analytics/page.tsx(331,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 284: app/foreman/analytics/page.tsx(332,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 285: app/foreman/analytics/page.tsx(333,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 286: app/foreman/analytics/page.tsx(333,86): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 287: app/foreman/analytics/page.tsx(334,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 288: app/foreman/analytics/page.tsx(336,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 289: app/foreman/analytics/page.tsx(337,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 290: app/foreman/analytics/page.tsx(338,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 291: app/foreman/analytics/page.tsx(339,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 292: app/foreman/analytics/page.tsx(339,83): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 293: app/foreman/analytics/page.tsx(340,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 294: app/foreman/analytics/page.tsx(340,82): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 295: app/foreman/analytics/page.tsx(341,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 296: app/foreman/analytics/page.tsx(342,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 297: app/foreman/analytics/page.tsx(345,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 298: app/foreman/analytics/page.tsx(347,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 299: app/foreman/analytics/page.tsx(349,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 300: app/foreman/analytics/page.tsx(350,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 301: app/foreman/analytics/page.tsx(353,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 302: app/foreman/analytics/page.tsx(354,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 303: app/foreman/analytics/page.tsx(356,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 304: app/foreman/analytics/page.tsx(357,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 305: app/foreman/analytics/page.tsx(358,67): error TS7006: Parameter 'project' implicitly has an 'any' type.
- Line 306: app/foreman/analytics/page.tsx(358,76): error TS7006: Parameter 'idx' implicitly has an 'any' type.
- Line 307: app/foreman/analytics/page.tsx(359,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 308: app/foreman/analytics/page.tsx(360,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 309: app/foreman/analytics/page.tsx(361,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 310: app/foreman/analytics/page.tsx(361,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 311: app/foreman/analytics/page.tsx(362,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 312: app/foreman/analytics/page.tsx(364,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 313: app/foreman/analytics/page.tsx(365,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 314: app/foreman/analytics/page.tsx(366,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 315: app/foreman/analytics/page.tsx(367,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 316: app/foreman/analytics/page.tsx(367,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 317: app/foreman/analytics/page.tsx(368,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 318: app/foreman/analytics/page.tsx(368,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 319: app/foreman/analytics/page.tsx(369,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 320: app/foreman/analytics/page.tsx(369,61): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 321: app/foreman/analytics/page.tsx(370,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 322: app/foreman/analytics/page.tsx(371,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 323: app/foreman/analytics/page.tsx(374,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 324: app/foreman/analytics/page.tsx(376,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 325: app/foreman/analytics/page.tsx(378,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 326: app/foreman/analytics/page.tsx(379,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 327: app/foreman/analytics/page.tsx(382,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 328: app/foreman/analytics/page.tsx(383,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 329: app/foreman/analytics/page.tsx(385,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 330: app/foreman/analytics/page.tsx(386,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 331: app/foreman/analytics/page.tsx(387,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 332: app/foreman/analytics/page.tsx(388,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 333: app/foreman/analytics/page.tsx(388,75): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 334: app/foreman/analytics/page.tsx(389,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 335: app/foreman/analytics/page.tsx(389,123): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 336: app/foreman/analytics/page.tsx(390,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 337: app/foreman/analytics/page.tsx(391,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 338: app/foreman/analytics/page.tsx(392,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 339: app/foreman/analytics/page.tsx(392,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 340: app/foreman/analytics/page.tsx(393,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 341: app/foreman/analytics/page.tsx(393,136): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 342: app/foreman/analytics/page.tsx(394,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 343: app/foreman/analytics/page.tsx(395,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 344: app/foreman/analytics/page.tsx(396,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 345: app/foreman/analytics/page.tsx(396,74): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 346: app/foreman/analytics/page.tsx(397,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 347: app/foreman/analytics/page.tsx(397,148): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 348: app/foreman/analytics/page.tsx(398,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 349: app/foreman/analytics/page.tsx(400,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 350: app/foreman/analytics/page.tsx(401,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 351: app/foreman/analytics/page.tsx(401,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 352: app/foreman/analytics/page.tsx(402,81): error TS7006: Parameter 'rule' implicitly has an 'any' type.
- Line 353: app/foreman/analytics/page.tsx(402,87): error TS7006: Parameter 'idx' implicitly has an 'any' type.
- Line 354: app/foreman/analytics/page.tsx(403,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 355: app/foreman/analytics/page.tsx(405,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 356: app/foreman/analytics/page.tsx(407,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 357: app/foreman/analytics/page.tsx(409,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 358: app/foreman/analytics/page.tsx(410,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 359: app/foreman/analytics/page.tsx(412,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 360: app/foreman/analytics/page.tsx(413,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 361: app/foreman/analytics/page.tsx(415,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 362: app/foreman/analytics/page.tsx(416,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 363: app/foreman/analytics/page.tsx(419,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 364: app/foreman/analytics/page.tsx(424,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 365: app/foreman/analytics/page.tsx(425,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 366: app/foreman/page.tsx(8,45): error TS2307: Cannot find module 'react' or its corresponding type declarations.
- Line 367: app/foreman/page.tsx(55,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 368: app/foreman/page.tsx(97,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 369: app/foreman/page.tsx(107,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 370: app/foreman/page.tsx(125,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 371: app/foreman/page.tsx(175,22): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 372: app/foreman/page.tsx(186,22): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 373: app/foreman/page.tsx(197,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 374: app/foreman/page.tsx(204,30): error TS2503: Cannot find namespace 'React'.
- Line 375: app/foreman/page.tsx(212,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 376: app/foreman/page.tsx(217,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 377: app/foreman/page.tsx(231,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 378: app/foreman/page.tsx(233,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 379: app/foreman/page.tsx(235,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 380: app/foreman/page.tsx(237,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 381: app/foreman/page.tsx(238,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 382: app/foreman/page.tsx(239,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 383: app/foreman/page.tsx(239,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 384: app/foreman/page.tsx(240,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 385: app/foreman/page.tsx(241,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 386: app/foreman/page.tsx(243,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 387: app/foreman/page.tsx(244,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 388: app/foreman/page.tsx(244,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 389: app/foreman/page.tsx(245,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 390: app/foreman/page.tsx(246,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 391: app/foreman/page.tsx(247,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 392: app/foreman/page.tsx(247,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 393: app/foreman/page.tsx(248,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 394: app/foreman/page.tsx(248,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 395: app/foreman/page.tsx(249,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 396: app/foreman/page.tsx(250,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 397: app/foreman/page.tsx(251,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 398: app/foreman/page.tsx(251,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 399: app/foreman/page.tsx(252,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 400: app/foreman/page.tsx(252,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 401: app/foreman/page.tsx(253,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 402: app/foreman/page.tsx(254,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 403: app/foreman/page.tsx(255,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 404: app/foreman/page.tsx(255,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 405: app/foreman/page.tsx(256,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 406: app/foreman/page.tsx(256,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 407: app/foreman/page.tsx(257,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 408: app/foreman/page.tsx(258,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 409: app/foreman/page.tsx(259,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 410: app/foreman/page.tsx(259,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 411: app/foreman/page.tsx(260,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 412: app/foreman/page.tsx(260,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 413: app/foreman/page.tsx(261,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 414: app/foreman/page.tsx(262,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 415: app/foreman/page.tsx(263,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 416: app/foreman/page.tsx(266,30): error TS7006: Parameter 'message' implicitly has an 'any' type.
- Line 417: app/foreman/page.tsx(267,29): error TS2322: Type '{ key: any; message: any; }' is not assignable to type 'ChatBubbleProps'.
- Line 419: app/foreman/page.tsx(272,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 420: app/foreman/page.tsx(274,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 421: app/foreman/page.tsx(278,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 422: app/foreman/page.tsx(279,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 423: app/foreman/page.tsx(280,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 424: app/foreman/page.tsx(281,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 425: app/foreman/page.tsx(282,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 426: app/foreman/page.tsx(282,103): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 427: app/foreman/page.tsx(283,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 428: app/foreman/page.tsx(283,138): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 429: app/foreman/page.tsx(284,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 430: app/foreman/page.tsx(284,138): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 431: app/foreman/page.tsx(285,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 432: app/foreman/page.tsx(286,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 433: app/foreman/page.tsx(286,85): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 434: app/foreman/page.tsx(287,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 435: app/foreman/page.tsx(288,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 436: app/foreman/page.tsx(289,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 437: app/foreman/page.tsx(292,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 438: app/foreman/page.tsx(293,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 439: app/foreman/page.tsx(296,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 440: app/foreman/page.tsx(297,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 441: app/foreman/page.tsx(298,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 442: app/foreman/page.tsx(301,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
- Line 443: app/foreman/page.tsx(307,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 444: app/foreman/page.tsx(313,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 445: app/foreman/page.tsx(314,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 446: app/foreman/page.tsx(315,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 447: app/foreman/page.tsx(317,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 448: app/foreman/page.tsx(318,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 449: app/foreman/page.tsx(319,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 450: app/foreman/page.tsx(322,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 451: app/foreman/page.tsx(323,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 452: app/foreman/page.tsx(324,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 453: app/foreman/page.tsx(326,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 454: app/foreman/page.tsx(335,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 455: app/foreman/page.tsx(336,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 456: app/foreman/page.tsx(336,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 457: app/foreman/page.tsx(337,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 458: app/foreman/page.tsx(339,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 459: app/foreman/page.tsx(340,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 460: app/foreman/page.tsx(342,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 461: app/foreman/page.tsx(345,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 462: app/foreman/page.tsx(346,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 463: app/foreman/page.tsx(348,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 464: app/foreman/page.tsx(350,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 465: app/foreman/page.tsx(353,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 466: app/foreman/page.tsx(354,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 467: app/foreman/page.tsx(356,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 468: app/foreman/page.tsx(357,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 469: app/foreman/page.tsx(358,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 470: app/foreman/page.tsx(360,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 471: app/foreman/page.tsx(361,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 472: app/foreman/page.tsx(363,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 473: app/foreman/page.tsx(364,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 474: app/foreman/page.tsx(366,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 475: app/foreman/page.tsx(367,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 476: app/foreman/page.tsx(368,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 477: app/foreman/page.tsx(369,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 478: app/foreman/page.tsx(370,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 479: app/foreman/page.tsx(371,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 480: app/foreman/page.tsx(374,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 481: app/foreman/page.tsx(379,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 482: app/foreman/page.tsx(380,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 483: app/layout.tsx(1,31): error TS2307: Cannot find module 'next' or its corresponding type declarations.
- Line 484: app/layout.tsx(12,13): error TS2503: Cannot find namespace 'React'.
- Line 485: app/layout.tsx(15,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 486: app/layout.tsx(16,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 487: app/layout.tsx(16,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 488: app/layout.tsx(17,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 489: app/page.tsx(5,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 490: app/page.tsx(6,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 491: app/page.tsx(7,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 492: app/page.tsx(7,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 493: app/page.tsx(8,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 494: app/page.tsx(10,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 495: app/page.tsx(12,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 496: app/page.tsx(13,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 497: components/ForemanStatus.tsx(8,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 498: components/ForemanStatus.tsx(9,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 499: components/ForemanStatus.tsx(9,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 500: components/ForemanStatus.tsx(10,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 501: components/ForemanStatus.tsx(11,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 502: components/ForemanStatus.tsx(12,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 503: components/ForemanStatus.tsx(12,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 504: components/ForemanStatus.tsx(13,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 505: components/ForemanStatus.tsx(13,62): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 506: components/ForemanStatus.tsx(14,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 507: components/ForemanStatus.tsx(15,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 508: components/ForemanStatus.tsx(16,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 509: components/ForemanStatus.tsx(16,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 510: components/ForemanStatus.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 511: components/ForemanStatus.tsx(17,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 512: components/ForemanStatus.tsx(18,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 513: components/ForemanStatus.tsx(19,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 514: components/ForemanStatus.tsx(20,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 515: components/ForemanStatus.tsx(20,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 516: components/ForemanStatus.tsx(21,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 517: components/ForemanStatus.tsx(21,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 518: components/ForemanStatus.tsx(22,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 519: components/ForemanStatus.tsx(23,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 520: components/ForemanStatus.tsx(24,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 521: components/LayoutShell.tsx(6,27): error TS2307: Cannot find module 'react' or its corresponding type declarations.
- Line 522: components/LayoutShell.tsx(14,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 523: components/LayoutShell.tsx(15,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 524: components/LayoutShell.tsx(16,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 525: components/LayoutShell.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 526: components/LayoutShell.tsx(18,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 527: components/LayoutShell.tsx(20,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 528: components/LayoutShell.tsx(21,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 529: components/LayoutShell.tsx(22,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 530: components/LayoutShell.tsx(24,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 531: components/LayoutShell.tsx(25,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 532: components/LayoutShell.tsx(27,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 533: components/LayoutShell.tsx(28,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 534: components/LayoutShell.tsx(29,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 535: components/LayoutShell.tsx(30,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 536: components/LayoutShell.tsx(31,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 537: components/LayoutShell.tsx(32,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 538: components/LayoutShell.tsx(34,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 539: components/LayoutShell.tsx(35,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 540: components/foreman/BuildTimeline.tsx(30,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 541: components/foreman/BuildTimeline.tsx(31,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 542: components/foreman/BuildTimeline.tsx(31,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 543: components/foreman/BuildTimeline.tsx(32,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 544: components/foreman/BuildTimeline.tsx(39,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 545: components/foreman/BuildTimeline.tsx(41,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 546: components/foreman/BuildTimeline.tsx(52,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 547: components/foreman/BuildTimeline.tsx(52,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 548: components/foreman/BuildTimeline.tsx(53,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 549: components/foreman/BuildTimeline.tsx(56,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 550: components/foreman/BuildTimeline.tsx(57,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 551: components/foreman/BuildTimeline.tsx(69,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 552: components/foreman/BuildTimeline.tsx(71,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 553: components/foreman/BuildTimeline.tsx(71,81): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 554: components/foreman/BuildTimeline.tsx(73,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 555: components/foreman/BuildTimeline.tsx(77,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 556: components/foreman/BuildTimeline.tsx(77,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 557: components/foreman/BuildTimeline.tsx(80,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 558: components/foreman/BuildTimeline.tsx(80,56): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 559: components/foreman/BuildTimeline.tsx(82,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 560: components/foreman/BuildTimeline.tsx(85,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 561: components/foreman/BuildTimeline.tsx(89,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 562: components/foreman/BuildTimeline.tsx(90,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 563: components/foreman/BuildTimeline.tsx(92,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 564: components/foreman/BuildTimeline.tsx(93,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 565: components/foreman/BuildTimeline.tsx(93,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 566: components/foreman/BuildTimeline.tsx(94,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 567: components/foreman/BuildTimeline.tsx(96,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 568: components/foreman/BuildTimeline.tsx(97,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 569: components/foreman/BuildTimeline.tsx(100,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 570: components/foreman/BuildTimeline.tsx(101,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 571: components/foreman/BuildTimeline.tsx(101,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 572: components/foreman/BuildTimeline.tsx(102,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 573: components/foreman/BuildTimeline.tsx(102,91): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 574: components/foreman/BuildTimeline.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 575: components/foreman/BuildTimeline.tsx(106,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 576: components/foreman/BuildTimeline.tsx(107,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 577: components/foreman/BuildTimeline.tsx(107,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 578: components/foreman/BuildTimeline.tsx(108,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 579: components/foreman/BuildTimeline.tsx(115,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 580: components/foreman/BuildTimeline.tsx(116,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 581: components/foreman/BuildTimeline.tsx(118,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 582: components/foreman/BuildTimeline.tsx(119,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 583: components/foreman/BuildTimeline.tsx(124,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 584: components/foreman/BuildTimeline.tsx(125,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 585: components/foreman/BuildTimeline.tsx(126,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 586: components/foreman/BuildTimeline.tsx(126,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 587: components/foreman/BuildTimeline.tsx(127,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 588: components/foreman/BuildTimeline.tsx(127,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 589: components/foreman/BuildTimeline.tsx(128,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 590: components/foreman/BuildTimeline.tsx(129,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 591: components/foreman/BuildTimeline.tsx(131,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 592: components/foreman/ChatBubble.tsx(8,27): error TS2307: Cannot find module 'react-markdown' or its corresponding type declarations.
- Line 593: components/foreman/ChatBubble.tsx(9,23): error TS2307: Cannot find module 'remark-gfm' or its corresponding type declarations.
- Line 594: components/foreman/ChatBubble.tsx(22,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 595: components/foreman/ChatBubble.tsx(23,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 596: components/foreman/ChatBubble.tsx(31,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 597: components/foreman/ChatBubble.tsx(34,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 598: components/foreman/ChatBubble.tsx(34,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 599: components/foreman/ChatBubble.tsx(35,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 600: components/foreman/ChatBubble.tsx(35,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 601: components/foreman/ChatBubble.tsx(36,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 602: components/foreman/ChatBubble.tsx(38,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 603: components/foreman/ChatBubble.tsx(39,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 604: components/foreman/ChatBubble.tsx(42,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 605: components/foreman/ChatBubble.tsx(43,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 606: components/foreman/ChatBubble.tsx(51,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 607: components/foreman/ChatBubble.tsx(52,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 608: components/foreman/ChatBubble.tsx(56,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 609: components/foreman/ChatBubble.tsx(58,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 610: components/foreman/ChatBubble.tsx(64,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 611: components/foreman/ChatBubble.tsx(67,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 612: components/foreman/ChatBubble.tsx(73,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 613: components/foreman/ChatBubble.tsx(76,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 614: components/foreman/ChatBubble.tsx(82,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 615: components/foreman/ChatBubble.tsx(85,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 616: components/foreman/ChatBubble.tsx(91,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 617: components/foreman/ChatBubble.tsx(94,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 618: components/foreman/ChatBubble.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 619: components/foreman/ChatBubble.tsx(105,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 620: components/foreman/ChatBubble.tsx(110,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 621: components/foreman/ChatBubble.tsx(113,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 622: components/foreman/ChatBubble.tsx(113,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 623: components/foreman/ChatBubble.tsx(114,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 624: components/foreman/ChatBubble.tsx(116,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 625: components/foreman/ChatBubble.tsx(124,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 626: components/foreman/ChatBubble.tsx(124,61): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 627: components/foreman/ChatBubble.tsx(126,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 628: components/foreman/ChatBubble.tsx(128,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 629: components/foreman/ChatBubble.tsx(131,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 630: components/foreman/ChatBubble.tsx(133,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 631: components/foreman/ChatBubble.tsx(135,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 632: components/foreman/ChatBubble.tsx(137,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 633: components/foreman/ChatBubble.tsx(138,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 634: components/foreman/ChatBubble.tsx(140,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 635: components/foreman/ChatBubble.tsx(141,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 636: components/foreman/Header.tsx(32,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 637: components/foreman/Header.tsx(33,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 638: components/foreman/Header.tsx(34,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 639: components/foreman/Header.tsx(36,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 640: components/foreman/Header.tsx(37,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 641: components/foreman/Header.tsx(37,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 642: components/foreman/Header.tsx(38,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 643: components/foreman/Header.tsx(40,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 644: components/foreman/Header.tsx(41,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 645: components/foreman/Header.tsx(43,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 646: components/foreman/Header.tsx(44,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 647: components/foreman/Header.tsx(46,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 648: components/foreman/Header.tsx(47,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 649: components/foreman/Header.tsx(47,81): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 650: components/foreman/Header.tsx(48,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 651: components/foreman/Header.tsx(48,79): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 652: components/foreman/Header.tsx(49,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 653: components/foreman/Header.tsx(53,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 654: components/foreman/Header.tsx(53,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 655: components/foreman/Header.tsx(54,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 656: components/foreman/Header.tsx(56,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 657: components/foreman/Header.tsx(59,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 658: components/foreman/Header.tsx(60,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 659: components/foreman/Header.tsx(61,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 660: components/foreman/Header.tsx(65,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 661: components/foreman/Header.tsx(70,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 662: components/foreman/Header.tsx(70,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 663: components/foreman/Header.tsx(71,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 664: components/foreman/Header.tsx(71,34): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 665: components/foreman/Header.tsx(72,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 666: components/foreman/Header.tsx(74,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 667: components/foreman/Header.tsx(75,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 668: components/foreman/Sidebar.tsx(8,26): error TS2307: Cannot find module 'react' or its corresponding type declarations.
- Line 669: components/foreman/Sidebar.tsx(32,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 670: components/foreman/Sidebar.tsx(34,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 671: components/foreman/Sidebar.tsx(35,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 672: components/foreman/Sidebar.tsx(39,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 673: components/foreman/Sidebar.tsx(39,54): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 674: components/foreman/Sidebar.tsx(40,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 675: components/foreman/Sidebar.tsx(40,67): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 676: components/foreman/Sidebar.tsx(52,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 677: components/foreman/Sidebar.tsx(59,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 678: components/foreman/Sidebar.tsx(64,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 679: components/foreman/Sidebar.tsx(70,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 680: components/foreman/Sidebar.tsx(73,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 681: components/foreman/Sidebar.tsx(74,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 682: components/foreman/Sidebar.tsx(77,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 683: components/foreman/Sidebar.tsx(78,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 684: components/foreman/Sidebar.tsx(84,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 685: components/foreman/Sidebar.tsx(84,39): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 686: components/foreman/Sidebar.tsx(85,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 687: components/foreman/Sidebar.tsx(85,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 688: components/foreman/Sidebar.tsx(86,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 689: components/foreman/Sidebar.tsx(87,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 690: components/foreman/Sidebar.tsx(88,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 691: components/foreman/StatusEvent.tsx(39,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 692: components/foreman/StatusEvent.tsx(42,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 693: components/foreman/StatusEvent.tsx(42,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 694: components/foreman/StatusEvent.tsx(43,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 695: components/foreman/StatusEvent.tsx(44,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 696: components/foreman/StatusEvent.tsx(44,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 697: components/foreman/StatusEvent.tsx(46,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 698: components/foreman/StatusEvent.tsx(48,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 699: components/foreman/StatusEvent.tsx(50,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 700: components/foreman/StatusEvent.tsx(51,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 701: components/foreman/UploadDropzone.tsx(8,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 702: components/foreman/UploadDropzone.tsx(9,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 703: components/foreman/UploadDropzone.tsx(10,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 704: components/foreman/UploadDropzone.tsx(11,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 705: components/foreman/UploadDropzone.tsx(11,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 706: components/foreman/UploadDropzone.tsx(12,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 707: components/foreman/UploadDropzone.tsx(13,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 708: components/foreman/UploadDropzone.tsx(14,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 709: components/foreman/UploadDropzone.tsx(14,85): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 710: components/foreman/UploadDropzone.tsx(15,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 711: components/foreman/UploadDropzone.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 712: components/foreman/UploadDropzone.tsx(18,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 713: components/foreman/UploadDropzone.tsx(19,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 714: components/foreman/UploadDropzone.tsx(24,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 715: components/foreman/UploadDropzone.tsx(25,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 716: components/foreman/UploadDropzone.tsx(26,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 717: lib/builder/memory-injector.ts(167,23): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 718: lib/builder/memory-injector.ts(371,12): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 719: lib/builder/memory-injector.ts(376,12): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 720: lib/foreman/analytics/consolidation-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 721: lib/foreman/analytics/consolidation-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 722: lib/foreman/analytics/evolution-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 723: lib/foreman/analytics/evolution-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 724: lib/foreman/analytics/governance-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 725: lib/foreman/analytics/governance-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 726: lib/foreman/analytics/memory-analytics.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 727: lib/foreman/analytics/memory-analytics.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 728: lib/foreman/analytics/retirement-analytics.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 729: lib/foreman/analytics/retirement-analytics.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 730: lib/foreman/build-report.ts(8,31): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 731: lib/foreman/build-report.ts(9,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 732: lib/foreman/build-report.ts(473,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 733: lib/foreman/build-sequence.ts(6,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
- Line 734: lib/foreman/build-sequence.ts(27,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 735: lib/foreman/build-sequence.ts(53,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 736: lib/foreman/build-sequence.ts(54,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 737: lib/foreman/build-sequence.ts(58,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 738: lib/foreman/chat-executor.ts(1371,29): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 739: lib/foreman/chat-executor.ts(1372,31): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 740: lib/foreman/chat-executor.ts(1374,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 741: lib/foreman/desktop-sync.ts(16,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 742: lib/foreman/desktop-sync.ts(18,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 743: lib/foreman/desktop-sync.ts(19,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 744: lib/foreman/desktop-sync.ts(248,12): error TS2503: Cannot find namespace 'NodeJS'.
- Line 745: lib/foreman/desktop-sync.ts(302,53): error TS2503: Cannot find namespace 'NodeJS'.
- Line 746: lib/foreman/dispatch.ts(55,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 747: lib/foreman/dispatch.ts(56,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 748: lib/foreman/dispatch.ts(60,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 749: lib/foreman/dispatch.ts(69,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 750: lib/foreman/dispatch.ts(70,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 751: lib/foreman/dispatch.ts(72,36): error TS7006: Parameter 's' implicitly has an 'any' type.
- Line 752: lib/foreman/feedback/processor.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 753: lib/foreman/feedback/processor.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 754: lib/foreman/feedback/processor.ts(32,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 755: lib/foreman/feedback/processor.ts(314,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 756: lib/foreman/feedback/processor.ts(353,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 757: lib/foreman/governance/type-safety-events.ts(8,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 758: lib/foreman/governance/type-safety-events.ts(9,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 759: lib/foreman/governance/type-safety-events.ts(76,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 760: lib/foreman/governance/type-safety-events.ts(113,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 761: lib/foreman/initialization.ts(6,41): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 762: lib/foreman/initialization.ts(7,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 763: lib/foreman/initialization.ts(34,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 764: lib/foreman/initialization.ts(35,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 765: lib/foreman/initialization.ts(36,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 766: lib/foreman/initialization.ts(37,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 767: lib/foreman/initialization.ts(66,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 768: lib/foreman/initialization.ts(89,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 769: lib/foreman/initialization.ts(90,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 770: lib/foreman/initialization.ts(91,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 771: lib/foreman/initialization.ts(92,23): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 772: lib/foreman/initialization.ts(125,29): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 773: lib/foreman/initialization.ts(203,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 774: lib/foreman/initialization.ts(203,66): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 775: lib/foreman/initialization.ts(204,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 776: lib/foreman/initialization.ts(204,64): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 777: lib/foreman/initialization.ts(216,57): error TS7006: Parameter 's' implicitly has an 'any' type.
- Line 778: lib/foreman/initialization.ts(232,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 779: lib/foreman/initialization.ts(258,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 780: lib/foreman/local-builder.ts(64,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 781: lib/foreman/local-builder.ts(110,28): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 782: lib/foreman/memory/consolidation-engine.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 783: lib/foreman/memory/consolidation-engine.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 784: lib/foreman/memory/consolidation-engine.ts(11,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
- Line 785: lib/foreman/memory/consolidation-engine.ts(12,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
- Line 786: lib/foreman/memory/consolidation-engine.ts(56,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 787: lib/foreman/memory/consolidation-engine.ts(84,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 788: lib/foreman/memory/consolidation-engine.ts(324,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 789: lib/foreman/memory/drift-monitor.ts(21,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 790: lib/foreman/memory/drift-monitor.ts(22,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 791: lib/foreman/memory/drift-monitor.ts(23,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
- Line 792: lib/foreman/memory/drift-monitor.ts(24,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
- Line 793: lib/foreman/memory/drift-monitor.ts(90,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 794: lib/foreman/memory/drift-monitor.ts(398,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 795: lib/foreman/memory/drift-monitor.ts(595,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 796: lib/foreman/memory/drift-monitor.ts(930,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 797: lib/foreman/memory/qa-miss-tracker.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 798: lib/foreman/memory/qa-miss-tracker.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 799: lib/foreman/memory/qa-miss-tracker.ts(114,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 800: lib/foreman/memory/qa-miss-tracker.ts(134,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 801: lib/foreman/memory/qa-miss-tracker.ts(193,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 802: lib/foreman/memory/qa-miss-tracker.ts(199,50): error TS7006: Parameter 'f' implicitly has an 'any' type.
- Line 803: lib/foreman/memory/qa-miss-tracker.ts(259,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 804: lib/foreman/memory/qa-miss-tracker.ts(294,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 805: lib/foreman/memory/retirement-engine.ts(15,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 806: lib/foreman/memory/retirement-engine.ts(16,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 807: lib/foreman/memory/retirement-engine.ts(65,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 808: lib/foreman/memory/retirement-engine.ts(89,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 809: lib/foreman/memory/retirement-engine.ts(394,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 810: lib/foreman/memory/storage.ts(6,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 811: lib/foreman/memory/storage.ts(7,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 812: lib/foreman/memory/storage.ts(19,23): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 813: lib/foreman/orchestrator.ts(1,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
- Line 814: lib/foreman/orchestrator.ts(6,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 815: lib/foreman/overnight-execution.ts(24,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 816: lib/foreman/overnight-execution.ts(48,23): error TS7006: Parameter 'issue' implicitly has an 'any' type.
- Line 817: lib/foreman/overnight-execution.ts(52,32): error TS7006: Parameter 'label' implicitly has an 'any' type.
- Line 818: lib/foreman/pilot-qa-check.ts(6,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 819: lib/foreman/pilot-qa-check.ts(7,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 820: lib/foreman/pilot-qa-check.ts(26,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 821: lib/foreman/pilot-qa-check.ts(91,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 822: lib/foreman/projects/storage.ts(6,16): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
- Line 823: lib/foreman/projects/storage.ts(7,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 824: lib/foreman/projects/storage.ts(14,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 825: lib/foreman/projects/storage.ts(15,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 826: lib/foreman/projects/storage.ts(15,53): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 827: lib/foreman/qa/enhanced-qa-runner.ts(33,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 828: lib/foreman/qa/enhanced-qa-runner.ts(65,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 829: lib/foreman/qa/enhanced-qa-runner.ts(277,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 830: lib/foreman/qa/log-generator.ts(19,26): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
- Line 831: lib/foreman/qa/log-generator.ts(20,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 832: lib/foreman/qa/log-generator.ts(21,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 833: lib/foreman/qa/log-generator.ts(42,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 834: lib/foreman/qa/log-generator.ts(64,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 835: lib/foreman/qa/log-generator.ts(115,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 836: lib/foreman/qa/log-generator.ts(145,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 837: lib/foreman/qa/log-generator.ts(175,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 838: lib/foreman/qa/log-generator.ts(205,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 839: lib/foreman/qa/log-parsing-qa.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 840: lib/foreman/qa/log-parsing-qa.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 841: lib/foreman/qa/log-parsing-qa.ts(82,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 842: lib/foreman/qa/log-parsing-qa.ts(144,20): error TS7006: Parameter 'line' implicitly has an 'any' type.
- Line 843: lib/foreman/qa/log-parsing-qa.ts(144,26): error TS7006: Parameter 'index' implicitly has an 'any' type.
- Line 844: lib/foreman/qa/qi-incident-writer.ts(23,25): error TS2307: Cannot find module 'crypto' or its corresponding type declarations.
- Line 845: lib/foreman/qa/qiel-runner.ts(109,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 846: lib/foreman/qa/qiel-runner.ts(500,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 847: lib/foreman/qa/qiel-runner.ts(518,14): error TS2580: Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 848: lib/foreman/qa/regression-test-generator.ts(13,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 849: lib/foreman/qa/regression-test-generator.ts(14,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 850: lib/foreman/qa/regression-test-generator.ts(274,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 851: lib/foreman/qa/regression-test-generator.ts(333,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 852: lib/foreman/qa/regression-test-generator.ts(340,23): error TS7006: Parameter 'f' implicitly has an 'any' type.
- Line 853: lib/foreman/qa/schema-cohesion-validator.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 854: lib/foreman/qa/schema-cohesion-validator.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 855: lib/foreman/qa/schema-cohesion-validator.ts(13,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
- Line 856: lib/foreman/qa/schema-cohesion-validator.ts(14,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
- Line 857: lib/foreman/qa/schema-cohesion-validator.ts(86,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 858: lib/foreman/qa/schema-cohesion-validator.ts(147,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 859: lib/foreman/qa/vercel-simulation-qa.ts(14,26): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
- Line 860: lib/foreman/qa/vercel-simulation-qa.ts(15,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 861: lib/foreman/qa/vercel-simulation-qa.ts(16,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 862: lib/foreman/qa/vercel-simulation-qa.ts(45,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 863: lib/foreman/qa/vercel-simulation-qa.ts(203,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 864: lib/foreman/qa/zero-warning-policy.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 865: lib/foreman/qa/zero-warning-policy.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 866: lib/foreman/qiel-config.ts(19,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 867: lib/foreman/qiel-config.ts(20,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 868: lib/foreman/qiel-config.ts(332,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 869: lib/foreman/qiel-config.ts(367,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 870: lib/foreman/reasoning/engine.ts(57,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 871: lib/foreman/reasoning/engine.ts(58,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 872: lib/foreman/reasoning/engine.ts(691,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 873: lib/foreman/reasoning/engine.ts(702,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 874: lib/foreman/reasoning/engine.ts(718,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 875: lib/foreman/reasoning/engine.ts(738,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 876: lib/foreman/reasoning/engine.ts(754,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 877: lib/foreman/reasoning/evolution-engine.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 878: lib/foreman/reasoning/evolution-engine.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 879: lib/foreman/reasoning/evolution-engine.ts(314,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 880: lib/foreman/reasoning/evolution-engine.ts(351,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 881: lib/foreman/reasoning/evolution-engine.ts(533,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 882: lib/foreman/reasoning/patterns.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 883: lib/foreman/reasoning/patterns.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 884: lib/foreman/reasoning/patterns.ts(123,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 885: lib/foreman/run-self-test.ts(6,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
- Line 886: lib/foreman/run-self-test.ts(87,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 887: lib/foreman/run-self-test.ts(93,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 888: lib/foreman/run-self-test.ts(125,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 889: lib/foreman/run-self-test.ts(127,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 890: lib/foreman/run-self-test.ts(127,56): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 891: lib/foreman/run-self-test.ts(167,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 892: lib/foreman/run-self-test.ts(177,15): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 893: lib/foreman/run-self-test.ts(204,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 894: lib/foreman/run-self-test.ts(210,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 895: lib/foreman/run-self-test.ts(215,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 896: lib/foreman/watchdog/quality-integrity-watchdog.ts(20,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 897: lib/foreman/watchdog/quality-integrity-watchdog.ts(21,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 898: lib/foreman/watchdog/quality-integrity-watchdog.ts(144,20): error TS7006: Parameter 'line' implicitly has an 'any' type.
- Line 899: lib/foreman/watchdog/quality-integrity-watchdog.ts(144,26): error TS7006: Parameter 'index' implicitly has an 'any' type.
- Line 900: lib/foreman/watchdog/quality-integrity-watchdog.ts(420,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 901: lib/github.ts(22,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 902: lib/github.ts(23,44): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 903: lib/github.ts(24,52): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 904: lib/github.ts(25,50): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 905: lib/github/client.ts(1,25): error TS2307: Cannot find module 'octokit' or its corresponding type declarations.
- Line 906: lib/github/client.ts(4,9): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 907: lib/github/loadFiles.ts(2,35): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
- Line 908: lib/github/loadFiles.ts(3,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 909: lib/github/loadFiles.ts(39,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 910: lib/github/loadFiles.ts(40,16): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 911: lib/github/loadFiles.ts(41,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 912: lib/github/loadFiles.ts(91,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 913: lib/github/pr-builder.ts(6,25): error TS2307: Cannot find module 'octokit' or its corresponding type declarations.
- Line 914: lib/openai.ts(16,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 915: tailwind.config.ts(1,29): error TS2307: Cannot find module 'tailwindcss' or its corresponding type declarations.
- Line 916: tailwind.config.ts(24,5): error TS2580: Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 917: tests/analytics/builder-performance.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 918: tests/analytics/consolidation-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 919: tests/analytics/drift-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 920: tests/analytics/evolution-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 921: tests/analytics/governance-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 922: tests/analytics/memory-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 923: tests/analytics/project-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 924: tests/analytics/retirement-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 925: tests/analytics/summary-endpoint.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 926: tests/builder-memory/context-filtering.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 927: tests/builder-memory/context-filtering.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 928: tests/builder-memory/context-size-limit.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 929: tests/builder-memory/context-size-limit.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 930: tests/builder-memory/end-to-end-build-flow.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 931: tests/builder-memory/end-to-end-build-flow.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 932: tests/builder-memory/end-to-end-build-flow.test.ts(32,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 933: tests/builder-memory/end-to-end-build-flow.test.ts(37,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 934: tests/builder-memory/end-to-end-build-flow.test.ts(86,7): error TS18048: 'task.memoryContext' is possibly 'undefined'.
- Line 935: tests/builder-memory/end-to-end-build-flow.test.ts(90,7): error TS18048: 'task.memoryContext' is possibly 'undefined'.
- Line 936: tests/builder-memory/end-to-end-build-flow.test.ts(143,29): error TS18048: 'task.memoryContext' is possibly 'undefined'.
- Line 937: tests/builder-memory/governance-interference.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 938: tests/builder-memory/governance-interference.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 939: tests/builder-memory/governance-interference.test.ts(109,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 940: tests/builder-memory/governance-interference.test.ts(110,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 941: tests/builder-memory/governance-interference.test.ts(135,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 942: tests/builder-memory/governance-interference.test.ts(141,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 943: tests/builder-memory/governance-interference.test.ts(142,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 944: tests/builder-memory/governance-interference.test.ts(176,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 945: tests/builder-memory/integration-drift-guard.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 946: tests/builder-memory/integration-drift-guard.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 947: tests/builder-memory/integration-drift-guard.test.ts(121,7): error TS18048: 'task.memoryContext' is possibly 'undefined'.
- Line 948: tests/consolidation/engine.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 949: tests/consolidation/engine.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 950: tests/consolidation/engine.test.ts(51,26): error TS18048: 'qaPattern' is possibly 'undefined'.
- Line 951: tests/consolidation/engine.test.ts(67,26): error TS18048: 'archPattern' is possibly 'undefined'.
- Line 952: tests/dashboard/blockers.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 953: tests/dashboard/dashboard.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 954: tests/dashboard/deployment.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 955: tests/dashboard/memory.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 956: tests/dashboard/milestones.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 957: tests/dashboard/s-curve.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 958: tests/dashboard/status.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 959: tests/dashboard/test-utils.ts(6,30): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 960: tests/dashboard/test-utils.ts(7,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 961: tests/dashboard/test-utils.ts(14,28): error TS2304: Cannot find name '__dirname'.
- Line 962: tests/dashboard/timeline.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 963: tests/feedback/builder-feedback-flow.test.ts(6,42): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 964: tests/feedback/builder-feedback-flow.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 965: tests/feedback/builder-feedback-flow.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 966: tests/feedback/builder-feedback-flow.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 967: tests/feedback/builder-feedback-flow.test.ts(14,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 968: tests/feedback/builder-feedback-flow.test.ts(114,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 969: tests/feedback/builder-feedback-flow.test.ts(143,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 970: tests/feedback/builder-feedback-flow.test.ts(167,15): error TS18048: 'result.errors' is possibly 'undefined'.
- Line 971: tests/feedback/drift-detection-agent-experience.test.ts(6,42): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 972: tests/feedback/drift-detection-agent-experience.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 973: tests/feedback/drift-detection-agent-experience.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 974: tests/feedback/drift-detection-agent-experience.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 975: tests/feedback/drift-detection-agent-experience.test.ts(15,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 976: tests/feedback/feedback-model-validation.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 977: tests/feedback/feedback-model-validation.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 978: tests/feedback/feedback-model-validation.test.ts(35,15): error TS18048: 'result.errors' is possibly 'undefined'.
- Line 979: tests/feedback/feedback-model-validation.test.ts(49,15): error TS18048: 'result.errors' is possibly 'undefined'.
- Line 980: tests/feedback/feedback-model-validation.test.ts(63,15): error TS18048: 'result.errors' is possibly 'undefined'.
- Line 981: tests/feedback/feedback-model-validation.test.ts(77,15): error TS18048: 'result.errors' is possibly 'undefined'.
- Line 982: tests/feedback/feedback-model-validation.test.ts(91,15): error TS18048: 'result.warnings' is possibly 'undefined'.
- Line 983: tests/feedback/governance-conflict-detection.test.ts(6,42): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 984: tests/feedback/governance-conflict-detection.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 985: tests/feedback/governance-conflict-detection.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 986: tests/feedback/governance-conflict-detection.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 987: tests/feedback/governance-conflict-detection.test.ts(14,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 988: tests/feedback/multi-agent-harmonization.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 989: tests/feedback/multi-agent-harmonization.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 990: tests/feedback/multi-agent-harmonization.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 991: tests/feedback/multi-agent-harmonization.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 992: tests/feedback/multi-agent-harmonization.test.ts(71,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 993: tests/feedback/regression.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 994: tests/feedback/regression.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 995: tests/gsr/gsr-enforcement.test.ts(13,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 996: tests/gsr/gsr-enforcement.test.ts(14,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 997: tests/gsr/gsr-enforcement.test.ts(250,15): error TS18048: 'result.uiReviewMessage' is possibly 'undefined'.
- Line 998: tests/gsr/gsr-enforcement.test.ts(347,15): error TS18048: 'result.uiReviewMessage' is possibly 'undefined'.
- Line 999: tests/gsr/gsr-enforcement.test.ts(348,15): error TS18048: 'result.uiReviewMessage' is possibly 'undefined'.
- Line 1000: tests/local-builder/fallback.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1001: tests/local-builder/fallback.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1002: tests/local-builder/fallback.test.ts(46,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1003: tests/local-builder/fallback.test.ts(53,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1004: tests/local-builder/fallback.test.ts(58,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1005: tests/local-builder/fallback.test.ts(79,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1006: tests/local-builder/fallback.test.ts(86,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1007: tests/local-builder/fallback.test.ts(99,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1008: tests/local-builder/fallback.test.ts(106,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1009: tests/local-builder/fallback.test.ts(128,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1010: tests/local-builder/fallback.test.ts(129,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1011: tests/local-builder/integration.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1012: tests/local-builder/integration.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1013: tests/local-builder/integration.test.ts(15,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1014: tests/local-builder/integration.test.ts(16,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1015: tests/local-builder/integration.test.ts(48,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1016: tests/local-builder/integration.test.ts(49,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1017: tests/local-builder/integration.test.ts(63,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1018: tests/local-builder/integration.test.ts(64,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1019: tests/local-builder/integration.test.ts(65,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1020: tests/local-builder/integration.test.ts(85,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1021: tests/local-builder/integration.test.ts(86,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1022: tests/local-builder/integration.test.ts(87,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1023: tests/local-builder/integration.test.ts(92,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1024: tests/local-builder/integration.test.ts(112,26): error TS18048: 'task.input' is possibly 'undefined'.
- Line 1025: tests/local-builder/integration.test.ts(113,17): error TS18048: 'task.input' is possibly 'undefined'.
- Line 1026: tests/local-builder/integration.test.ts(114,17): error TS18048: 'task.input' is possibly 'undefined'.
- Line 1027: tests/local-builder/integration.test.ts(118,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1028: tests/local-builder/integration.test.ts(124,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1029: tests/local-builder/integration.test.ts(125,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1030: tests/local-builder/integration.test.ts(148,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1031: tests/local-builder/integration.test.ts(149,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1032: tests/memory-drift/auto-recommendation.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1033: tests/memory-drift/auto-recommendation.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1034: tests/memory-drift/contradiction-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1035: tests/memory-drift/contradiction-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1036: tests/memory-drift/cross-agent-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1037: tests/memory-drift/cross-agent-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1038: tests/memory-drift/cross-agent-drift.test.ts(12,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1039: tests/memory-drift/cross-agent-drift.test.ts(13,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1040: tests/memory-drift/cross-agent-drift.test.ts(33,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1041: tests/memory-drift/cross-agent-drift.test.ts(68,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1042: tests/memory-drift/cross-agent-drift.test.ts(96,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1043: tests/memory-drift/governance-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1044: tests/memory-drift/governance-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1045: tests/memory-drift/integration.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1046: tests/memory-drift/integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1047: tests/memory-drift/schema-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1048: tests/memory-drift/schema-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1049: tests/memory-drift/staleness-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1050: tests/memory-drift/staleness-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1051: tests/memory-fabric/structure.test.ts(15,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1052: tests/memory-fabric/structure.test.ts(16,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
- Line 1053: tests/memory-fabric/structure.test.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1054: tests/memory-fabric/structure.test.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1055: tests/memory-fabric/structure.test.ts(28,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1056: tests/overnight-execution/overnight-execution.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1057: tests/overnight-execution/overnight-execution.test.ts(8,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1058: tests/overnight-execution/overnight-execution.test.ts(88,24): error TS18048: 'heavyTaskRule' is possibly 'undefined'.
- Line 1059: tests/overnight-execution/overnight-execution.test.ts(92,24): error TS18048: 'multiFileRule' is possibly 'undefined'.
- Line 1060: tests/overnight-execution/overnight-execution.test.ts(97,24): error TS18048: 'archRule' is possibly 'undefined'.
- Line 1061: tests/overnight-execution/overnight-execution.test.ts(206,15): error TS18048: 'escalationIssue' is possibly 'undefined'.
- Line 1062: tests/overnight-execution/overnight-execution.test.ts(214,15): error TS18048: 'syncIssue' is possibly 'undefined'.
- Line 1063: tests/overnight-execution/overnight-execution.test.ts(222,15): error TS18048: 'healIssue' is possibly 'undefined'.
- Line 1064: tests/overnight-execution/overnight-execution.test.ts(230,15): error TS18048: 'gsrIssue' is possibly 'undefined'.
- Line 1065: tests/qa-structural/build-simulation.test.ts(14,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1066: tests/qa-structural/build-simulation.test.ts(15,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
- Line 1067: tests/qa-structural/build-simulation.test.ts(16,22): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
- Line 1068: tests/qa-structural/build-simulation.test.ts(17,27): error TS2307: Cannot find module 'util' or its corresponding type declarations.
- Line 1069: tests/qa-structural/build-simulation.test.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1070: tests/qa-structural/build-simulation.test.ts(21,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1071: tests/qa-structural/build-simulation.test.ts(65,31): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
- Line 1072: tests/qa-structural/build-simulation.test.ts(90,16): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1073: tests/qa-structural/build-simulation.test.ts(158,31): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
- Line 1074: tests/qa-structural/build-simulation.test.ts(187,31): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
- Line 1075: tests/qa-structural/cross-engine-interface.test.ts(14,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1076: tests/qa-structural/cross-engine-interface.test.ts(15,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
- Line 1077: tests/qa-structural/type-validation.test.ts(14,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1078: tests/qa-structural/type-validation.test.ts(15,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
- Line 1079: tests/qa/qa-system.test.ts(11,37): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1080: tests/qa/qa-system.test.ts(12,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1081: tests/qa/qa-system.test.ts(13,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1082: tests/qa/qa-system.test.ts(14,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1083: tests/qa/qa-system.test.ts(24,19): error TS7006: Parameter 'file' implicitly has an 'any' type.
- Line 1084: tests/qa/qa-system.test.ts(32,33): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1085: tests/qa/qa-system.test.ts(177,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1086: tests/qa/qa-system.test.ts(183,33): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1087: tests/qa/qa-system.test.ts(237,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1088: tests/qic/qic-loader.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1089: tests/qic/qic-loader.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1090: tests/qic/qiel-system.test.ts(12,37): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1091: tests/qic/qiel-system.test.ts(13,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1092: tests/qic/qiel-system.test.ts(14,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1093: tests/qic/qiel-system.test.ts(15,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1094: tests/qic/qiel-system.test.ts(169,39): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1095: tests/qic/qiel-system.test.ts(219,33): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1096: tests/qic/qiel-system.test.ts(300,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
- Line 1097: tests/qiel/env-diff.test.ts(13,36): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1098: tests/qiel/env-diff.test.ts(14,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1099: tests/qiel/env-diff.test.ts(15,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1100: tests/qiel/env-diff.test.ts(16,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1101: tests/qiel/env-diff.test.ts(95,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1102: tests/qiel/env-diff.test.ts(122,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1103: tests/qiel/env-diff.test.ts(137,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1104: tests/qiel/env-diff.test.ts(155,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1105: tests/qiel/env-diff.test.ts(169,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1106: tests/qiel/env-diff.test.ts(278,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1107: tests/qiel/env-diff.test.ts(290,41): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1108: tests/qiel/env-diff.test.ts(328,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1109: tests/qiel/env-diff.test.ts(333,41): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1110: tests/qiel/qiel-alignment.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1111: tests/qiel/qiel-alignment.test.ts(8,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1112: tests/qiel/qiel-alignment.test.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1113: tests/qiel/qiel-alignment.test.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1114: tests/reasoning/engine.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1115: tests/reasoning/engine.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1116: tests/reasoning/engine.test.ts(217,26): error TS18047: 'snapshot.project' is possibly 'null'.
- Line 1117: tests/reasoning/evolution/builder-impact.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1118: tests/reasoning/evolution/builder-impact.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1119: tests/reasoning/evolution/builder-impact.test.ts(16,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1120: tests/reasoning/evolution/builder-impact.test.ts(17,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1121: tests/reasoning/evolution/builder-impact.test.ts(28,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1122: tests/reasoning/evolution/builder-impact.test.ts(36,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
- Line 1123: tests/reasoning/evolution/builder-impact.test.ts(124,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1124: tests/reasoning/evolution/builder-impact.test.ts(214,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1125: tests/reasoning/evolution/builder-impact.test.ts(281,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1126: tests/reasoning/evolution/builder-impact.test.ts(333,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1127: tests/reasoning/evolution/consolidation-integration.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1128: tests/reasoning/evolution/consolidation-integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1129: tests/reasoning/evolution/consolidation-integration.test.ts(15,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1130: tests/reasoning/evolution/consolidation-integration.test.ts(16,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1131: tests/reasoning/evolution/consolidation-integration.test.ts(26,44): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1132: tests/reasoning/evolution/consolidation-integration.test.ts(30,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
- Line 1133: tests/reasoning/evolution/consolidation-integration.test.ts(41,32): error TS7006: Parameter 'file' implicitly has an 'any' type.
- Line 1134: tests/reasoning/evolution/consolidation-integration.test.ts(99,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1135: tests/reasoning/evolution/consolidation-integration.test.ts(201,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1136: tests/reasoning/evolution/consolidation-integration.test.ts(229,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1137: tests/reasoning/evolution/consolidation-integration.test.ts(297,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1138: tests/reasoning/evolution/consolidation-integration.test.ts(307,36): error TS7006: Parameter 'f' implicitly has an 'any' type.
- Line 1139: tests/reasoning/evolution/evolution-cycle.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1140: tests/reasoning/evolution/evolution-cycle.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1141: tests/reasoning/evolution/evolution-cycle.test.ts(14,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1142: tests/reasoning/evolution/evolution-cycle.test.ts(15,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1143: tests/reasoning/evolution/evolution-cycle.test.ts(26,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1144: tests/reasoning/evolution/evolution-cycle.test.ts(38,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1145: tests/reasoning/evolution/evolution-cycle.test.ts(77,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1146: tests/reasoning/evolution/evolution-cycle.test.ts(99,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1147: tests/reasoning/evolution/governance-compliance.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1148: tests/reasoning/evolution/governance-compliance.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1149: tests/reasoning/evolution/governance-compliance.test.ts(12,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1150: tests/reasoning/evolution/governance-compliance.test.ts(13,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1151: tests/reasoning/evolution/governance-compliance.test.ts(23,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1152: tests/reasoning/evolution/governance-compliance.test.ts(31,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
- Line 1153: tests/reasoning/evolution/governance-compliance.test.ts(38,37): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1154: tests/reasoning/evolution/governance-compliance.test.ts(64,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1155: tests/reasoning/evolution/governance-compliance.test.ts(87,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1156: tests/reasoning/evolution/governance-compliance.test.ts(95,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1157: tests/reasoning/evolution/governance-compliance.test.ts(133,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1158: tests/reasoning/evolution/pattern-scoring.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1159: tests/reasoning/evolution/pattern-scoring.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1160: tests/reasoning/evolution/recovery-from-failure.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1161: tests/reasoning/evolution/recovery-from-failure.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1162: tests/reasoning/evolution/recovery-from-failure.test.ts(16,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1163: tests/reasoning/evolution/recovery-from-failure.test.ts(17,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1164: tests/reasoning/evolution/recovery-from-failure.test.ts(38,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1165: tests/reasoning/evolution/recovery-from-failure.test.ts(46,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
- Line 1166: tests/reasoning/evolution/recovery-from-failure.test.ts(52,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1167: tests/reasoning/evolution/recovery-from-failure.test.ts(145,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1168: tests/reasoning/evolution/recovery-from-failure.test.ts(203,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1169: tests/reasoning/evolution/recovery-from-failure.test.ts(341,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1170: tests/reasoning/evolution/regression-prevention.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1171: tests/reasoning/evolution/regression-prevention.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1172: tests/reasoning/evolution/regression-prevention.test.ts(16,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1173: tests/reasoning/evolution/regression-prevention.test.ts(17,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1174: tests/reasoning/evolution/regression-prevention.test.ts(28,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1175: tests/reasoning/evolution/regression-prevention.test.ts(36,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
- Line 1176: tests/reasoning/evolution/regression-prevention.test.ts(42,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1177: tests/reasoning/evolution/regression-prevention.test.ts(151,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1178: tests/reasoning/evolution/regression-prevention.test.ts(303,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1179: tests/retirement/immutability.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1180: tests/retirement/immutability.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1181: tests/retirement/integration.test.ts(6,38): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1182: tests/retirement/integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1183: tests/retirement/integration.test.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1184: tests/retirement/integration.test.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1185: tests/retirement/integration.test.ts(13,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 1186: tests/retirement/reasoning-integration.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1187: tests/retirement/reasoning-integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1188: tests/retirement/staleness-retirement.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1189: tests/retirement/staleness-retirement.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1190: tests/retirement/supersession-retirement.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1191: tests/retirement/supersession-retirement.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1192: tests/watchdog/qiw-integration.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1193: tests/watchdog/qiw-integration.test.ts(8,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1194: tests/watchdog/qiw-integration.test.ts(9,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1195: tests/watchdog/qiw-integration.test.ts(10,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1196: tests/watchdog/qiw.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
- Line 1197: tests/watchdog/qiw.test.ts(8,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
- Line 1198: tests/watchdog/qiw.test.ts(9,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 1199: tests/watchdog/qiw.test.ts(10,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 1200: tests/watchdog/qiw.test.ts(259,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.

## Lint Log

- **File**: /tmp/lint.log
- **Exists**: Yes
- **Parsed**: Yes
- **Errors**: 0
- **Warnings**: 0
- **Unwhitelisted Warnings**: 0
- **Status**: ✅ PASSED

## Test Log

- **File**: /tmp/test.log
- **Exists**: Yes
- **Parsed**: Yes
- **Errors**: 1016
- **Warnings**: 6
- **Unwhitelisted Warnings**: 0
- **Status**: ❌ FAILED

### Test Errors

- Line 7: #   const err = new Error(message);
- Line 9: # Error: Cannot find module 'ajv'
- Line 42: error: 'test failed'
- Line 46: #   const err = new Error(message);
- Line 48: # Error: Cannot find module 'ajv'
- Line 81: error: 'test failed'
- Line 85: #   const err = new Error(message);
- Line 87: # Error: Cannot find module 'ajv'
- Line 120: error: 'test failed'
- Line 124: #   const err = new Error(message);
- Line 126: # Error: Cannot find module 'ajv'
- Line 159: error: 'test failed'
- Line 163: #   const err = new Error(message);
- Line 165: # Error: Cannot find module 'ajv'
- Line 198: error: 'test failed'
- Line 202: #   const err = new Error(message);
- Line 204: # Error: Cannot find module 'ajv'
- Line 237: error: 'test failed'
- Line 241: #   const err = new Error(message);
- Line 243: # Error: Cannot find module 'ajv'
- Line 276: error: 'test failed'
- Line 280: #   const err = new Error(message);
- Line 282: # Error: Cannot find module 'ajv'
- Line 315: error: 'test failed'
- Line 319: #   const err = new Error(message);
- Line 321: # Error: Cannot find module 'ajv'
- Line 354: error: 'test failed'
- Line 358: #   const err = new Error(message);
- Line 360: # Error: Cannot find module 'ajv'
- Line 395: error: 'test failed'
- Line 399: #   const err = new Error(message);
- Line 401: # Error: Cannot find module 'ajv'
- Line 436: error: 'test failed'
- Line 440: #   const err = new Error(message);
- Line 442: # Error: Cannot find module 'ajv'
- Line 479: error: 'test failed'
- Line 483: #   const err = new Error(message);
- Line 485: # Error: Cannot find module 'ajv'
- Line 522: error: 'test failed'
- Line 526: #   const err = new Error(message);
- Line 528: # Error: Cannot find module 'ajv'
- Line 565: error: 'test failed'
- Line 569: #   const err = new Error(message);
- Line 571: # Error: Cannot find module 'ajv'
- Line 600: error: 'test failed'
- Line 1222: #   const err = new Error(message);
- Line 1224: # Error: Cannot find module 'ajv'
- Line 1253: error: 'test failed'
- Line 1373: #   const err = new Error(message);
- Line 1375: # Error: Cannot find module 'ajv'
- Line 1404: error: 'test failed'
- Line 1724: #   const err = new Error(message);
- Line 1726: # Error: Cannot find module 'ajv'
- Line 1759: error: 'test failed'
- Line 1763: #   const err = new Error(message);
- Line 1765: # Error: Cannot find module 'ajv'
- Line 1802: error: 'test failed'
- Line 1806: #   const err = new Error(message);
- Line 1808: # Error: Cannot find module 'ajv'
- Line 1839: error: 'test failed'
- Line 1843: #   const err = new Error(message);
- Line 1845: # Error: Cannot find module 'ajv'
- Line 1876: error: 'test failed'
- Line 1880: #   const err = new Error(message);
- Line 1882: # Error: Cannot find module 'ajv'
- Line 1913: error: 'test failed'
- Line 1917: #   const err = new Error(message);
- Line 1919: # Error: Cannot find module 'ajv'
- Line 1950: error: 'test failed'
- Line 1954: #   const err = new Error(message);
- Line 1956: # Error: Cannot find module 'ajv'
- Line 1987: error: 'test failed'
- Line 1991: #   const err = new Error(message);
- Line 1993: # Error: Cannot find module 'ajv'
- Line 2024: error: 'test failed'
- Line 2028: #   const err = new Error(message);
- Line 2030: # Error: Cannot find module 'ajv'
- Line 2061: error: 'test failed'
- Line 2361: error: |-
- Line 2362: TypeScript compilation failed in production code:
- Line 2363: app/api/admin/approve/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2364: app/api/builder/api/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2365: app/api/builder/integration/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2366: app/api/builder/qa/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2367: app/api/builder/schema/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2368: app/api/builder/ui/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2369: app/api/foreman/analytics/builders/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2370: app/api/foreman/analytics/consolidation/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2371: app/api/foreman/analytics/drift/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2372: app/api/foreman/analytics/evolution/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2373: app/api/foreman/analytics/governance/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2374: app/api/foreman/analytics/memory/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2375: app/api/foreman/analytics/projects/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2376: app/api/foreman/analytics/qiw/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2377: app/api/foreman/analytics/qiw/route.ts(9,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 2378: app/api/foreman/analytics/qiw/route.ts(10,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 2379: app/api/foreman/analytics/qiw/route.ts(31,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2380: app/api/foreman/analytics/qiw/route.ts(44,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2381: app/api/foreman/analytics/summary/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2382: app/api/foreman/chat/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2383: app/api/foreman/chat/route.ts(7,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
- Line 2384: app/api/foreman/chat/route.ts(15,6): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2385: app/api/foreman/chat/route.ts(20,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2386: app/api/foreman/chat/route.ts(30,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2387: app/api/foreman/chat/route.ts(52,37): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2388: app/api/foreman/feedback/route.ts(9,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2389: app/api/foreman/overnight/route.ts(8,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2390: app/api/foreman/projects/[id]/blockers/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2391: app/api/foreman/projects/[id]/dashboard/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2392: app/api/foreman/projects/[id]/s-curve/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2393: app/api/foreman/run-build/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2394: app/api/foreman/run-build/route.ts(133,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2395: app/api/foreman/run-build/route.ts(133,61): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2396: app/api/foreman/run-build/route.ts(134,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2397: app/api/foreman/run/route.ts(1,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2398: app/api/foreman/status/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2399: app/api/foreman/status/route.ts(9,22): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
- Line 2400: app/api/foreman/status/route.ts(10,27): error TS2307: Cannot find module 'util' or its corresponding type declarations.
- Line 2401: app/api/foreman/status/route.ts(78,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2402: app/api/foreman/status/route.ts(79,15): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2403: app/api/github/webhook/route.ts(1,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
- Line 2404: app/api/github/webhook/route.ts(25,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2405: app/api/github/webhook/route.ts(37,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2406: app/api/github/webhook/route.ts(38,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 2407: app/foreman/analytics/page.tsx(9,37): error TS2307: Cannot find module 'react' or its corresponding type declarations.
- Line 2408: app/foreman/analytics/page.tsx(81,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2409: app/foreman/analytics/page.tsx(86,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2410: app/foreman/analytics/page.tsx(96,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2411: app/foreman/analytics/page.tsx(98,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2412: app/foreman/analytics/page.tsx(99,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2413: app/foreman/analytics/page.tsx(100,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2414: app/foreman/analytics/page.tsx(102,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2415: app/foreman/analytics/page.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2416: app/foreman/analytics/page.tsx(105,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2417: app/foreman/analytics/page.tsx(106,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2418: app/foreman/analytics/page.tsx(107,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2419: app/foreman/analytics/page.tsx(108,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2420: app/foreman/analytics/page.tsx(110,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2421: app/foreman/analytics/page.tsx(111,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2422: app/foreman/analytics/page.tsx(112,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2423: app/foreman/analytics/page.tsx(115,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
- Line 2424: app/foreman/analytics/page.tsx(119,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2425: app/foreman/analytics/page.tsx(120,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2426: app/foreman/analytics/page.tsx(126,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2427: app/foreman/analytics/page.tsx(127,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2428: app/foreman/analytics/page.tsx(128,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2429: app/foreman/analytics/page.tsx(132,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2430: app/foreman/analytics/page.tsx(133,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2431: app/foreman/analytics/page.tsx(133,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2432: app/foreman/analytics/page.tsx(134,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2433: app/foreman/analytics/page.tsx(139,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2434: app/foreman/analytics/page.tsx(140,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2435: app/foreman/analytics/page.tsx(141,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2436: app/foreman/analytics/page.tsx(142,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2437: app/foreman/analytics/page.tsx(142,97): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2438: app/foreman/analytics/page.tsx(143,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2439: app/foreman/analytics/page.tsx(143,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2440: app/foreman/analytics/page.tsx(144,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2441: app/foreman/analytics/page.tsx(144,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2442: app/foreman/analytics/page.tsx(145,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2443: app/foreman/analytics/page.tsx(146,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2444: app/foreman/analytics/page.tsx(146,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2445: app/foreman/analytics/page.tsx(147,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2446: app/foreman/analytics/page.tsx(148,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2447: app/foreman/analytics/page.tsx(153,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2448: app/foreman/analytics/page.tsx(155,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2449: app/foreman/analytics/page.tsx(156,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2450: app/foreman/analytics/page.tsx(158,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2451: app/foreman/analytics/page.tsx(159,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2452: app/foreman/analytics/page.tsx(160,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2453: app/foreman/analytics/page.tsx(161,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2454: app/foreman/analytics/page.tsx(163,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2455: app/foreman/analytics/page.tsx(164,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2456: app/foreman/analytics/page.tsx(164,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2457: app/foreman/analytics/page.tsx(165,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2458: app/foreman/analytics/page.tsx(166,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2459: app/foreman/analytics/page.tsx(167,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2460: app/foreman/analytics/page.tsx(169,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2461: app/foreman/analytics/page.tsx(170,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2462: app/foreman/analytics/page.tsx(170,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2463: app/foreman/analytics/page.tsx(171,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2464: app/foreman/analytics/page.tsx(172,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2465: app/foreman/analytics/page.tsx(173,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2466: app/foreman/analytics/page.tsx(175,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2467: app/foreman/analytics/page.tsx(176,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2468: app/foreman/analytics/page.tsx(176,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2469: app/foreman/analytics/page.tsx(177,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2470: app/foreman/analytics/page.tsx(178,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2471: app/foreman/analytics/page.tsx(180,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2472: app/foreman/analytics/page.tsx(181,57): error TS7006: Parameter 'alert' implicitly has an 'any' type.
- Line 2473: app/foreman/analytics/page.tsx(181,64): error TS7006: Parameter 'idx' implicitly has an 'any' type.
- Line 2474: app/foreman/analytics/page.tsx(182,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2475: app/foreman/analytics/page.tsx(184,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2476: app/foreman/analytics/page.tsx(186,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2477: app/foreman/analytics/page.tsx(188,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2478: app/foreman/analytics/page.tsx(191,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2479: app/foreman/analytics/page.tsx(194,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2480: app/foreman/analytics/page.tsx(195,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2481: app/foreman/analytics/page.tsx(197,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2482: app/foreman/analytics/page.tsx(198,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2483: app/foreman/analytics/page.tsx(199,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2484: app/foreman/analytics/page.tsx(200,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2485: app/foreman/analytics/page.tsx(200,70): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2486: app/foreman/analytics/page.tsx(201,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2487: app/foreman/analytics/page.tsx(201,123): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2488: app/foreman/analytics/page.tsx(202,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2489: app/foreman/analytics/page.tsx(203,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2490: app/foreman/analytics/page.tsx(204,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2491: app/foreman/analytics/page.tsx(204,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2492: app/foreman/analytics/page.tsx(205,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2493: app/foreman/analytics/page.tsx(205,129): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2494: app/foreman/analytics/page.tsx(206,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2495: app/foreman/analytics/page.tsx(207,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2496: app/foreman/analytics/page.tsx(208,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2497: app/foreman/analytics/page.tsx(208,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2498: app/foreman/analytics/page.tsx(209,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2499: app/foreman/analytics/page.tsx(209,125): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2500: app/foreman/analytics/page.tsx(210,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2501: app/foreman/analytics/page.tsx(211,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2502: app/foreman/analytics/page.tsx(212,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2503: app/foreman/analytics/page.tsx(212,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2504: app/foreman/analytics/page.tsx(213,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2505: app/foreman/analytics/page.tsx(215,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2506: app/foreman/analytics/page.tsx(216,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2507: app/foreman/analytics/page.tsx(217,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2508: app/foreman/analytics/page.tsx(218,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2509: app/foreman/analytics/page.tsx(218,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2510: app/foreman/analytics/page.tsx(219,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2511: app/foreman/analytics/page.tsx(219,144): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2512: app/foreman/analytics/page.tsx(220,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2513: app/foreman/analytics/page.tsx(221,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2514: app/foreman/analytics/page.tsx(222,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2515: app/foreman/analytics/page.tsx(225,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2516: app/foreman/analytics/page.tsx(226,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2517: app/foreman/analytics/page.tsx(228,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2518: app/foreman/analytics/page.tsx(229,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2519: app/foreman/analytics/page.tsx(230,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2520: app/foreman/analytics/page.tsx(231,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2521: app/foreman/analytics/page.tsx(231,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2522: app/foreman/analytics/page.tsx(232,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2523: app/foreman/analytics/page.tsx(232,128): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2524: app/foreman/analytics/page.tsx(233,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2525: app/foreman/analytics/page.tsx(234,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2526: app/foreman/analytics/page.tsx(235,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2527: app/foreman/analytics/page.tsx(235,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2528: app/foreman/analytics/page.tsx(236,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2529: app/foreman/analytics/page.tsx(236,113): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2530: app/foreman/analytics/page.tsx(237,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2531: app/foreman/analytics/page.tsx(238,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2532: app/foreman/analytics/page.tsx(239,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2533: app/foreman/analytics/page.tsx(239,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2534: app/foreman/analytics/page.tsx(240,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2535: app/foreman/analytics/page.tsx(240,113): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2536: app/foreman/analytics/page.tsx(241,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2537: app/foreman/analytics/page.tsx(242,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2538: app/foreman/analytics/page.tsx(243,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2539: app/foreman/analytics/page.tsx(243,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2540: app/foreman/analytics/page.tsx(244,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2541: app/foreman/analytics/page.tsx(244,115): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2542: app/foreman/analytics/page.tsx(245,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2543: app/foreman/analytics/page.tsx(246,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2544: app/foreman/analytics/page.tsx(247,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2545: app/foreman/analytics/page.tsx(247,60): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2546: app/foreman/analytics/page.tsx(248,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2547: app/foreman/analytics/page.tsx(248,110): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2548: app/foreman/analytics/page.tsx(249,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2549: app/foreman/analytics/page.tsx(250,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2550: app/foreman/analytics/page.tsx(251,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2551: app/foreman/analytics/page.tsx(254,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2552: app/foreman/analytics/page.tsx(255,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2553: app/foreman/analytics/page.tsx(257,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2554: app/foreman/analytics/page.tsx(258,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2555: app/foreman/analytics/page.tsx(259,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2556: app/foreman/analytics/page.tsx(260,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2557: app/foreman/analytics/page.tsx(260,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2558: app/foreman/analytics/page.tsx(261,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2559: app/foreman/analytics/page.tsx(261,141): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2560: app/foreman/analytics/page.tsx(262,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2561: app/foreman/analytics/page.tsx(263,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2562: app/foreman/analytics/page.tsx(264,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2563: app/foreman/analytics/page.tsx(264,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2564: app/foreman/analytics/page.tsx(265,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2565: app/foreman/analytics/page.tsx(265,146): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2566: app/foreman/analytics/page.tsx(266,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2567: app/foreman/analytics/page.tsx(267,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2568: app/foreman/analytics/page.tsx(268,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2569: app/foreman/analytics/page.tsx(268,73): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2570: app/foreman/analytics/page.tsx(269,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2571: app/foreman/analytics/page.tsx(269,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2572: app/foreman/analytics/page.tsx(270,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2573: app/foreman/analytics/page.tsx(271,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2574: app/foreman/analytics/page.tsx(272,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2575: app/foreman/analytics/page.tsx(272,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2576: app/foreman/analytics/page.tsx(273,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2577: app/foreman/analytics/page.tsx(273,141): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2578: app/foreman/analytics/page.tsx(274,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2579: app/foreman/analytics/page.tsx(275,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2580: app/foreman/analytics/page.tsx(276,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2581: app/foreman/analytics/page.tsx(279,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2582: app/foreman/analytics/page.tsx(280,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2583: app/foreman/analytics/page.tsx(282,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2584: app/foreman/analytics/page.tsx(283,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2585: app/foreman/analytics/page.tsx(284,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2586: app/foreman/analytics/page.tsx(285,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2587: app/foreman/analytics/page.tsx(285,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2588: app/foreman/analytics/page.tsx(286,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2589: app/foreman/analytics/page.tsx(286,130): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2590: app/foreman/analytics/page.tsx(287,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2591: app/foreman/analytics/page.tsx(288,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2592: app/foreman/analytics/page.tsx(289,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2593: app/foreman/analytics/page.tsx(289,74): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2594: app/foreman/analytics/page.tsx(290,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2595: app/foreman/analytics/page.tsx(290,133): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2596: app/foreman/analytics/page.tsx(291,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2597: app/foreman/analytics/page.tsx(292,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2598: app/foreman/analytics/page.tsx(293,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2599: app/foreman/analytics/page.tsx(293,75): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2600: app/foreman/analytics/page.tsx(294,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2601: app/foreman/analytics/page.tsx(294,134): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2602: app/foreman/analytics/page.tsx(295,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2603: app/foreman/analytics/page.tsx(296,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2604: app/foreman/analytics/page.tsx(297,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2605: app/foreman/analytics/page.tsx(300,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2606: app/foreman/analytics/page.tsx(301,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2607: app/foreman/analytics/page.tsx(303,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2608: app/foreman/analytics/page.tsx(304,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2609: app/foreman/analytics/page.tsx(305,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2610: app/foreman/analytics/page.tsx(306,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2611: app/foreman/analytics/page.tsx(306,73): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2612: app/foreman/analytics/page.tsx(307,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2613: app/foreman/analytics/page.tsx(307,122): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2614: app/foreman/analytics/page.tsx(308,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2615: app/foreman/analytics/page.tsx(309,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2616: app/foreman/analytics/page.tsx(310,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2617: app/foreman/analytics/page.tsx(310,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2618: app/foreman/analytics/page.tsx(311,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2619: app/foreman/analytics/page.tsx(311,119): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2620: app/foreman/analytics/page.tsx(312,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2621: app/foreman/analytics/page.tsx(313,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2622: app/foreman/analytics/page.tsx(314,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2623: app/foreman/analytics/page.tsx(314,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2624: app/foreman/analytics/page.tsx(315,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2625: app/foreman/analytics/page.tsx(315,130): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2626: app/foreman/analytics/page.tsx(316,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2627: app/foreman/analytics/page.tsx(317,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2628: app/foreman/analytics/page.tsx(318,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2629: app/foreman/analytics/page.tsx(318,70): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2630: app/foreman/analytics/page.tsx(319,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2631: app/foreman/analytics/page.tsx(319,135): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2632: app/foreman/analytics/page.tsx(320,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2633: app/foreman/analytics/page.tsx(321,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2634: app/foreman/analytics/page.tsx(322,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2635: app/foreman/analytics/page.tsx(325,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2636: app/foreman/analytics/page.tsx(326,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2637: app/foreman/analytics/page.tsx(328,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2638: app/foreman/analytics/page.tsx(329,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2639: app/foreman/analytics/page.tsx(330,73): error TS7006: Parameter 'builder' implicitly has an 'any' type.
- Line 2640: app/foreman/analytics/page.tsx(330,82): error TS7006: Parameter 'idx' implicitly has an 'any' type.
- Line 2641: app/foreman/analytics/page.tsx(331,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2642: app/foreman/analytics/page.tsx(332,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2643: app/foreman/analytics/page.tsx(333,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2644: app/foreman/analytics/page.tsx(333,86): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2645: app/foreman/analytics/page.tsx(334,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2646: app/foreman/analytics/page.tsx(336,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2647: app/foreman/analytics/page.tsx(337,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2648: app/foreman/analytics/page.tsx(338,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2649: app/foreman/analytics/page.tsx(339,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2650: app/foreman/analytics/page.tsx(339,83): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2651: app/foreman/analytics/page.tsx(340,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2652: app/foreman/analytics/page.tsx(340,82): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2653: app/foreman/analytics/page.tsx(341,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2654: app/foreman/analytics/page.tsx(342,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2655: app/foreman/analytics/page.tsx(345,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2656: app/foreman/analytics/page.tsx(347,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2657: app/foreman/analytics/page.tsx(349,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2658: app/foreman/analytics/page.tsx(350,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2659: app/foreman/analytics/page.tsx(353,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2660: app/foreman/analytics/page.tsx(354,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2661: app/foreman/analytics/page.tsx(356,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2662: app/foreman/analytics/page.tsx(357,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2663: app/foreman/analytics/page.tsx(358,67): error TS7006: Parameter 'project' implicitly has an 'any' type.
- Line 2664: app/foreman/analytics/page.tsx(358,76): error TS7006: Parameter 'idx' implicitly has an 'any' type.
- Line 2665: app/foreman/analytics/page.tsx(359,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2666: app/foreman/analytics/page.tsx(360,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2667: app/foreman/analytics/page.tsx(361,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2668: app/foreman/analytics/page.tsx(361,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2669: app/foreman/analytics/page.tsx(362,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2670: app/foreman/analytics/page.tsx(364,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2671: app/foreman/analytics/page.tsx(365,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2672: app/foreman/analytics/page.tsx(366,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2673: app/foreman/analytics/page.tsx(367,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2674: app/foreman/analytics/page.tsx(367,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2675: app/foreman/analytics/page.tsx(368,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2676: app/foreman/analytics/page.tsx(368,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2677: app/foreman/analytics/page.tsx(369,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2678: app/foreman/analytics/page.tsx(369,61): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2679: app/foreman/analytics/page.tsx(370,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2680: app/foreman/analytics/page.tsx(371,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2681: app/foreman/analytics/page.tsx(374,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2682: app/foreman/analytics/page.tsx(376,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2683: app/foreman/analytics/page.tsx(378,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2684: app/foreman/analytics/page.tsx(379,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2685: app/foreman/analytics/page.tsx(382,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2686: app/foreman/analytics/page.tsx(383,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2687: app/foreman/analytics/page.tsx(385,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2688: app/foreman/analytics/page.tsx(386,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2689: app/foreman/analytics/page.tsx(387,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2690: app/foreman/analytics/page.tsx(388,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2691: app/foreman/analytics/page.tsx(388,75): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2692: app/foreman/analytics/page.tsx(389,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2693: app/foreman/analytics/page.tsx(389,123): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2694: app/foreman/analytics/page.tsx(390,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2695: app/foreman/analytics/page.tsx(391,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2696: app/foreman/analytics/page.tsx(392,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2697: app/foreman/analytics/page.tsx(392,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2698: app/foreman/analytics/page.tsx(393,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2699: app/foreman/analytics/page.tsx(393,136): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2700: app/foreman/analytics/page.tsx(394,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2701: app/foreman/analytics/page.tsx(395,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2702: app/foreman/analytics/page.tsx(396,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2703: app/foreman/analytics/page.tsx(396,74): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2704: app/foreman/analytics/page.tsx(397,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2705: app/foreman/analytics/page.tsx(397,148): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2706: app/foreman/analytics/page.tsx(398,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2707: app/foreman/analytics/page.tsx(400,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2708: app/foreman/analytics/page.tsx(401,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2709: app/foreman/analytics/page.tsx(401,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2710: app/foreman/analytics/page.tsx(402,81): error TS7006: Parameter 'rule' implicitly has an 'any' type.
- Line 2711: app/foreman/analytics/page.tsx(402,87): error TS7006: Parameter 'idx' implicitly has an 'any' type.
- Line 2712: app/foreman/analytics/page.tsx(403,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2713: app/foreman/analytics/page.tsx(405,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2714: app/foreman/analytics/page.tsx(407,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2715: app/foreman/analytics/page.tsx(409,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2716: app/foreman/analytics/page.tsx(410,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2717: app/foreman/analytics/page.tsx(412,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2718: app/foreman/analytics/page.tsx(413,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2719: app/foreman/analytics/page.tsx(415,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2720: app/foreman/analytics/page.tsx(416,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2721: app/foreman/analytics/page.tsx(419,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2722: app/foreman/analytics/page.tsx(424,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2723: app/foreman/analytics/page.tsx(425,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2724: app/foreman/page.tsx(8,45): error TS2307: Cannot find module 'react' or its corresponding type declarations.
- Line 2725: app/foreman/page.tsx(55,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 2726: app/foreman/page.tsx(97,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 2727: app/foreman/page.tsx(107,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 2728: app/foreman/page.tsx(125,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 2729: app/foreman/page.tsx(175,22): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 2730: app/foreman/page.tsx(186,22): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 2731: app/foreman/page.tsx(197,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
- Line 2732: app/foreman/page.tsx(204,30): error TS2503: Cannot find namespace 'React'.
- Line 2733: app/foreman/page.tsx(212,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2734: app/foreman/page.tsx(217,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2735: app/foreman/page.tsx(231,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2736: app/foreman/page.tsx(233,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2737: app/foreman/page.tsx(235,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2738: app/foreman/page.tsx(237,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2739: app/foreman/page.tsx(238,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2740: app/foreman/page.tsx(239,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2741: app/foreman/page.tsx(239,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2742: app/foreman/page.tsx(240,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2743: app/foreman/page.tsx(241,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2744: app/foreman/page.tsx(243,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2745: app/foreman/page.tsx(244,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2746: app/foreman/page.tsx(244,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2747: app/foreman/page.tsx(245,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2748: app/foreman/page.tsx(246,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2749: app/foreman/page.tsx(247,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2750: app/foreman/page.tsx(247,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2751: app/foreman/page.tsx(248,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2752: app/foreman/page.tsx(248,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2753: app/foreman/page.tsx(249,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2754: app/foreman/page.tsx(250,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2755: app/foreman/page.tsx(251,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2756: app/foreman/page.tsx(251,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2757: app/foreman/page.tsx(252,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2758: app/foreman/page.tsx(252,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2759: app/foreman/page.tsx(253,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2760: app/foreman/page.tsx(254,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2761: app/foreman/page.tsx(255,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2762: app/foreman/page.tsx(255,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2763: app/foreman/page.tsx(256,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2764: app/foreman/page.tsx(256,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2765: app/foreman/page.tsx(257,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2766: app/foreman/page.tsx(258,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2767: app/foreman/page.tsx(259,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2768: app/foreman/page.tsx(259,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2769: app/foreman/page.tsx(260,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2770: app/foreman/page.tsx(260,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2771: app/foreman/page.tsx(261,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2772: app/foreman/page.tsx(262,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2773: app/foreman/page.tsx(263,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2774: app/foreman/page.tsx(266,30): error TS7006: Parameter 'message' implicitly has an 'any' type.
- Line 2775: app/foreman/page.tsx(267,29): error TS2322: Type '{ key: any; message: any; }' is not assignable to type 'ChatBubbleProps'.
- Line 2776: app/foreman/page.tsx(272,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2777: app/foreman/page.tsx(274,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2778: app/foreman/page.tsx(278,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2779: app/foreman/page.tsx(279,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2780: app/foreman/page.tsx(280,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2781: app/foreman/page.tsx(281,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2782: app/foreman/page.tsx(282,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2783: app/foreman/page.tsx(282,103): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2784: app/foreman/page.tsx(283,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2785: app/foreman/page.tsx(283,138): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2786: app/foreman/page.tsx(284,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2787: app/foreman/page.tsx(284,138): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2788: app/foreman/page.tsx(285,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2789: app/foreman/page.tsx(286,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2790: app/foreman/page.tsx(286,85): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2791: app/foreman/page.tsx(287,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2792: app/foreman/page.tsx(288,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2793: app/foreman/page.tsx(289,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2794: app/foreman/page.tsx(292,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2795: app/foreman/page.tsx(293,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2796: app/foreman/page.tsx(296,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2797: app/foreman/page.tsx(297,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2798: app/foreman/page.tsx(298,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2799: app/foreman/page.tsx(301,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
- Line 2800: app/foreman/page.tsx(307,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2801: app/foreman/page.tsx(313,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2802: app/foreman/page.tsx(314,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2803: app/foreman/page.tsx(315,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2804: app/foreman/page.tsx(317,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2805: app/foreman/page.tsx(318,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2806: app/foreman/page.tsx(319,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2807: app/foreman/page.tsx(322,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2808: app/foreman/page.tsx(323,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2809: app/foreman/page.tsx(324,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2810: app/foreman/page.tsx(326,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2811: app/foreman/page.tsx(335,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2812: app/foreman/page.tsx(336,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2813: app/foreman/page.tsx(336,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2814: app/foreman/page.tsx(337,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2815: app/foreman/page.tsx(339,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2816: app/foreman/page.tsx(340,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2817: app/foreman/page.tsx(342,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2818: app/foreman/page.tsx(345,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2819: app/foreman/page.tsx(346,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2820: app/foreman/page.tsx(348,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2821: app/foreman/page.tsx(350,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2822: app/foreman/page.tsx(353,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2823: app/foreman/page.tsx(354,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2824: app/foreman/page.tsx(356,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2825: app/foreman/page.tsx(357,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2826: app/foreman/page.tsx(358,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2827: app/foreman/page.tsx(360,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2828: app/foreman/page.tsx(361,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2829: app/foreman/page.tsx(363,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2830: app/foreman/page.tsx(364,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2831: app/foreman/page.tsx(366,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2832: app/foreman/page.tsx(367,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2833: app/foreman/page.tsx(368,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2834: app/foreman/page.tsx(369,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2835: app/foreman/page.tsx(370,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2836: app/foreman/page.tsx(371,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2837: app/foreman/page.tsx(374,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2838: app/foreman/page.tsx(379,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2839: app/foreman/page.tsx(380,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2840: app/layout.tsx(1,31): error TS2307: Cannot find module 'next' or its corresponding type declarations.
- Line 2841: app/layout.tsx(12,13): error TS2503: Cannot find namespace 'React'.
- Line 2842: app/layout.tsx(15,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2843: app/layout.tsx(16,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2844: app/layout.tsx(16,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2845: app/layout.tsx(17,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2846: app/page.tsx(5,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2847: app/page.tsx(6,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2848: app/page.tsx(7,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2849: app/page.tsx(7,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2850: app/page.tsx(8,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2851: app/page.tsx(10,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2852: app/page.tsx(12,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2853: app/page.tsx(13,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2854: components/ForemanStatus.tsx(8,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2855: components/ForemanStatus.tsx(9,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2856: components/ForemanStatus.tsx(9,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2857: components/ForemanStatus.tsx(10,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2858: components/ForemanStatus.tsx(11,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2859: components/ForemanStatus.tsx(12,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2860: components/ForemanStatus.tsx(12,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2861: components/ForemanStatus.tsx(13,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2862: components/ForemanStatus.tsx(13,62): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2863: components/ForemanStatus.tsx(14,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2864: components/ForemanStatus.tsx(15,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2865: components/ForemanStatus.tsx(16,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2866: components/ForemanStatus.tsx(16,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2867: components/ForemanStatus.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2868: components/ForemanStatus.tsx(17,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2869: components/ForemanStatus.tsx(18,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2870: components/ForemanStatus.tsx(19,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2871: components/ForemanStatus.tsx(20,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2872: components/ForemanStatus.tsx(20,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2873: components/ForemanStatus.tsx(21,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2874: components/ForemanStatus.tsx(21,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2875: components/ForemanStatus.tsx(22,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2876: components/ForemanStatus.tsx(23,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2877: components/ForemanStatus.tsx(24,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2878: components/LayoutShell.tsx(6,27): error TS2307: Cannot find module 'react' or its corresponding type declarations.
- Line 2879: components/LayoutShell.tsx(14,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2880: components/LayoutShell.tsx(15,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2881: components/LayoutShell.tsx(16,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2882: components/LayoutShell.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2883: components/LayoutShell.tsx(18,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2884: components/LayoutShell.tsx(20,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2885: components/LayoutShell.tsx(21,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2886: components/LayoutShell.tsx(22,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2887: components/LayoutShell.tsx(24,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2888: components/LayoutShell.tsx(25,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2889: components/LayoutShell.tsx(27,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2890: components/LayoutShell.tsx(28,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2891: components/LayoutShell.tsx(29,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2892: components/LayoutShell.tsx(30,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2893: components/LayoutShell.tsx(31,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2894: components/LayoutShell.tsx(32,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2895: components/LayoutShell.tsx(34,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2896: components/LayoutShell.tsx(35,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2897: components/foreman/BuildTimeline.tsx(30,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2898: components/foreman/BuildTimeline.tsx(31,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2899: components/foreman/BuildTimeline.tsx(31,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2900: components/foreman/BuildTimeline.tsx(32,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2901: components/foreman/BuildTimeline.tsx(39,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2902: components/foreman/BuildTimeline.tsx(41,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2903: components/foreman/BuildTimeline.tsx(52,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2904: components/foreman/BuildTimeline.tsx(52,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2905: components/foreman/BuildTimeline.tsx(53,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2906: components/foreman/BuildTimeline.tsx(56,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2907: components/foreman/BuildTimeline.tsx(57,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2908: components/foreman/BuildTimeline.tsx(69,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2909: components/foreman/BuildTimeline.tsx(71,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2910: components/foreman/BuildTimeline.tsx(71,81): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2911: components/foreman/BuildTimeline.tsx(73,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2912: components/foreman/BuildTimeline.tsx(77,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2913: components/foreman/BuildTimeline.tsx(77,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2914: components/foreman/BuildTimeline.tsx(80,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2915: components/foreman/BuildTimeline.tsx(80,56): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2916: components/foreman/BuildTimeline.tsx(82,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2917: components/foreman/BuildTimeline.tsx(85,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2918: components/foreman/BuildTimeline.tsx(89,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2919: components/foreman/BuildTimeline.tsx(90,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2920: components/foreman/BuildTimeline.tsx(92,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2921: components/foreman/BuildTimeline.tsx(93,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2922: components/foreman/BuildTimeline.tsx(93,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2923: components/foreman/BuildTimeline.tsx(94,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2924: components/foreman/BuildTimeline.tsx(96,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2925: components/foreman/BuildTimeline.tsx(97,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2926: components/foreman/BuildTimeline.tsx(100,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2927: components/foreman/BuildTimeline.tsx(101,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2928: components/foreman/BuildTimeline.tsx(101,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2929: components/foreman/BuildTimeline.tsx(102,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2930: components/foreman/BuildTimeline.tsx(102,91): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2931: components/foreman/BuildTimeline.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2932: components/foreman/BuildTimeline.tsx(106,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2933: components/foreman/BuildTimeline.tsx(107,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2934: components/foreman/BuildTimeline.tsx(107,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2935: components/foreman/BuildTimeline.tsx(108,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2936: components/foreman/BuildTimeline.tsx(115,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2937: components/foreman/BuildTimeline.tsx(116,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2938: components/foreman/BuildTimeline.tsx(118,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2939: components/foreman/BuildTimeline.tsx(119,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2940: components/foreman/BuildTimeline.tsx(124,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2941: components/foreman/BuildTimeline.tsx(125,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2942: components/foreman/BuildTimeline.tsx(126,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2943: components/foreman/BuildTimeline.tsx(126,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2944: components/foreman/BuildTimeline.tsx(127,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2945: components/foreman/BuildTimeline.tsx(127,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2946: components/foreman/BuildTimeline.tsx(128,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2947: components/foreman/BuildTimeline.tsx(129,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2948: components/foreman/BuildTimeline.tsx(131,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2949: components/foreman/ChatBubble.tsx(8,27): error TS2307: Cannot find module 'react-markdown' or its corresponding type declarations.
- Line 2950: components/foreman/ChatBubble.tsx(9,23): error TS2307: Cannot find module 'remark-gfm' or its corresponding type declarations.
- Line 2951: components/foreman/ChatBubble.tsx(22,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2952: components/foreman/ChatBubble.tsx(23,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2953: components/foreman/ChatBubble.tsx(31,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2954: components/foreman/ChatBubble.tsx(34,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2955: components/foreman/ChatBubble.tsx(34,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2956: components/foreman/ChatBubble.tsx(35,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2957: components/foreman/ChatBubble.tsx(35,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2958: components/foreman/ChatBubble.tsx(36,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2959: components/foreman/ChatBubble.tsx(38,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2960: components/foreman/ChatBubble.tsx(39,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2961: components/foreman/ChatBubble.tsx(42,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2962: components/foreman/ChatBubble.tsx(43,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2963: components/foreman/ChatBubble.tsx(51,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2964: components/foreman/ChatBubble.tsx(52,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2965: components/foreman/ChatBubble.tsx(56,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2966: components/foreman/ChatBubble.tsx(58,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2967: components/foreman/ChatBubble.tsx(64,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2968: components/foreman/ChatBubble.tsx(67,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2969: components/foreman/ChatBubble.tsx(73,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2970: components/foreman/ChatBubble.tsx(76,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2971: components/foreman/ChatBubble.tsx(82,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2972: components/foreman/ChatBubble.tsx(85,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2973: components/foreman/ChatBubble.tsx(91,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2974: components/foreman/ChatBubble.tsx(94,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2975: components/foreman/ChatBubble.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2976: components/foreman/ChatBubble.tsx(105,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2977: components/foreman/ChatBubble.tsx(110,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2978: components/foreman/ChatBubble.tsx(113,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2979: components/foreman/ChatBubble.tsx(113,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2980: components/foreman/ChatBubble.tsx(114,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2981: components/foreman/ChatBubble.tsx(116,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2982: components/foreman/ChatBubble.tsx(124,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2983: components/foreman/ChatBubble.tsx(124,61): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2984: components/foreman/ChatBubble.tsx(126,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2985: components/foreman/ChatBubble.tsx(128,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2986: components/foreman/ChatBubble.tsx(131,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2987: components/foreman/ChatBubble.tsx(133,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2988: components/foreman/ChatBubble.tsx(135,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2989: components/foreman/ChatBubble.tsx(137,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2990: components/foreman/ChatBubble.tsx(138,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2991: components/foreman/ChatBubble.tsx(140,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2992: components/foreman/ChatBubble.tsx(141,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2993: components/foreman/Header.tsx(32,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2994: components/foreman/Header.tsx(33,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2995: components/foreman/Header.tsx(34,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2996: components/foreman/Header.tsx(36,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2997: components/foreman/Header.tsx(37,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2998: components/foreman/Header.tsx(37,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 2999: components/foreman/Header.tsx(38,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3000: components/foreman/Header.tsx(40,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3001: components/foreman/Header.tsx(41,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3002: components/foreman/Header.tsx(43,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3003: components/foreman/Header.tsx(44,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3004: components/foreman/Header.tsx(46,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3005: components/foreman/Header.tsx(47,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3006: components/foreman/Header.tsx(47,81): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3007: components/foreman/Header.tsx(48,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3008: components/foreman/Header.tsx(48,79): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3009: components/foreman/Header.tsx(49,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3010: components/foreman/Header.tsx(53,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3011: components/foreman/Header.tsx(53,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3012: components/foreman/Header.tsx(54,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3013: components/foreman/Header.tsx(56,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3014: components/foreman/Header.tsx(59,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3015: components/foreman/Header.tsx(60,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3016: components/foreman/Header.tsx(61,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3017: components/foreman/Header.tsx(65,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3018: components/foreman/Header.tsx(70,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3019: components/foreman/Header.tsx(70,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3020: components/foreman/Header.tsx(71,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3021: components/foreman/Header.tsx(71,34): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3022: components/foreman/Header.tsx(72,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3023: components/foreman/Header.tsx(74,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3024: components/foreman/Header.tsx(75,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3025: components/foreman/Sidebar.tsx(8,26): error TS2307: Cannot find module 'react' or its corresponding type declarations.
- Line 3026: components/foreman/Sidebar.tsx(32,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3027: components/foreman/Sidebar.tsx(34,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3028: components/foreman/Sidebar.tsx(35,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3029: components/foreman/Sidebar.tsx(39,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3030: components/foreman/Sidebar.tsx(39,54): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3031: components/foreman/Sidebar.tsx(40,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3032: components/foreman/Sidebar.tsx(40,67): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3033: components/foreman/Sidebar.tsx(52,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3034: components/foreman/Sidebar.tsx(59,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3035: components/foreman/Sidebar.tsx(64,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3036: components/foreman/Sidebar.tsx(70,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3037: components/foreman/Sidebar.tsx(73,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3038: components/foreman/Sidebar.tsx(74,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3039: components/foreman/Sidebar.tsx(77,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3040: components/foreman/Sidebar.tsx(78,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3041: components/foreman/Sidebar.tsx(84,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3042: components/foreman/Sidebar.tsx(84,39): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3043: components/foreman/Sidebar.tsx(85,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3044: components/foreman/Sidebar.tsx(85,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3045: components/foreman/Sidebar.tsx(86,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3046: components/foreman/Sidebar.tsx(87,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3047: components/foreman/Sidebar.tsx(88,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3048: components/foreman/StatusEvent.tsx(39,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3049: components/foreman/StatusEvent.tsx(42,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3050: components/foreman/StatusEvent.tsx(42,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3051: components/foreman/StatusEvent.tsx(43,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3052: components/foreman/StatusEvent.tsx(44,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3053: components/foreman/StatusEvent.tsx(44,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3054: components/foreman/StatusEvent.tsx(46,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3055: components/foreman/StatusEvent.tsx(48,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3056: components/foreman/StatusEvent.tsx(50,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3057: components/foreman/StatusEvent.tsx(51,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3058: components/foreman/UploadDropzone.tsx(8,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3059: components/foreman/UploadDropzone.tsx(9,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3060: components/foreman/UploadDropzone.tsx(10,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3061: components/foreman/UploadDropzone.tsx(11,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3062: components/foreman/UploadDropzone.tsx(11,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3063: components/foreman/UploadDropzone.tsx(12,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3064: components/foreman/UploadDropzone.tsx(13,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3065: components/foreman/UploadDropzone.tsx(14,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3066: components/foreman/UploadDropzone.tsx(14,85): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3067: components/foreman/UploadDropzone.tsx(15,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3068: components/foreman/UploadDropzone.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3069: components/foreman/UploadDropzone.tsx(18,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3070: components/foreman/UploadDropzone.tsx(19,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3071: components/foreman/UploadDropzone.tsx(24,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3072: components/foreman/UploadDropzone.tsx(25,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3073: components/foreman/UploadDropzone.tsx(26,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
- Line 3074: lib/builder/memory-injector.ts(167,23): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3075: lib/builder/memory-injector.ts(371,12): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3076: lib/builder/memory-injector.ts(376,12): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3077: lib/foreman/analytics/consolidation-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3078: lib/foreman/analytics/consolidation-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3079: lib/foreman/analytics/evolution-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3080: lib/foreman/analytics/evolution-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3081: lib/foreman/analytics/governance-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3082: lib/foreman/analytics/governance-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3083: lib/foreman/analytics/memory-analytics.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3084: lib/foreman/analytics/memory-analytics.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3085: lib/foreman/analytics/retirement-analytics.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3086: lib/foreman/analytics/retirement-analytics.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3087: lib/foreman/build-report.ts(8,31): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3088: lib/foreman/build-report.ts(9,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3089: lib/foreman/build-report.ts(473,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3090: lib/foreman/build-sequence.ts(6,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
- Line 3091: lib/foreman/build-sequence.ts(27,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3092: lib/foreman/build-sequence.ts(53,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3093: lib/foreman/build-sequence.ts(54,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3094: lib/foreman/build-sequence.ts(58,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3095: lib/foreman/chat-executor.ts(1371,29): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3096: lib/foreman/chat-executor.ts(1372,31): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3097: lib/foreman/chat-executor.ts(1374,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3098: lib/foreman/desktop-sync.ts(16,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3099: lib/foreman/desktop-sync.ts(18,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3100: lib/foreman/desktop-sync.ts(19,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3101: lib/foreman/desktop-sync.ts(248,12): error TS2503: Cannot find namespace 'NodeJS'.
- Line 3102: lib/foreman/desktop-sync.ts(302,53): error TS2503: Cannot find namespace 'NodeJS'.
- Line 3103: lib/foreman/dispatch.ts(55,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3104: lib/foreman/dispatch.ts(56,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3105: lib/foreman/dispatch.ts(60,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3106: lib/foreman/dispatch.ts(69,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3107: lib/foreman/dispatch.ts(70,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3108: lib/foreman/dispatch.ts(72,36): error TS7006: Parameter 's' implicitly has an 'any' type.
- Line 3109: lib/foreman/feedback/processor.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3110: lib/foreman/feedback/processor.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3111: lib/foreman/feedback/processor.ts(32,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3112: lib/foreman/feedback/processor.ts(314,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3113: lib/foreman/feedback/processor.ts(353,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3114: lib/foreman/governance/type-safety-events.ts(8,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3115: lib/foreman/governance/type-safety-events.ts(9,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3116: lib/foreman/governance/type-safety-events.ts(76,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3117: lib/foreman/governance/type-safety-events.ts(113,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3118: lib/foreman/initialization.ts(6,41): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3119: lib/foreman/initialization.ts(7,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3120: lib/foreman/initialization.ts(34,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3121: lib/foreman/initialization.ts(35,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3122: lib/foreman/initialization.ts(36,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3123: lib/foreman/initialization.ts(37,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3124: lib/foreman/initialization.ts(66,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3125: lib/foreman/initialization.ts(89,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3126: lib/foreman/initialization.ts(90,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3127: lib/foreman/initialization.ts(91,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3128: lib/foreman/initialization.ts(92,23): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3129: lib/foreman/initialization.ts(125,29): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3130: lib/foreman/initialization.ts(203,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3131: lib/foreman/initialization.ts(203,66): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3132: lib/foreman/initialization.ts(204,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3133: lib/foreman/initialization.ts(204,64): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3134: lib/foreman/initialization.ts(216,57): error TS7006: Parameter 's' implicitly has an 'any' type.
- Line 3135: lib/foreman/initialization.ts(232,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3136: lib/foreman/initialization.ts(258,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3137: lib/foreman/local-builder.ts(64,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3138: lib/foreman/local-builder.ts(110,28): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3139: lib/foreman/memory/consolidation-engine.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3140: lib/foreman/memory/consolidation-engine.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3141: lib/foreman/memory/consolidation-engine.ts(11,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
- Line 3142: lib/foreman/memory/consolidation-engine.ts(12,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
- Line 3143: lib/foreman/memory/consolidation-engine.ts(56,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3144: lib/foreman/memory/consolidation-engine.ts(84,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3145: lib/foreman/memory/consolidation-engine.ts(324,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3146: lib/foreman/memory/drift-monitor.ts(21,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3147: lib/foreman/memory/drift-monitor.ts(22,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3148: lib/foreman/memory/drift-monitor.ts(23,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
- Line 3149: lib/foreman/memory/drift-monitor.ts(24,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
- Line 3150: lib/foreman/memory/drift-monitor.ts(90,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3151: lib/foreman/memory/drift-monitor.ts(398,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3152: lib/foreman/memory/drift-monitor.ts(595,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3153: lib/foreman/memory/drift-monitor.ts(930,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3154: lib/foreman/memory/qa-miss-tracker.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3155: lib/foreman/memory/qa-miss-tracker.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3156: lib/foreman/memory/qa-miss-tracker.ts(114,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3157: lib/foreman/memory/qa-miss-tracker.ts(134,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3158: lib/foreman/memory/qa-miss-tracker.ts(193,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3159: lib/foreman/memory/qa-miss-tracker.ts(199,50): error TS7006: Parameter 'f' implicitly has an 'any' type.
- Line 3160: lib/foreman/memory/qa-miss-tracker.ts(259,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3161: lib/foreman/memory/qa-miss-tracker.ts(294,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3162: lib/foreman/memory/retirement-engine.ts(15,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3163: lib/foreman/memory/retirement-engine.ts(16,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3164: lib/foreman/memory/retirement-engine.ts(65,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3165: lib/foreman/memory/retirement-engine.ts(89,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3166: lib/foreman/memory/retirement-engine.ts(394,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3167: lib/foreman/memory/storage.ts(6,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3168: lib/foreman/memory/storage.ts(7,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3169: lib/foreman/memory/storage.ts(19,23): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3170: lib/foreman/orchestrator.ts(1,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
- Line 3171: lib/foreman/orchestrator.ts(6,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3172: lib/foreman/overnight-execution.ts(24,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3173: lib/foreman/overnight-execution.ts(48,23): error TS7006: Parameter 'issue' implicitly has an 'any' type.
- Line 3174: lib/foreman/overnight-execution.ts(52,32): error TS7006: Parameter 'label' implicitly has an 'any' type.
- Line 3175: lib/foreman/pilot-qa-check.ts(6,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3176: lib/foreman/pilot-qa-check.ts(7,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3177: lib/foreman/pilot-qa-check.ts(26,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3178: lib/foreman/pilot-qa-check.ts(91,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3179: lib/foreman/projects/storage.ts(6,16): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
- Line 3180: lib/foreman/projects/storage.ts(7,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3181: lib/foreman/projects/storage.ts(14,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3182: lib/foreman/projects/storage.ts(15,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3183: lib/foreman/projects/storage.ts(15,53): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3184: lib/foreman/qa/enhanced-qa-runner.ts(33,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3185: lib/foreman/qa/enhanced-qa-runner.ts(65,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3186: lib/foreman/qa/enhanced-qa-runner.ts(277,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3187: lib/foreman/qa/log-generator.ts(19,26): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
- Line 3188: lib/foreman/qa/log-generator.ts(20,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3189: lib/foreman/qa/log-generator.ts(21,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3190: lib/foreman/qa/log-generator.ts(42,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3191: lib/foreman/qa/log-generator.ts(64,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3192: lib/foreman/qa/log-generator.ts(115,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3193: lib/foreman/qa/log-generator.ts(145,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3194: lib/foreman/qa/log-generator.ts(175,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3195: lib/foreman/qa/log-generator.ts(205,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3196: lib/foreman/qa/log-parsing-qa.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3197: lib/foreman/qa/log-parsing-qa.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3198: lib/foreman/qa/log-parsing-qa.ts(82,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3199: lib/foreman/qa/log-parsing-qa.ts(144,20): error TS7006: Parameter 'line' implicitly has an 'any' type.
- Line 3200: lib/foreman/qa/log-parsing-qa.ts(144,26): error TS7006: Parameter 'index' implicitly has an 'any' type.
- Line 3201: lib/foreman/qa/qi-incident-writer.ts(23,25): error TS2307: Cannot find module 'crypto' or its corresponding type declarations.
- Line 3202: lib/foreman/qa/qiel-runner.ts(109,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3203: lib/foreman/qa/qiel-runner.ts(500,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3204: lib/foreman/qa/qiel-runner.ts(518,14): error TS2580: Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3205: lib/foreman/qa/regression-test-generator.ts(13,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3206: lib/foreman/qa/regression-test-generator.ts(14,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3207: lib/foreman/qa/regression-test-generator.ts(274,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3208: lib/foreman/qa/regression-test-generator.ts(333,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3209: lib/foreman/qa/regression-test-generator.ts(340,23): error TS7006: Parameter 'f' implicitly has an 'any' type.
- Line 3210: lib/foreman/qa/schema-cohesion-validator.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3211: lib/foreman/qa/schema-cohesion-validator.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3212: lib/foreman/qa/schema-cohesion-validator.ts(13,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
- Line 3213: lib/foreman/qa/schema-cohesion-validator.ts(14,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
- Line 3214: lib/foreman/qa/schema-cohesion-validator.ts(86,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3215: lib/foreman/qa/schema-cohesion-validator.ts(147,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3216: lib/foreman/qa/vercel-simulation-qa.ts(14,26): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
- Line 3217: lib/foreman/qa/vercel-simulation-qa.ts(15,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3218: lib/foreman/qa/vercel-simulation-qa.ts(16,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3219: lib/foreman/qa/vercel-simulation-qa.ts(45,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3220: lib/foreman/qa/vercel-simulation-qa.ts(203,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3221: lib/foreman/qa/zero-warning-policy.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3222: lib/foreman/qa/zero-warning-policy.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3223: lib/foreman/qiel-config.ts(19,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3224: lib/foreman/qiel-config.ts(20,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3225: lib/foreman/qiel-config.ts(332,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3226: lib/foreman/qiel-config.ts(367,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3227: lib/foreman/reasoning/engine.ts(57,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3228: lib/foreman/reasoning/engine.ts(58,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3229: lib/foreman/reasoning/engine.ts(691,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3230: lib/foreman/reasoning/engine.ts(702,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3231: lib/foreman/reasoning/engine.ts(718,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3232: lib/foreman/reasoning/engine.ts(738,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3233: lib/foreman/reasoning/engine.ts(754,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3234: lib/foreman/reasoning/evolution-engine.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3235: lib/foreman/reasoning/evolution-engine.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3236: lib/foreman/reasoning/evolution-engine.ts(314,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3237: lib/foreman/reasoning/evolution-engine.ts(351,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3238: lib/foreman/reasoning/evolution-engine.ts(533,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3239: lib/foreman/reasoning/patterns.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3240: lib/foreman/reasoning/patterns.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3241: lib/foreman/reasoning/patterns.ts(123,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3242: lib/foreman/run-self-test.ts(6,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
- Line 3243: lib/foreman/run-self-test.ts(87,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3244: lib/foreman/run-self-test.ts(93,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3245: lib/foreman/run-self-test.ts(125,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3246: lib/foreman/run-self-test.ts(127,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3247: lib/foreman/run-self-test.ts(127,56): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3248: lib/foreman/run-self-test.ts(167,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3249: lib/foreman/run-self-test.ts(177,15): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3250: lib/foreman/run-self-test.ts(204,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3251: lib/foreman/run-self-test.ts(210,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3252: lib/foreman/run-self-test.ts(215,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3253: lib/foreman/watchdog/quality-integrity-watchdog.ts(20,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3254: lib/foreman/watchdog/quality-integrity-watchdog.ts(21,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3255: lib/foreman/watchdog/quality-integrity-watchdog.ts(144,20): error TS7006: Parameter 'line' implicitly has an 'any' type.
- Line 3256: lib/foreman/watchdog/quality-integrity-watchdog.ts(144,26): error TS7006: Parameter 'index' implicitly has an 'any' type.
- Line 3257: lib/foreman/watchdog/quality-integrity-watchdog.ts(420,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3258: lib/github.ts(22,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3259: lib/github.ts(23,44): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3260: lib/github.ts(24,52): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3261: lib/github.ts(25,50): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3262: lib/github/client.ts(1,25): error TS2307: Cannot find module 'octokit' or its corresponding type declarations.
- Line 3263: lib/github/client.ts(4,9): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3264: lib/github/loadFiles.ts(2,35): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
- Line 3265: lib/github/loadFiles.ts(3,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3266: lib/github/loadFiles.ts(39,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3267: lib/github/loadFiles.ts(40,16): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3268: lib/github/loadFiles.ts(41,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3269: lib/github/loadFiles.ts(91,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3270: lib/github/pr-builder.ts(6,25): error TS2307: Cannot find module 'octokit' or its corresponding type declarations.
- Line 3271: lib/openai.ts(16,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3272: tailwind.config.ts(1,29): error TS2307: Cannot find module 'tailwindcss' or its corresponding type declarations.
- Line 3273: tailwind.config.ts(24,5): error TS2580: Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
- Line 3274: tests/dashboard/test-utils.ts(6,30): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
- Line 3275: tests/dashboard/test-utils.ts(7,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
- Line 3276: tests/dashboard/test-utils.ts(14,28): error TS2304: Cannot find name '__dirname'.
- Line 3302: error: '1 subtest failed'
- Line 3314: error: |-
- Line 3315: Production build failed:
- Line 3339: error: '1 subtest failed'
- Line 3349: error: |-
- Line 3350: Linting failed with errors:
- Line 3374: error: '1 subtest failed'
- Line 3405: error: '1 subtest failed'
- Line 3439: error: '4 subtests failed'
- Line 3443: #   const err = new Error(message);
- Line 3445: # Error: Cannot find module 'ajv'
- Line 3474: error: 'test failed'
- Line 3923: # ❌ Schema cohesion validation FAILED - 1 engine(s) failed, 0 mismatch(es), 2 total errors
- Line 3965: # ❌ Schema cohesion validation FAILED - 1 engine(s) failed, 0 mismatch(es), 2 total errors
- Line 3990: # ❌ Schema cohesion validation FAILED - 1 engine(s) failed, 0 mismatch(es), 2 total errors
- Line 4029: # ❌ Schema cohesion validation FAILED - 1 engine(s) failed, 0 mismatch(es), 2 total errors
- Line 4336: #   const err = new Error(message);
- Line 4338: # Error: Cannot find module 'ajv'
- Line 4373: error: 'test failed'
- Line 4599: #   const err = new Error(message);
- Line 4601: # Error: Cannot find module 'ajv'
- Line 4634: error: 'test failed'


---

# Zero-Warning Policy Report

**Overall Status**: ✅ PASSED

**Total Issues**: 0

**Summary**: Zero-warning policy: PASSED - No unwhitelisted warnings found

✅ **All checks passed** - No unwhitelisted warnings detected


---

# Schema Cohesion Validation Report (QIEL-5)

**Timestamp**: 2025-12-08T09:07:10.948Z

**Overall Status**: ❌ FAILED

**Total Errors**: 2

**Total Warnings**: 2

**Summary**: Schema cohesion validation FAILED - 1 engine(s) failed, 0 mismatch(es), 2 total errors

## Engine Schema Validations

### ✅ memory-fabric

- **Schema Path**: types/memory.ts
- **Exists**: Yes
- **Valid**: Yes
- **Errors**: 0
- **Warnings**: 1

**Warnings:**

- Schema uses 'any' type which may indicate loose typing

### ✅ retirement-engine

- **Schema Path**: types/retirement.ts
- **Exists**: Yes
- **Valid**: Yes
- **Errors**: 0
- **Warnings**: 0

### ✅ consolidation-engine

- **Schema Path**: types/consolidation.ts
- **Exists**: Yes
- **Valid**: Yes
- **Errors**: 0
- **Warnings**: 0

### ✅ drift-monitor

- **Schema Path**: types/drift.ts
- **Exists**: Yes
- **Valid**: Yes
- **Errors**: 0
- **Warnings**: 1

**Warnings:**

- Schema uses 'any' type which may indicate loose typing

### ❌ analytics-engine

- **Schema Path**: types/analytics.ts
- **Exists**: Yes
- **Valid**: No
- **Errors**: 2
- **Warnings**: 0

**Errors:**

- Required type 'AnalyticsEvent' not found in types/analytics.ts
- Required type 'AnalyticsMetric' not found in types/analytics.ts

❌ **Schema validation failed** - Address schema issues before proceeding
