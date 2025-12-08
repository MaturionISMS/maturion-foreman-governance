# Quality Integrity Enforcement Layer (QIEL) Report

**Timestamp**: 2025-12-08T09:11:31.089Z

**Overall Status**: ❌ FAILED

**Summary**: ❌ QIEL: Quality Integrity violations detected - 3 blockers, 1195 incidents


## QIC Exit Criteria Checklist

- [x] Commands executed successfully
- [x] All log files exist
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

1. Build logs failed: build log FAILED: 1195 errors
2. Test logs failed: test log FAILED: 1016 errors
3. Schema cohesion validation FAILED - 1 engine(s) failed, 0 mismatch(es), 2 total errors

## Quality Integrity Incidents

1195 incident(s) recorded in Governance Memory:

1. **build_error** (critical)
   - ID: qi-build_error-1765185091113-429657fe
   - Description: Build error detected: app/api/admin/approve/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:5

2. **build_error** (critical)
   - ID: qi-build_error-1765185091138-7af9e0e2
   - Description: Build error detected: app/api/builder/api/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:6

3. **build_error** (critical)
   - ID: qi-build_error-1765185091156-1dba2e5c
   - Description: Build error detected: app/api/builder/integration/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:7

4. **build_error** (critical)
   - ID: qi-build_error-1765185091170-30053ff8
   - Description: Build error detected: app/api/builder/qa/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:8

5. **build_error** (critical)
   - ID: qi-build_error-1765185091187-ae98a07e
   - Description: Build error detected: app/api/builder/schema/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:9

6. **build_error** (critical)
   - ID: qi-build_error-1765185091201-432f5ebb
   - Description: Build error detected: app/api/builder/ui/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:10

7. **build_error** (critical)
   - ID: qi-build_error-1765185091216-8d910537
   - Description: Build error detected: app/api/foreman/analytics/builders/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:11

8. **build_error** (critical)
   - ID: qi-build_error-1765185091230-afa04bdd
   - Description: Build error detected: app/api/foreman/analytics/consolidation/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:12

9. **build_error** (critical)
   - ID: qi-build_error-1765185091244-6abee1e8
   - Description: Build error detected: app/api/foreman/analytics/drift/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:13

10. **build_error** (critical)
   - ID: qi-build_error-1765185091257-6cb401a1
   - Description: Build error detected: app/api/foreman/analytics/evolution/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:14

11. **build_error** (critical)
   - ID: qi-build_error-1765185091271-346f3b41
   - Description: Build error detected: app/api/foreman/analytics/governance/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:15

12. **build_error** (critical)
   - ID: qi-build_error-1765185091285-a44da09c
   - Description: Build error detected: app/api/foreman/analytics/memory/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:16

13. **build_error** (critical)
   - ID: qi-build_error-1765185091300-37134343
   - Description: Build error detected: app/api/foreman/analytics/projects/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:17

14. **build_error** (critical)
   - ID: qi-build_error-1765185091312-fe983469
   - Description: Build error detected: app/api/foreman/analytics/qiw/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:18

15. **build_error** (critical)
   - ID: qi-build_error-1765185091325-b1906cdd
   - Description: Build error detected: app/api/foreman/analytics/qiw/route.ts(9,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:19

16. **build_error** (critical)
   - ID: qi-build_error-1765185091338-b95d896d
   - Description: Build error detected: app/api/foreman/analytics/qiw/route.ts(10,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:20

17. **build_error** (critical)
   - ID: qi-build_error-1765185091352-54490501
   - Description: Build error detected: app/api/foreman/analytics/qiw/route.ts(31,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:21

18. **build_error** (critical)
   - ID: qi-build_error-1765185091364-12b293d0
   - Description: Build error detected: app/api/foreman/analytics/qiw/route.ts(44,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:22

19. **build_error** (critical)
   - ID: qi-build_error-1765185091376-eb655580
   - Description: Build error detected: app/api/foreman/analytics/summary/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:23

20. **build_error** (critical)
   - ID: qi-build_error-1765185091389-4c0c29ab
   - Description: Build error detected: app/api/foreman/chat/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:24

21. **build_error** (critical)
   - ID: qi-build_error-1765185091403-9a5d5e44
   - Description: Build error detected: app/api/foreman/chat/route.ts(7,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
   - Source: build.log:25

22. **build_error** (critical)
   - ID: qi-build_error-1765185091415-7af7b3f5
   - Description: Build error detected: app/api/foreman/chat/route.ts(15,6): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:26

23. **build_error** (critical)
   - ID: qi-build_error-1765185091428-188fe3a4
   - Description: Build error detected: app/api/foreman/chat/route.ts(20,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:27

24. **build_error** (critical)
   - ID: qi-build_error-1765185091440-f9abc308
   - Description: Build error detected: app/api/foreman/chat/route.ts(30,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:28

25. **build_error** (critical)
   - ID: qi-build_error-1765185091455-51f3ebb6
   - Description: Build error detected: app/api/foreman/chat/route.ts(52,37): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:29

26. **build_error** (critical)
   - ID: qi-build_error-1765185091468-4f67e084
   - Description: Build error detected: app/api/foreman/feedback/route.ts(9,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:30

27. **build_error** (critical)
   - ID: qi-build_error-1765185091480-378a4923
   - Description: Build error detected: app/api/foreman/overnight/route.ts(8,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:31

28. **build_error** (critical)
   - ID: qi-build_error-1765185091493-bc5b5170
   - Description: Build error detected: app/api/foreman/projects/[id]/blockers/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:32

29. **build_error** (critical)
   - ID: qi-build_error-1765185091507-95ea183b
   - Description: Build error detected: app/api/foreman/projects/[id]/dashboard/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:33

30. **build_error** (critical)
   - ID: qi-build_error-1765185091520-c923a9bf
   - Description: Build error detected: app/api/foreman/projects/[id]/s-curve/route.ts(7,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:34

31. **build_error** (critical)
   - ID: qi-build_error-1765185091533-1e048c7d
   - Description: Build error detected: app/api/foreman/run-build/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:35

32. **build_error** (critical)
   - ID: qi-build_error-1765185091545-142ecdcb
   - Description: Build error detected: app/api/foreman/run-build/route.ts(133,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:36

33. **build_error** (critical)
   - ID: qi-build_error-1765185091559-cd0d9161
   - Description: Build error detected: app/api/foreman/run-build/route.ts(133,61): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:37

34. **build_error** (critical)
   - ID: qi-build_error-1765185091572-2b6c222a
   - Description: Build error detected: app/api/foreman/run-build/route.ts(134,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:38

35. **build_error** (critical)
   - ID: qi-build_error-1765185091585-6ac77335
   - Description: Build error detected: app/api/foreman/run/route.ts(1,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:39

36. **build_error** (critical)
   - ID: qi-build_error-1765185091597-bef844a8
   - Description: Build error detected: app/api/foreman/status/route.ts(6,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:40

37. **build_error** (critical)
   - ID: qi-build_error-1765185091611-d7b1e890
   - Description: Build error detected: app/api/foreman/status/route.ts(9,22): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
   - Source: build.log:41

38. **build_error** (critical)
   - ID: qi-build_error-1765185091624-5721ca22
   - Description: Build error detected: app/api/foreman/status/route.ts(10,27): error TS2307: Cannot find module 'util' or its corresponding type declarations.
   - Source: build.log:42

39. **build_error** (critical)
   - ID: qi-build_error-1765185091637-8be0b050
   - Description: Build error detected: app/api/foreman/status/route.ts(78,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:43

40. **build_error** (critical)
   - ID: qi-build_error-1765185091649-79bfd961
   - Description: Build error detected: app/api/foreman/status/route.ts(79,15): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:44

41. **build_error** (critical)
   - ID: qi-build_error-1765185091663-0ec21539
   - Description: Build error detected: app/api/github/webhook/route.ts(1,43): error TS2307: Cannot find module 'next/server' or its corresponding type declarations.
   - Source: build.log:45

42. **build_error** (critical)
   - ID: qi-build_error-1765185091676-f18ea90d
   - Description: Build error detected: app/api/github/webhook/route.ts(25,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:46

43. **build_error** (critical)
   - ID: qi-build_error-1765185091689-437488cd
   - Description: Build error detected: app/api/github/webhook/route.ts(37,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:47

44. **build_error** (critical)
   - ID: qi-build_error-1765185091702-61ed409c
   - Description: Build error detected: app/api/github/webhook/route.ts(38,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:48

45. **build_error** (critical)
   - ID: qi-build_error-1765185091716-8156a402
   - Description: Build error detected: app/foreman/analytics/page.tsx(9,37): error TS2307: Cannot find module 'react' or its corresponding type declarations.
   - Source: build.log:49

46. **build_error** (critical)
   - ID: qi-build_error-1765185091729-c2a67904
   - Description: Build error detected: app/foreman/analytics/page.tsx(81,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:50

47. **build_error** (critical)
   - ID: qi-build_error-1765185091742-5a1534c7
   - Description: Build error detected: app/foreman/analytics/page.tsx(86,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:51

48. **build_error** (critical)
   - ID: qi-build_error-1765185091755-90c58f03
   - Description: Build error detected: app/foreman/analytics/page.tsx(96,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:52

49. **build_error** (critical)
   - ID: qi-build_error-1765185091769-10ed2400
   - Description: Build error detected: app/foreman/analytics/page.tsx(98,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:53

50. **build_error** (critical)
   - ID: qi-build_error-1765185091782-37b2f1cf
   - Description: Build error detected: app/foreman/analytics/page.tsx(99,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:54

51. **build_error** (critical)
   - ID: qi-build_error-1765185091795-147ee0a3
   - Description: Build error detected: app/foreman/analytics/page.tsx(100,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:55

52. **build_error** (critical)
   - ID: qi-build_error-1765185091808-0fa2badd
   - Description: Build error detected: app/foreman/analytics/page.tsx(102,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:56

53. **build_error** (critical)
   - ID: qi-build_error-1765185091823-633648ee
   - Description: Build error detected: app/foreman/analytics/page.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:57

54. **build_error** (critical)
   - ID: qi-build_error-1765185091836-524ede1f
   - Description: Build error detected: app/foreman/analytics/page.tsx(105,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:58

55. **build_error** (critical)
   - ID: qi-build_error-1765185091849-4fd1ad4f
   - Description: Build error detected: app/foreman/analytics/page.tsx(106,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:59

56. **build_error** (critical)
   - ID: qi-build_error-1765185091862-69c48585
   - Description: Build error detected: app/foreman/analytics/page.tsx(107,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:60

57. **build_error** (critical)
   - ID: qi-build_error-1765185091876-45f541e7
   - Description: Build error detected: app/foreman/analytics/page.tsx(108,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:61

58. **build_error** (critical)
   - ID: qi-build_error-1765185091889-8a9ed4bc
   - Description: Build error detected: app/foreman/analytics/page.tsx(110,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:62

59. **build_error** (critical)
   - ID: qi-build_error-1765185091902-30ead437
   - Description: Build error detected: app/foreman/analytics/page.tsx(111,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:63

60. **build_error** (critical)
   - ID: qi-build_error-1765185091915-1528e859
   - Description: Build error detected: app/foreman/analytics/page.tsx(112,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:64

61. **build_error** (critical)
   - ID: qi-build_error-1765185091929-a1f37354
   - Description: Build error detected: app/foreman/analytics/page.tsx(115,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
   - Source: build.log:65

62. **build_error** (critical)
   - ID: qi-build_error-1765185091942-9e90c821
   - Description: Build error detected: app/foreman/analytics/page.tsx(119,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:66

63. **build_error** (critical)
   - ID: qi-build_error-1765185091955-de9e6424
   - Description: Build error detected: app/foreman/analytics/page.tsx(120,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:67

64. **build_error** (critical)
   - ID: qi-build_error-1765185091968-6537ba0a
   - Description: Build error detected: app/foreman/analytics/page.tsx(126,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:68

65. **build_error** (critical)
   - ID: qi-build_error-1765185091983-65779838
   - Description: Build error detected: app/foreman/analytics/page.tsx(127,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:69

66. **build_error** (critical)
   - ID: qi-build_error-1765185091997-8130d1d4
   - Description: Build error detected: app/foreman/analytics/page.tsx(128,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:70

67. **build_error** (critical)
   - ID: qi-build_error-1765185092010-153d8e07
   - Description: Build error detected: app/foreman/analytics/page.tsx(132,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:71

68. **build_error** (critical)
   - ID: qi-build_error-1765185092023-4d1d2a8d
   - Description: Build error detected: app/foreman/analytics/page.tsx(133,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:72

69. **build_error** (critical)
   - ID: qi-build_error-1765185092037-9c76b5aa
   - Description: Build error detected: app/foreman/analytics/page.tsx(133,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:73

70. **build_error** (critical)
   - ID: qi-build_error-1765185092050-b842bf78
   - Description: Build error detected: app/foreman/analytics/page.tsx(134,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:74

71. **build_error** (critical)
   - ID: qi-build_error-1765185092064-ec5471e7
   - Description: Build error detected: app/foreman/analytics/page.tsx(139,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:75

72. **build_error** (critical)
   - ID: qi-build_error-1765185092077-52c66880
   - Description: Build error detected: app/foreman/analytics/page.tsx(140,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:76

73. **build_error** (critical)
   - ID: qi-build_error-1765185092091-8c8b2449
   - Description: Build error detected: app/foreman/analytics/page.tsx(141,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:77

74. **build_error** (critical)
   - ID: qi-build_error-1765185092104-e1f0a835
   - Description: Build error detected: app/foreman/analytics/page.tsx(142,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:78

75. **build_error** (critical)
   - ID: qi-build_error-1765185092117-140a332e
   - Description: Build error detected: app/foreman/analytics/page.tsx(142,97): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:79

76. **build_error** (critical)
   - ID: qi-build_error-1765185092130-a8817301
   - Description: Build error detected: app/foreman/analytics/page.tsx(143,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:80

77. **build_error** (critical)
   - ID: qi-build_error-1765185092145-d4ec3c1f
   - Description: Build error detected: app/foreman/analytics/page.tsx(143,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:81

78. **build_error** (critical)
   - ID: qi-build_error-1765185092158-08ac72bd
   - Description: Build error detected: app/foreman/analytics/page.tsx(144,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:82

79. **build_error** (critical)
   - ID: qi-build_error-1765185092171-46478b29
   - Description: Build error detected: app/foreman/analytics/page.tsx(144,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:83

80. **build_error** (critical)
   - ID: qi-build_error-1765185092184-4d23279a
   - Description: Build error detected: app/foreman/analytics/page.tsx(145,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:84

81. **build_error** (critical)
   - ID: qi-build_error-1765185092199-9a1828f9
   - Description: Build error detected: app/foreman/analytics/page.tsx(146,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:85

82. **build_error** (critical)
   - ID: qi-build_error-1765185092212-ece3b9f1
   - Description: Build error detected: app/foreman/analytics/page.tsx(146,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:86

83. **build_error** (critical)
   - ID: qi-build_error-1765185092226-6fe68140
   - Description: Build error detected: app/foreman/analytics/page.tsx(147,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:87

84. **build_error** (critical)
   - ID: qi-build_error-1765185092239-87c6841f
   - Description: Build error detected: app/foreman/analytics/page.tsx(148,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:88

85. **build_error** (critical)
   - ID: qi-build_error-1765185092253-453fd066
   - Description: Build error detected: app/foreman/analytics/page.tsx(153,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:89

86. **build_error** (critical)
   - ID: qi-build_error-1765185092267-7f9c09a7
   - Description: Build error detected: app/foreman/analytics/page.tsx(155,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:90

87. **build_error** (critical)
   - ID: qi-build_error-1765185092280-f698a752
   - Description: Build error detected: app/foreman/analytics/page.tsx(156,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:91

88. **build_error** (critical)
   - ID: qi-build_error-1765185092293-6ae6d2e7
   - Description: Build error detected: app/foreman/analytics/page.tsx(158,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:92

89. **build_error** (critical)
   - ID: qi-build_error-1765185092307-1d60950e
   - Description: Build error detected: app/foreman/analytics/page.tsx(159,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:93

90. **build_error** (critical)
   - ID: qi-build_error-1765185092321-4e9b7e4b
   - Description: Build error detected: app/foreman/analytics/page.tsx(160,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:94

91. **build_error** (critical)
   - ID: qi-build_error-1765185092334-878eb94b
   - Description: Build error detected: app/foreman/analytics/page.tsx(161,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:95

92. **build_error** (critical)
   - ID: qi-build_error-1765185092347-371a1f5f
   - Description: Build error detected: app/foreman/analytics/page.tsx(163,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:96

93. **build_error** (critical)
   - ID: qi-build_error-1765185092362-296d4649
   - Description: Build error detected: app/foreman/analytics/page.tsx(164,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:97

94. **build_error** (critical)
   - ID: qi-build_error-1765185092375-1f14394b
   - Description: Build error detected: app/foreman/analytics/page.tsx(164,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:98

95. **build_error** (critical)
   - ID: qi-build_error-1765185092389-7b4ed215
   - Description: Build error detected: app/foreman/analytics/page.tsx(165,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:99

96. **build_error** (critical)
   - ID: qi-build_error-1765185092403-300548fe
   - Description: Build error detected: app/foreman/analytics/page.tsx(166,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:100

97. **build_error** (critical)
   - ID: qi-build_error-1765185092418-ea07b932
   - Description: Build error detected: app/foreman/analytics/page.tsx(167,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:101

98. **build_error** (critical)
   - ID: qi-build_error-1765185092432-3c2bc593
   - Description: Build error detected: app/foreman/analytics/page.tsx(169,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:102

99. **build_error** (critical)
   - ID: qi-build_error-1765185092446-3fa0e92f
   - Description: Build error detected: app/foreman/analytics/page.tsx(170,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:103

100. **build_error** (critical)
   - ID: qi-build_error-1765185092462-b615ce29
   - Description: Build error detected: app/foreman/analytics/page.tsx(170,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:104

101. **build_error** (critical)
   - ID: qi-build_error-1765185092476-3194a83f
   - Description: Build error detected: app/foreman/analytics/page.tsx(171,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:105

102. **build_error** (critical)
   - ID: qi-build_error-1765185092490-718e2545
   - Description: Build error detected: app/foreman/analytics/page.tsx(172,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:106

103. **build_error** (critical)
   - ID: qi-build_error-1765185092506-f24fdb9d
   - Description: Build error detected: app/foreman/analytics/page.tsx(173,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:107

104. **build_error** (critical)
   - ID: qi-build_error-1765185092520-30c90f71
   - Description: Build error detected: app/foreman/analytics/page.tsx(175,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:108

105. **build_error** (critical)
   - ID: qi-build_error-1765185092533-8eb6312c
   - Description: Build error detected: app/foreman/analytics/page.tsx(176,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:109

106. **build_error** (critical)
   - ID: qi-build_error-1765185092549-38d99e66
   - Description: Build error detected: app/foreman/analytics/page.tsx(176,78): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:110

107. **build_error** (critical)
   - ID: qi-build_error-1765185092563-365ed69b
   - Description: Build error detected: app/foreman/analytics/page.tsx(177,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:111

108. **build_error** (critical)
   - ID: qi-build_error-1765185092577-5a62373c
   - Description: Build error detected: app/foreman/analytics/page.tsx(178,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:112

109. **build_error** (critical)
   - ID: qi-build_error-1765185092592-78e8f395
   - Description: Build error detected: app/foreman/analytics/page.tsx(180,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:113

110. **build_error** (critical)
   - ID: qi-build_error-1765185092606-24075f73
   - Description: Build error detected: app/foreman/analytics/page.tsx(181,57): error TS7006: Parameter 'alert' implicitly has an 'any' type.
   - Source: build.log:114

111. **build_error** (critical)
   - ID: qi-build_error-1765185092620-3472b124
   - Description: Build error detected: app/foreman/analytics/page.tsx(181,64): error TS7006: Parameter 'idx' implicitly has an 'any' type.
   - Source: build.log:115

112. **build_error** (critical)
   - ID: qi-build_error-1765185092635-cf9a54df
   - Description: Build error detected: app/foreman/analytics/page.tsx(182,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:116

113. **build_error** (critical)
   - ID: qi-build_error-1765185092648-827271fa
   - Description: Build error detected: app/foreman/analytics/page.tsx(184,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:117

114. **build_error** (critical)
   - ID: qi-build_error-1765185092662-837311be
   - Description: Build error detected: app/foreman/analytics/page.tsx(186,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:118

115. **build_error** (critical)
   - ID: qi-build_error-1765185092677-4657039b
   - Description: Build error detected: app/foreman/analytics/page.tsx(188,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:119

116. **build_error** (critical)
   - ID: qi-build_error-1765185092691-9a9bf93d
   - Description: Build error detected: app/foreman/analytics/page.tsx(191,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:120

117. **build_error** (critical)
   - ID: qi-build_error-1765185092705-73be6172
   - Description: Build error detected: app/foreman/analytics/page.tsx(194,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:121

118. **build_error** (critical)
   - ID: qi-build_error-1765185092721-342c29d3
   - Description: Build error detected: app/foreman/analytics/page.tsx(195,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:122

119. **build_error** (critical)
   - ID: qi-build_error-1765185092735-69121231
   - Description: Build error detected: app/foreman/analytics/page.tsx(197,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:123

120. **build_error** (critical)
   - ID: qi-build_error-1765185092749-c32a01b6
   - Description: Build error detected: app/foreman/analytics/page.tsx(198,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:124

121. **build_error** (critical)
   - ID: qi-build_error-1765185092765-1b0c317e
   - Description: Build error detected: app/foreman/analytics/page.tsx(199,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:125

122. **build_error** (critical)
   - ID: qi-build_error-1765185092778-a32cbd29
   - Description: Build error detected: app/foreman/analytics/page.tsx(200,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:126

123. **build_error** (critical)
   - ID: qi-build_error-1765185092792-238e591c
   - Description: Build error detected: app/foreman/analytics/page.tsx(200,70): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:127

124. **build_error** (critical)
   - ID: qi-build_error-1765185092808-76f7adf8
   - Description: Build error detected: app/foreman/analytics/page.tsx(201,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:128

125. **build_error** (critical)
   - ID: qi-build_error-1765185092821-b9771e21
   - Description: Build error detected: app/foreman/analytics/page.tsx(201,123): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:129

126. **build_error** (critical)
   - ID: qi-build_error-1765185092835-ed4f15d7
   - Description: Build error detected: app/foreman/analytics/page.tsx(202,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:130

127. **build_error** (critical)
   - ID: qi-build_error-1765185092850-f8296f70
   - Description: Build error detected: app/foreman/analytics/page.tsx(203,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:131

128. **build_error** (critical)
   - ID: qi-build_error-1765185092864-e26a3651
   - Description: Build error detected: app/foreman/analytics/page.tsx(204,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:132

129. **build_error** (critical)
   - ID: qi-build_error-1765185092877-ebc5dba6
   - Description: Build error detected: app/foreman/analytics/page.tsx(204,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:133

130. **build_error** (critical)
   - ID: qi-build_error-1765185092893-6eeb9a69
   - Description: Build error detected: app/foreman/analytics/page.tsx(205,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:134

131. **build_error** (critical)
   - ID: qi-build_error-1765185092908-26e11475
   - Description: Build error detected: app/foreman/analytics/page.tsx(205,129): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:135

132. **build_error** (critical)
   - ID: qi-build_error-1765185092921-5072b67a
   - Description: Build error detected: app/foreman/analytics/page.tsx(206,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:136

133. **build_error** (critical)
   - ID: qi-build_error-1765185092937-5adfdb3e
   - Description: Build error detected: app/foreman/analytics/page.tsx(207,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:137

134. **build_error** (critical)
   - ID: qi-build_error-1765185092950-10b2d04c
   - Description: Build error detected: app/foreman/analytics/page.tsx(208,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:138

135. **build_error** (critical)
   - ID: qi-build_error-1765185092964-2903e920
   - Description: Build error detected: app/foreman/analytics/page.tsx(208,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:139

136. **build_error** (critical)
   - ID: qi-build_error-1765185092982-b87e67e7
   - Description: Build error detected: app/foreman/analytics/page.tsx(209,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:140

137. **build_error** (critical)
   - ID: qi-build_error-1765185092997-13c9ef20
   - Description: Build error detected: app/foreman/analytics/page.tsx(209,125): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:141

138. **build_error** (critical)
   - ID: qi-build_error-1765185093010-7d9004da
   - Description: Build error detected: app/foreman/analytics/page.tsx(210,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:142

139. **build_error** (critical)
   - ID: qi-build_error-1765185093026-d033cfea
   - Description: Build error detected: app/foreman/analytics/page.tsx(211,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:143

140. **build_error** (critical)
   - ID: qi-build_error-1765185093039-1127958d
   - Description: Build error detected: app/foreman/analytics/page.tsx(212,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:144

141. **build_error** (critical)
   - ID: qi-build_error-1765185093052-9189581a
   - Description: Build error detected: app/foreman/analytics/page.tsx(212,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:145

142. **build_error** (critical)
   - ID: qi-build_error-1765185093067-0010d320
   - Description: Build error detected: app/foreman/analytics/page.tsx(213,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:146

143. **build_error** (critical)
   - ID: qi-build_error-1765185093080-7ad3ecb0
   - Description: Build error detected: app/foreman/analytics/page.tsx(215,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:147

144. **build_error** (critical)
   - ID: qi-build_error-1765185093093-99149131
   - Description: Build error detected: app/foreman/analytics/page.tsx(216,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:148

145. **build_error** (critical)
   - ID: qi-build_error-1765185093108-bb2bb4a6
   - Description: Build error detected: app/foreman/analytics/page.tsx(217,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:149

146. **build_error** (critical)
   - ID: qi-build_error-1765185093121-cd21ea0a
   - Description: Build error detected: app/foreman/analytics/page.tsx(218,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:150

147. **build_error** (critical)
   - ID: qi-build_error-1765185093134-95ea46c0
   - Description: Build error detected: app/foreman/analytics/page.tsx(218,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:151

148. **build_error** (critical)
   - ID: qi-build_error-1765185093149-7fd0d948
   - Description: Build error detected: app/foreman/analytics/page.tsx(219,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:152

149. **build_error** (critical)
   - ID: qi-build_error-1765185093162-6f25a11d
   - Description: Build error detected: app/foreman/analytics/page.tsx(219,144): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:153

150. **build_error** (critical)
   - ID: qi-build_error-1765185093175-9a411cee
   - Description: Build error detected: app/foreman/analytics/page.tsx(220,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:154

151. **build_error** (critical)
   - ID: qi-build_error-1765185093191-07b61c54
   - Description: Build error detected: app/foreman/analytics/page.tsx(221,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:155

152. **build_error** (critical)
   - ID: qi-build_error-1765185093205-34b01f28
   - Description: Build error detected: app/foreman/analytics/page.tsx(222,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:156

153. **build_error** (critical)
   - ID: qi-build_error-1765185093218-09e0a0c2
   - Description: Build error detected: app/foreman/analytics/page.tsx(225,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:157

154. **build_error** (critical)
   - ID: qi-build_error-1765185093233-4c72eb64
   - Description: Build error detected: app/foreman/analytics/page.tsx(226,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:158

155. **build_error** (critical)
   - ID: qi-build_error-1765185093246-c8b85473
   - Description: Build error detected: app/foreman/analytics/page.tsx(228,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:159

156. **build_error** (critical)
   - ID: qi-build_error-1765185093259-22da9fba
   - Description: Build error detected: app/foreman/analytics/page.tsx(229,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:160

157. **build_error** (critical)
   - ID: qi-build_error-1765185093274-cea6da84
   - Description: Build error detected: app/foreman/analytics/page.tsx(230,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:161

158. **build_error** (critical)
   - ID: qi-build_error-1765185093287-42c9a1dd
   - Description: Build error detected: app/foreman/analytics/page.tsx(231,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:162

159. **build_error** (critical)
   - ID: qi-build_error-1765185093300-9cc00438
   - Description: Build error detected: app/foreman/analytics/page.tsx(231,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:163

160. **build_error** (critical)
   - ID: qi-build_error-1765185093315-114add94
   - Description: Build error detected: app/foreman/analytics/page.tsx(232,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:164

161. **build_error** (critical)
   - ID: qi-build_error-1765185093328-39647384
   - Description: Build error detected: app/foreman/analytics/page.tsx(232,128): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:165

162. **build_error** (critical)
   - ID: qi-build_error-1765185093342-02693930
   - Description: Build error detected: app/foreman/analytics/page.tsx(233,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:166

163. **build_error** (critical)
   - ID: qi-build_error-1765185093357-d4f2a8bf
   - Description: Build error detected: app/foreman/analytics/page.tsx(234,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:167

164. **build_error** (critical)
   - ID: qi-build_error-1765185093370-6b59adea
   - Description: Build error detected: app/foreman/analytics/page.tsx(235,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:168

165. **build_error** (critical)
   - ID: qi-build_error-1765185093384-6a88407f
   - Description: Build error detected: app/foreman/analytics/page.tsx(235,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:169

166. **build_error** (critical)
   - ID: qi-build_error-1765185093399-aad05046
   - Description: Build error detected: app/foreman/analytics/page.tsx(236,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:170

167. **build_error** (critical)
   - ID: qi-build_error-1765185093413-c2e737a7
   - Description: Build error detected: app/foreman/analytics/page.tsx(236,113): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:171

168. **build_error** (critical)
   - ID: qi-build_error-1765185093426-f235e6fa
   - Description: Build error detected: app/foreman/analytics/page.tsx(237,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:172

169. **build_error** (critical)
   - ID: qi-build_error-1765185093441-dc38e1da
   - Description: Build error detected: app/foreman/analytics/page.tsx(238,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:173

170. **build_error** (critical)
   - ID: qi-build_error-1765185093454-b5e5aadb
   - Description: Build error detected: app/foreman/analytics/page.tsx(239,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:174

171. **build_error** (critical)
   - ID: qi-build_error-1765185093468-bb222436
   - Description: Build error detected: app/foreman/analytics/page.tsx(239,64): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:175

172. **build_error** (critical)
   - ID: qi-build_error-1765185093483-734208e2
   - Description: Build error detected: app/foreman/analytics/page.tsx(240,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:176

173. **build_error** (critical)
   - ID: qi-build_error-1765185093496-3ad24d33
   - Description: Build error detected: app/foreman/analytics/page.tsx(240,113): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:177

174. **build_error** (critical)
   - ID: qi-build_error-1765185093510-60488a7d
   - Description: Build error detected: app/foreman/analytics/page.tsx(241,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:178

175. **build_error** (critical)
   - ID: qi-build_error-1765185093526-ab3651f1
   - Description: Build error detected: app/foreman/analytics/page.tsx(242,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:179

176. **build_error** (critical)
   - ID: qi-build_error-1765185093539-39752ddc
   - Description: Build error detected: app/foreman/analytics/page.tsx(243,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:180

177. **build_error** (critical)
   - ID: qi-build_error-1765185093552-703ebf6e
   - Description: Build error detected: app/foreman/analytics/page.tsx(243,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:181

178. **build_error** (critical)
   - ID: qi-build_error-1765185093568-e4f33a43
   - Description: Build error detected: app/foreman/analytics/page.tsx(244,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:182

179. **build_error** (critical)
   - ID: qi-build_error-1765185093581-ad8c83e4
   - Description: Build error detected: app/foreman/analytics/page.tsx(244,115): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:183

180. **build_error** (critical)
   - ID: qi-build_error-1765185093594-67394bed
   - Description: Build error detected: app/foreman/analytics/page.tsx(245,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:184

181. **build_error** (critical)
   - ID: qi-build_error-1765185093610-2b7d4139
   - Description: Build error detected: app/foreman/analytics/page.tsx(246,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:185

182. **build_error** (critical)
   - ID: qi-build_error-1765185093623-8c8779ff
   - Description: Build error detected: app/foreman/analytics/page.tsx(247,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:186

183. **build_error** (critical)
   - ID: qi-build_error-1765185093637-d8753cc7
   - Description: Build error detected: app/foreman/analytics/page.tsx(247,60): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:187

184. **build_error** (critical)
   - ID: qi-build_error-1765185093652-2d21a939
   - Description: Build error detected: app/foreman/analytics/page.tsx(248,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:188

185. **build_error** (critical)
   - ID: qi-build_error-1765185093665-f3d378d6
   - Description: Build error detected: app/foreman/analytics/page.tsx(248,110): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:189

186. **build_error** (critical)
   - ID: qi-build_error-1765185093679-d3bfe2e4
   - Description: Build error detected: app/foreman/analytics/page.tsx(249,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:190

187. **build_error** (critical)
   - ID: qi-build_error-1765185093694-6bf4f6e9
   - Description: Build error detected: app/foreman/analytics/page.tsx(250,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:191

188. **build_error** (critical)
   - ID: qi-build_error-1765185093709-9e6a0fc4
   - Description: Build error detected: app/foreman/analytics/page.tsx(251,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:192

189. **build_error** (critical)
   - ID: qi-build_error-1765185093723-46e021ed
   - Description: Build error detected: app/foreman/analytics/page.tsx(254,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:193

190. **build_error** (critical)
   - ID: qi-build_error-1765185093739-2a5a44a7
   - Description: Build error detected: app/foreman/analytics/page.tsx(255,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:194

191. **build_error** (critical)
   - ID: qi-build_error-1765185093752-054179cb
   - Description: Build error detected: app/foreman/analytics/page.tsx(257,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:195

192. **build_error** (critical)
   - ID: qi-build_error-1765185093766-be83f23c
   - Description: Build error detected: app/foreman/analytics/page.tsx(258,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:196

193. **build_error** (critical)
   - ID: qi-build_error-1765185093781-c8655c65
   - Description: Build error detected: app/foreman/analytics/page.tsx(259,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:197

194. **build_error** (critical)
   - ID: qi-build_error-1765185093795-f6b704c6
   - Description: Build error detected: app/foreman/analytics/page.tsx(260,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:198

195. **build_error** (critical)
   - ID: qi-build_error-1765185093809-d957da97
   - Description: Build error detected: app/foreman/analytics/page.tsx(260,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:199

196. **build_error** (critical)
   - ID: qi-build_error-1765185093824-8b71db3e
   - Description: Build error detected: app/foreman/analytics/page.tsx(261,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:200

197. **build_error** (critical)
   - ID: qi-build_error-1765185093838-591a45d5
   - Description: Build error detected: app/foreman/analytics/page.tsx(261,141): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:201

198. **build_error** (critical)
   - ID: qi-build_error-1765185093851-f534a0f8
   - Description: Build error detected: app/foreman/analytics/page.tsx(262,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:202

199. **build_error** (critical)
   - ID: qi-build_error-1765185093866-5c8eca5c
   - Description: Build error detected: app/foreman/analytics/page.tsx(263,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:203

200. **build_error** (critical)
   - ID: qi-build_error-1765185093880-c83dcc10
   - Description: Build error detected: app/foreman/analytics/page.tsx(264,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:204

201. **build_error** (critical)
   - ID: qi-build_error-1765185093894-eef4212e
   - Description: Build error detected: app/foreman/analytics/page.tsx(264,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:205

202. **build_error** (critical)
   - ID: qi-build_error-1765185093909-98116429
   - Description: Build error detected: app/foreman/analytics/page.tsx(265,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:206

203. **build_error** (critical)
   - ID: qi-build_error-1765185093922-2a99e9fd
   - Description: Build error detected: app/foreman/analytics/page.tsx(265,146): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:207

204. **build_error** (critical)
   - ID: qi-build_error-1765185093936-2bae30ec
   - Description: Build error detected: app/foreman/analytics/page.tsx(266,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:208

205. **build_error** (critical)
   - ID: qi-build_error-1765185093952-6ff6d9db
   - Description: Build error detected: app/foreman/analytics/page.tsx(267,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:209

206. **build_error** (critical)
   - ID: qi-build_error-1765185093965-00d85d8b
   - Description: Build error detected: app/foreman/analytics/page.tsx(268,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:210

207. **build_error** (critical)
   - ID: qi-build_error-1765185093979-e2dcf16f
   - Description: Build error detected: app/foreman/analytics/page.tsx(268,73): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:211

208. **build_error** (critical)
   - ID: qi-build_error-1765185093995-bdce4dc8
   - Description: Build error detected: app/foreman/analytics/page.tsx(269,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:212

209. **build_error** (critical)
   - ID: qi-build_error-1765185094008-40c84e72
   - Description: Build error detected: app/foreman/analytics/page.tsx(269,132): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:213

210. **build_error** (critical)
   - ID: qi-build_error-1765185094022-64457a27
   - Description: Build error detected: app/foreman/analytics/page.tsx(270,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:214

211. **build_error** (critical)
   - ID: qi-build_error-1765185094037-30de2d57
   - Description: Build error detected: app/foreman/analytics/page.tsx(271,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:215

212. **build_error** (critical)
   - ID: qi-build_error-1765185094050-44592622
   - Description: Build error detected: app/foreman/analytics/page.tsx(272,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:216

213. **build_error** (critical)
   - ID: qi-build_error-1765185094063-40e7b8d9
   - Description: Build error detected: app/foreman/analytics/page.tsx(272,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:217

214. **build_error** (critical)
   - ID: qi-build_error-1765185094079-fdfa8835
   - Description: Build error detected: app/foreman/analytics/page.tsx(273,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:218

215. **build_error** (critical)
   - ID: qi-build_error-1765185094093-c0fccd84
   - Description: Build error detected: app/foreman/analytics/page.tsx(273,141): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:219

216. **build_error** (critical)
   - ID: qi-build_error-1765185094106-f303f6b6
   - Description: Build error detected: app/foreman/analytics/page.tsx(274,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:220

217. **build_error** (critical)
   - ID: qi-build_error-1765185094121-e7dc2f3b
   - Description: Build error detected: app/foreman/analytics/page.tsx(275,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:221

218. **build_error** (critical)
   - ID: qi-build_error-1765185094135-1e5ab345
   - Description: Build error detected: app/foreman/analytics/page.tsx(276,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:222

219. **build_error** (critical)
   - ID: qi-build_error-1765185094149-e48023f4
   - Description: Build error detected: app/foreman/analytics/page.tsx(279,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:223

220. **build_error** (critical)
   - ID: qi-build_error-1765185094164-6eb89fab
   - Description: Build error detected: app/foreman/analytics/page.tsx(280,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:224

221. **build_error** (critical)
   - ID: qi-build_error-1765185094178-7860e7f2
   - Description: Build error detected: app/foreman/analytics/page.tsx(282,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:225

222. **build_error** (critical)
   - ID: qi-build_error-1765185094191-34b8e94a
   - Description: Build error detected: app/foreman/analytics/page.tsx(283,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:226

223. **build_error** (critical)
   - ID: qi-build_error-1765185094206-c011d3d0
   - Description: Build error detected: app/foreman/analytics/page.tsx(284,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:227

224. **build_error** (critical)
   - ID: qi-build_error-1765185094220-badb7600
   - Description: Build error detected: app/foreman/analytics/page.tsx(285,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:228

225. **build_error** (critical)
   - ID: qi-build_error-1765185094233-27f4fcc6
   - Description: Build error detected: app/foreman/analytics/page.tsx(285,71): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:229

226. **build_error** (critical)
   - ID: qi-build_error-1765185094248-33498f77
   - Description: Build error detected: app/foreman/analytics/page.tsx(286,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:230

227. **build_error** (critical)
   - ID: qi-build_error-1765185094261-85e37cc3
   - Description: Build error detected: app/foreman/analytics/page.tsx(286,130): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:231

228. **build_error** (critical)
   - ID: qi-build_error-1765185094275-cecc6fa4
   - Description: Build error detected: app/foreman/analytics/page.tsx(287,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:232

229. **build_error** (critical)
   - ID: qi-build_error-1765185094290-8e4b60db
   - Description: Build error detected: app/foreman/analytics/page.tsx(288,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:233

230. **build_error** (critical)
   - ID: qi-build_error-1765185094304-3dd3dd5d
   - Description: Build error detected: app/foreman/analytics/page.tsx(289,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:234

231. **build_error** (critical)
   - ID: qi-build_error-1765185094318-b9f9aac6
   - Description: Build error detected: app/foreman/analytics/page.tsx(289,74): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:235

232. **build_error** (critical)
   - ID: qi-build_error-1765185094333-2ffb9676
   - Description: Build error detected: app/foreman/analytics/page.tsx(290,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:236

233. **build_error** (critical)
   - ID: qi-build_error-1765185094347-d0413398
   - Description: Build error detected: app/foreman/analytics/page.tsx(290,133): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:237

234. **build_error** (critical)
   - ID: qi-build_error-1765185094360-2e117cd6
   - Description: Build error detected: app/foreman/analytics/page.tsx(291,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:238

235. **build_error** (critical)
   - ID: qi-build_error-1765185094375-e50437df
   - Description: Build error detected: app/foreman/analytics/page.tsx(292,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:239

236. **build_error** (critical)
   - ID: qi-build_error-1765185094389-e72e1fe1
   - Description: Build error detected: app/foreman/analytics/page.tsx(293,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:240

237. **build_error** (critical)
   - ID: qi-build_error-1765185094403-3f702521
   - Description: Build error detected: app/foreman/analytics/page.tsx(293,75): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:241

238. **build_error** (critical)
   - ID: qi-build_error-1765185094419-f9585319
   - Description: Build error detected: app/foreman/analytics/page.tsx(294,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:242

239. **build_error** (critical)
   - ID: qi-build_error-1765185094432-34eabfce
   - Description: Build error detected: app/foreman/analytics/page.tsx(294,134): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:243

240. **build_error** (critical)
   - ID: qi-build_error-1765185094446-9187b0d6
   - Description: Build error detected: app/foreman/analytics/page.tsx(295,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:244

241. **build_error** (critical)
   - ID: qi-build_error-1765185094462-d09dd041
   - Description: Build error detected: app/foreman/analytics/page.tsx(296,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:245

242. **build_error** (critical)
   - ID: qi-build_error-1765185094475-e13165e5
   - Description: Build error detected: app/foreman/analytics/page.tsx(297,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:246

243. **build_error** (critical)
   - ID: qi-build_error-1765185094489-5246c416
   - Description: Build error detected: app/foreman/analytics/page.tsx(300,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:247

244. **build_error** (critical)
   - ID: qi-build_error-1765185094505-0d61ee8b
   - Description: Build error detected: app/foreman/analytics/page.tsx(301,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:248

245. **build_error** (critical)
   - ID: qi-build_error-1765185094519-a6b1b2bc
   - Description: Build error detected: app/foreman/analytics/page.tsx(303,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:249

246. **build_error** (critical)
   - ID: qi-build_error-1765185094533-8009ad55
   - Description: Build error detected: app/foreman/analytics/page.tsx(304,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:250

247. **build_error** (critical)
   - ID: qi-build_error-1765185094549-fe259d65
   - Description: Build error detected: app/foreman/analytics/page.tsx(305,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:251

248. **build_error** (critical)
   - ID: qi-build_error-1765185094562-0326c861
   - Description: Build error detected: app/foreman/analytics/page.tsx(306,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:252

249. **build_error** (critical)
   - ID: qi-build_error-1765185094576-3ea85976
   - Description: Build error detected: app/foreman/analytics/page.tsx(306,73): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:253

250. **build_error** (critical)
   - ID: qi-build_error-1765185094591-bb0ff368
   - Description: Build error detected: app/foreman/analytics/page.tsx(307,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:254

251. **build_error** (critical)
   - ID: qi-build_error-1765185094605-f9f9fb42
   - Description: Build error detected: app/foreman/analytics/page.tsx(307,122): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:255

252. **build_error** (critical)
   - ID: qi-build_error-1765185094618-4b473cb6
   - Description: Build error detected: app/foreman/analytics/page.tsx(308,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:256

253. **build_error** (critical)
   - ID: qi-build_error-1765185094634-721b4d4a
   - Description: Build error detected: app/foreman/analytics/page.tsx(309,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:257

254. **build_error** (critical)
   - ID: qi-build_error-1765185094647-ff7eda52
   - Description: Build error detected: app/foreman/analytics/page.tsx(310,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:258

255. **build_error** (critical)
   - ID: qi-build_error-1765185094660-e51c9032
   - Description: Build error detected: app/foreman/analytics/page.tsx(310,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:259

256. **build_error** (critical)
   - ID: qi-build_error-1765185094675-a033af43
   - Description: Build error detected: app/foreman/analytics/page.tsx(311,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:260

257. **build_error** (critical)
   - ID: qi-build_error-1765185094690-bccf2f9f
   - Description: Build error detected: app/foreman/analytics/page.tsx(311,119): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:261

258. **build_error** (critical)
   - ID: qi-build_error-1765185094704-04990146
   - Description: Build error detected: app/foreman/analytics/page.tsx(312,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:262

259. **build_error** (critical)
   - ID: qi-build_error-1765185094719-e2fd19b7
   - Description: Build error detected: app/foreman/analytics/page.tsx(313,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:263

260. **build_error** (critical)
   - ID: qi-build_error-1765185094733-c5f94a73
   - Description: Build error detected: app/foreman/analytics/page.tsx(314,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:264

261. **build_error** (critical)
   - ID: qi-build_error-1765185094747-0b4636c8
   - Description: Build error detected: app/foreman/analytics/page.tsx(314,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:265

262. **build_error** (critical)
   - ID: qi-build_error-1765185094763-7826f4fa
   - Description: Build error detected: app/foreman/analytics/page.tsx(315,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:266

263. **build_error** (critical)
   - ID: qi-build_error-1765185094777-85cabeb6
   - Description: Build error detected: app/foreman/analytics/page.tsx(315,130): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:267

264. **build_error** (critical)
   - ID: qi-build_error-1765185094791-27ce8aa1
   - Description: Build error detected: app/foreman/analytics/page.tsx(316,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:268

265. **build_error** (critical)
   - ID: qi-build_error-1765185094807-04954e27
   - Description: Build error detected: app/foreman/analytics/page.tsx(317,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:269

266. **build_error** (critical)
   - ID: qi-build_error-1765185094822-c96ac9e6
   - Description: Build error detected: app/foreman/analytics/page.tsx(318,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:270

267. **build_error** (critical)
   - ID: qi-build_error-1765185094836-36d50b4d
   - Description: Build error detected: app/foreman/analytics/page.tsx(318,70): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:271

268. **build_error** (critical)
   - ID: qi-build_error-1765185094852-43e9741b
   - Description: Build error detected: app/foreman/analytics/page.tsx(319,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:272

269. **build_error** (critical)
   - ID: qi-build_error-1765185094866-9bda5ce9
   - Description: Build error detected: app/foreman/analytics/page.tsx(319,135): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:273

270. **build_error** (critical)
   - ID: qi-build_error-1765185094880-77bbcca8
   - Description: Build error detected: app/foreman/analytics/page.tsx(320,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:274

271. **build_error** (critical)
   - ID: qi-build_error-1765185094895-6b761fe6
   - Description: Build error detected: app/foreman/analytics/page.tsx(321,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:275

272. **build_error** (critical)
   - ID: qi-build_error-1765185094910-be16eaee
   - Description: Build error detected: app/foreman/analytics/page.tsx(322,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:276

273. **build_error** (critical)
   - ID: qi-build_error-1765185094924-48662f81
   - Description: Build error detected: app/foreman/analytics/page.tsx(325,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:277

274. **build_error** (critical)
   - ID: qi-build_error-1765185094941-ca28a736
   - Description: Build error detected: app/foreman/analytics/page.tsx(326,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:278

275. **build_error** (critical)
   - ID: qi-build_error-1765185094954-582c0239
   - Description: Build error detected: app/foreman/analytics/page.tsx(328,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:279

276. **build_error** (critical)
   - ID: qi-build_error-1765185094968-9c58010c
   - Description: Build error detected: app/foreman/analytics/page.tsx(329,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:280

277. **build_error** (critical)
   - ID: qi-build_error-1765185094984-bc676eae
   - Description: Build error detected: app/foreman/analytics/page.tsx(330,73): error TS7006: Parameter 'builder' implicitly has an 'any' type.
   - Source: build.log:281

278. **build_error** (critical)
   - ID: qi-build_error-1765185094997-0ce9df63
   - Description: Build error detected: app/foreman/analytics/page.tsx(330,82): error TS7006: Parameter 'idx' implicitly has an 'any' type.
   - Source: build.log:282

279. **build_error** (critical)
   - ID: qi-build_error-1765185095012-ea0b8ed9
   - Description: Build error detected: app/foreman/analytics/page.tsx(331,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:283

280. **build_error** (critical)
   - ID: qi-build_error-1765185095028-980e8e22
   - Description: Build error detected: app/foreman/analytics/page.tsx(332,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:284

281. **build_error** (critical)
   - ID: qi-build_error-1765185095041-1fc9197e
   - Description: Build error detected: app/foreman/analytics/page.tsx(333,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:285

282. **build_error** (critical)
   - ID: qi-build_error-1765185095056-5353ac92
   - Description: Build error detected: app/foreman/analytics/page.tsx(333,86): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:286

283. **build_error** (critical)
   - ID: qi-build_error-1765185095072-46c6e733
   - Description: Build error detected: app/foreman/analytics/page.tsx(334,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:287

284. **build_error** (critical)
   - ID: qi-build_error-1765185095086-25fc5850
   - Description: Build error detected: app/foreman/analytics/page.tsx(336,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:288

285. **build_error** (critical)
   - ID: qi-build_error-1765185095100-ea7dc2ad
   - Description: Build error detected: app/foreman/analytics/page.tsx(337,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:289

286. **build_error** (critical)
   - ID: qi-build_error-1765185095116-5ca2278a
   - Description: Build error detected: app/foreman/analytics/page.tsx(338,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:290

287. **build_error** (critical)
   - ID: qi-build_error-1765185095130-b2ce9762
   - Description: Build error detected: app/foreman/analytics/page.tsx(339,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:291

288. **build_error** (critical)
   - ID: qi-build_error-1765185095143-3f8f0a4c
   - Description: Build error detected: app/foreman/analytics/page.tsx(339,83): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:292

289. **build_error** (critical)
   - ID: qi-build_error-1765185095159-9dbca130
   - Description: Build error detected: app/foreman/analytics/page.tsx(340,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:293

290. **build_error** (critical)
   - ID: qi-build_error-1765185095174-eee98054
   - Description: Build error detected: app/foreman/analytics/page.tsx(340,82): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:294

291. **build_error** (critical)
   - ID: qi-build_error-1765185095188-73b56ec4
   - Description: Build error detected: app/foreman/analytics/page.tsx(341,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:295

292. **build_error** (critical)
   - ID: qi-build_error-1765185095204-dc9ac7ec
   - Description: Build error detected: app/foreman/analytics/page.tsx(342,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:296

293. **build_error** (critical)
   - ID: qi-build_error-1765185095218-2fb5ed72
   - Description: Build error detected: app/foreman/analytics/page.tsx(345,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:297

294. **build_error** (critical)
   - ID: qi-build_error-1765185095233-a54fe37c
   - Description: Build error detected: app/foreman/analytics/page.tsx(347,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:298

295. **build_error** (critical)
   - ID: qi-build_error-1765185095257-1a320bae
   - Description: Build error detected: app/foreman/analytics/page.tsx(349,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:299

296. **build_error** (critical)
   - ID: qi-build_error-1765185095272-8431fd70
   - Description: Build error detected: app/foreman/analytics/page.tsx(350,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:300

297. **build_error** (critical)
   - ID: qi-build_error-1765185095286-b1da0597
   - Description: Build error detected: app/foreman/analytics/page.tsx(353,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:301

298. **build_error** (critical)
   - ID: qi-build_error-1765185095301-dc5638bc
   - Description: Build error detected: app/foreman/analytics/page.tsx(354,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:302

299. **build_error** (critical)
   - ID: qi-build_error-1765185095317-ca86d10d
   - Description: Build error detected: app/foreman/analytics/page.tsx(356,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:303

300. **build_error** (critical)
   - ID: qi-build_error-1765185095330-d3357edf
   - Description: Build error detected: app/foreman/analytics/page.tsx(357,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:304

301. **build_error** (critical)
   - ID: qi-build_error-1765185095345-f7d48a8a
   - Description: Build error detected: app/foreman/analytics/page.tsx(358,67): error TS7006: Parameter 'project' implicitly has an 'any' type.
   - Source: build.log:305

302. **build_error** (critical)
   - ID: qi-build_error-1765185095362-0174f22f
   - Description: Build error detected: app/foreman/analytics/page.tsx(358,76): error TS7006: Parameter 'idx' implicitly has an 'any' type.
   - Source: build.log:306

303. **build_error** (critical)
   - ID: qi-build_error-1765185095376-cd0d42ae
   - Description: Build error detected: app/foreman/analytics/page.tsx(359,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:307

304. **build_error** (critical)
   - ID: qi-build_error-1765185095390-3ea0b876
   - Description: Build error detected: app/foreman/analytics/page.tsx(360,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:308

305. **build_error** (critical)
   - ID: qi-build_error-1765185095406-7d9b26dd
   - Description: Build error detected: app/foreman/analytics/page.tsx(361,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:309

306. **build_error** (critical)
   - ID: qi-build_error-1765185095420-253e2178
   - Description: Build error detected: app/foreman/analytics/page.tsx(361,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:310

307. **build_error** (critical)
   - ID: qi-build_error-1765185095434-522b93f9
   - Description: Build error detected: app/foreman/analytics/page.tsx(362,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:311

308. **build_error** (critical)
   - ID: qi-build_error-1765185095450-3bd046b1
   - Description: Build error detected: app/foreman/analytics/page.tsx(364,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:312

309. **build_error** (critical)
   - ID: qi-build_error-1765185095465-5b66a150
   - Description: Build error detected: app/foreman/analytics/page.tsx(365,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:313

310. **build_error** (critical)
   - ID: qi-build_error-1765185095479-93622bae
   - Description: Build error detected: app/foreman/analytics/page.tsx(366,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:314

311. **build_error** (critical)
   - ID: qi-build_error-1765185095495-135cf1e0
   - Description: Build error detected: app/foreman/analytics/page.tsx(367,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:315

312. **build_error** (critical)
   - ID: qi-build_error-1765185095509-5b5925e9
   - Description: Build error detected: app/foreman/analytics/page.tsx(367,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:316

313. **build_error** (critical)
   - ID: qi-build_error-1765185095523-2f0f62a8
   - Description: Build error detected: app/foreman/analytics/page.tsx(368,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:317

314. **build_error** (critical)
   - ID: qi-build_error-1765185095539-f7cdd757
   - Description: Build error detected: app/foreman/analytics/page.tsx(368,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:318

315. **build_error** (critical)
   - ID: qi-build_error-1765185095553-e9c3cd4a
   - Description: Build error detected: app/foreman/analytics/page.tsx(369,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:319

316. **build_error** (critical)
   - ID: qi-build_error-1765185095567-68704ec7
   - Description: Build error detected: app/foreman/analytics/page.tsx(369,61): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:320

317. **build_error** (critical)
   - ID: qi-build_error-1765185095583-f3e5fc4e
   - Description: Build error detected: app/foreman/analytics/page.tsx(370,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:321

318. **build_error** (critical)
   - ID: qi-build_error-1765185095598-13050345
   - Description: Build error detected: app/foreman/analytics/page.tsx(371,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:322

319. **build_error** (critical)
   - ID: qi-build_error-1765185095612-51ff11b8
   - Description: Build error detected: app/foreman/analytics/page.tsx(374,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:323

320. **build_error** (critical)
   - ID: qi-build_error-1765185095629-085c1589
   - Description: Build error detected: app/foreman/analytics/page.tsx(376,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:324

321. **build_error** (critical)
   - ID: qi-build_error-1765185095643-10720d48
   - Description: Build error detected: app/foreman/analytics/page.tsx(378,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:325

322. **build_error** (critical)
   - ID: qi-build_error-1765185095657-2737e3fa
   - Description: Build error detected: app/foreman/analytics/page.tsx(379,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:326

323. **build_error** (critical)
   - ID: qi-build_error-1765185095673-db770991
   - Description: Build error detected: app/foreman/analytics/page.tsx(382,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:327

324. **build_error** (critical)
   - ID: qi-build_error-1765185095688-88d799db
   - Description: Build error detected: app/foreman/analytics/page.tsx(383,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:328

325. **build_error** (critical)
   - ID: qi-build_error-1765185095703-4ae85106
   - Description: Build error detected: app/foreman/analytics/page.tsx(385,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:329

326. **build_error** (critical)
   - ID: qi-build_error-1765185095720-ef0091a4
   - Description: Build error detected: app/foreman/analytics/page.tsx(386,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:330

327. **build_error** (critical)
   - ID: qi-build_error-1765185095734-82513eab
   - Description: Build error detected: app/foreman/analytics/page.tsx(387,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:331

328. **build_error** (critical)
   - ID: qi-build_error-1765185095749-ccb02397
   - Description: Build error detected: app/foreman/analytics/page.tsx(388,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:332

329. **build_error** (critical)
   - ID: qi-build_error-1765185095765-b64ababa
   - Description: Build error detected: app/foreman/analytics/page.tsx(388,75): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:333

330. **build_error** (critical)
   - ID: qi-build_error-1765185095779-3bdde822
   - Description: Build error detected: app/foreman/analytics/page.tsx(389,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:334

331. **build_error** (critical)
   - ID: qi-build_error-1765185095794-eeff3afb
   - Description: Build error detected: app/foreman/analytics/page.tsx(389,123): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:335

332. **build_error** (critical)
   - ID: qi-build_error-1765185095810-0dcc4c05
   - Description: Build error detected: app/foreman/analytics/page.tsx(390,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:336

333. **build_error** (critical)
   - ID: qi-build_error-1765185095825-b835202f
   - Description: Build error detected: app/foreman/analytics/page.tsx(391,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:337

334. **build_error** (critical)
   - ID: qi-build_error-1765185095839-a93070b3
   - Description: Build error detected: app/foreman/analytics/page.tsx(392,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:338

335. **build_error** (critical)
   - ID: qi-build_error-1765185095855-93234eb9
   - Description: Build error detected: app/foreman/analytics/page.tsx(392,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:339

336. **build_error** (critical)
   - ID: qi-build_error-1765185095869-b5a3a006
   - Description: Build error detected: app/foreman/analytics/page.tsx(393,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:340

337. **build_error** (critical)
   - ID: qi-build_error-1765185095884-e6f57ea3
   - Description: Build error detected: app/foreman/analytics/page.tsx(393,136): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:341

338. **build_error** (critical)
   - ID: qi-build_error-1765185095900-cd928092
   - Description: Build error detected: app/foreman/analytics/page.tsx(394,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:342

339. **build_error** (critical)
   - ID: qi-build_error-1765185095914-20bcdf40
   - Description: Build error detected: app/foreman/analytics/page.tsx(395,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:343

340. **build_error** (critical)
   - ID: qi-build_error-1765185095928-938c9061
   - Description: Build error detected: app/foreman/analytics/page.tsx(396,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:344

341. **build_error** (critical)
   - ID: qi-build_error-1765185095945-1a3a9fbf
   - Description: Build error detected: app/foreman/analytics/page.tsx(396,74): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:345

342. **build_error** (critical)
   - ID: qi-build_error-1765185095959-3938de16
   - Description: Build error detected: app/foreman/analytics/page.tsx(397,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:346

343. **build_error** (critical)
   - ID: qi-build_error-1765185095974-a56766d5
   - Description: Build error detected: app/foreman/analytics/page.tsx(397,148): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:347

344. **build_error** (critical)
   - ID: qi-build_error-1765185095991-8b575fb0
   - Description: Build error detected: app/foreman/analytics/page.tsx(398,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:348

345. **build_error** (critical)
   - ID: qi-build_error-1765185096006-57e03c60
   - Description: Build error detected: app/foreman/analytics/page.tsx(400,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:349

346. **build_error** (critical)
   - ID: qi-build_error-1765185096021-91b64a69
   - Description: Build error detected: app/foreman/analytics/page.tsx(401,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:350

347. **build_error** (critical)
   - ID: qi-build_error-1765185096037-16c57089
   - Description: Build error detected: app/foreman/analytics/page.tsx(401,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:351

348. **build_error** (critical)
   - ID: qi-build_error-1765185096052-1aeb253b
   - Description: Build error detected: app/foreman/analytics/page.tsx(402,81): error TS7006: Parameter 'rule' implicitly has an 'any' type.
   - Source: build.log:352

349. **build_error** (critical)
   - ID: qi-build_error-1765185096067-c7c8f699
   - Description: Build error detected: app/foreman/analytics/page.tsx(402,87): error TS7006: Parameter 'idx' implicitly has an 'any' type.
   - Source: build.log:353

350. **build_error** (critical)
   - ID: qi-build_error-1765185096084-2947519e
   - Description: Build error detected: app/foreman/analytics/page.tsx(403,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:354

351. **build_error** (critical)
   - ID: qi-build_error-1765185096099-0589c826
   - Description: Build error detected: app/foreman/analytics/page.tsx(405,27): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:355

352. **build_error** (critical)
   - ID: qi-build_error-1765185096114-09f2d245
   - Description: Build error detected: app/foreman/analytics/page.tsx(407,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:356

353. **build_error** (critical)
   - ID: qi-build_error-1765185096130-8eb99e8f
   - Description: Build error detected: app/foreman/analytics/page.tsx(409,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:357

354. **build_error** (critical)
   - ID: qi-build_error-1765185096145-b1bff8db
   - Description: Build error detected: app/foreman/analytics/page.tsx(410,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:358

355. **build_error** (critical)
   - ID: qi-build_error-1765185096160-16a8e1f8
   - Description: Build error detected: app/foreman/analytics/page.tsx(412,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:359

356. **build_error** (critical)
   - ID: qi-build_error-1765185096187-6b662fab
   - Description: Build error detected: app/foreman/analytics/page.tsx(413,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:360

357. **build_error** (critical)
   - ID: qi-build_error-1765185096202-73244e1b
   - Description: Build error detected: app/foreman/analytics/page.tsx(415,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:361

358. **build_error** (critical)
   - ID: qi-build_error-1765185096217-26d46c00
   - Description: Build error detected: app/foreman/analytics/page.tsx(416,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:362

359. **build_error** (critical)
   - ID: qi-build_error-1765185096232-9e050f50
   - Description: Build error detected: app/foreman/analytics/page.tsx(419,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:363

360. **build_error** (critical)
   - ID: qi-build_error-1765185096247-25cc867c
   - Description: Build error detected: app/foreman/analytics/page.tsx(424,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:364

361. **build_error** (critical)
   - ID: qi-build_error-1765185096262-137ff652
   - Description: Build error detected: app/foreman/analytics/page.tsx(425,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:365

362. **build_error** (critical)
   - ID: qi-build_error-1765185096277-30a139a7
   - Description: Build error detected: app/foreman/page.tsx(8,45): error TS2307: Cannot find module 'react' or its corresponding type declarations.
   - Source: build.log:366

363. **build_error** (critical)
   - ID: qi-build_error-1765185096293-0dce7af1
   - Description: Build error detected: app/foreman/page.tsx(55,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:367

364. **build_error** (critical)
   - ID: qi-build_error-1765185096308-e62527ba
   - Description: Build error detected: app/foreman/page.tsx(97,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:368

365. **build_error** (critical)
   - ID: qi-build_error-1765185096323-d316fae1
   - Description: Build error detected: app/foreman/page.tsx(107,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:369

366. **build_error** (critical)
   - ID: qi-build_error-1765185096339-21795e1f
   - Description: Build error detected: app/foreman/page.tsx(125,18): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:370

367. **build_error** (critical)
   - ID: qi-build_error-1765185096354-b724c1d0
   - Description: Build error detected: app/foreman/page.tsx(175,22): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:371

368. **build_error** (critical)
   - ID: qi-build_error-1765185096369-a6e8f64f
   - Description: Build error detected: app/foreman/page.tsx(186,22): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:372

369. **build_error** (critical)
   - ID: qi-build_error-1765185096386-4ce3be22
   - Description: Build error detected: app/foreman/page.tsx(197,20): error TS7006: Parameter 'prev' implicitly has an 'any' type.
   - Source: build.log:373

370. **build_error** (critical)
   - ID: qi-build_error-1765185096401-798dacea
   - Description: Build error detected: app/foreman/page.tsx(204,30): error TS2503: Cannot find namespace 'React'.
   - Source: build.log:374

371. **build_error** (critical)
   - ID: qi-build_error-1765185096416-61591c18
   - Description: Build error detected: app/foreman/page.tsx(212,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:375

372. **build_error** (critical)
   - ID: qi-build_error-1765185096433-1da4872b
   - Description: Build error detected: app/foreman/page.tsx(217,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:376

373. **build_error** (critical)
   - ID: qi-build_error-1765185096448-0bf2033c
   - Description: Build error detected: app/foreman/page.tsx(231,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:377

374. **build_error** (critical)
   - ID: qi-build_error-1765185096464-8d9e9ffe
   - Description: Build error detected: app/foreman/page.tsx(233,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:378

375. **build_error** (critical)
   - ID: qi-build_error-1765185096479-f372782c
   - Description: Build error detected: app/foreman/page.tsx(235,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:379

376. **build_error** (critical)
   - ID: qi-build_error-1765185096494-6abd85d7
   - Description: Build error detected: app/foreman/page.tsx(237,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:380

377. **build_error** (critical)
   - ID: qi-build_error-1765185096509-cb46d5ed
   - Description: Build error detected: app/foreman/page.tsx(238,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:381

378. **build_error** (critical)
   - ID: qi-build_error-1765185096525-1a89a69a
   - Description: Build error detected: app/foreman/page.tsx(239,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:382

379. **build_error** (critical)
   - ID: qi-build_error-1765185096540-79566f0f
   - Description: Build error detected: app/foreman/page.tsx(239,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:383

380. **build_error** (critical)
   - ID: qi-build_error-1765185096555-26e8d0e3
   - Description: Build error detected: app/foreman/page.tsx(240,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:384

381. **build_error** (critical)
   - ID: qi-build_error-1765185096571-f84aaa91
   - Description: Build error detected: app/foreman/page.tsx(241,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:385

382. **build_error** (critical)
   - ID: qi-build_error-1765185096585-f34b7e50
   - Description: Build error detected: app/foreman/page.tsx(243,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:386

383. **build_error** (critical)
   - ID: qi-build_error-1765185096600-3d884a12
   - Description: Build error detected: app/foreman/page.tsx(244,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:387

384. **build_error** (critical)
   - ID: qi-build_error-1765185096617-bc95632b
   - Description: Build error detected: app/foreman/page.tsx(244,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:388

385. **build_error** (critical)
   - ID: qi-build_error-1765185096632-88187dab
   - Description: Build error detected: app/foreman/page.tsx(245,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:389

386. **build_error** (critical)
   - ID: qi-build_error-1765185096647-8e45f8fa
   - Description: Build error detected: app/foreman/page.tsx(246,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:390

387. **build_error** (critical)
   - ID: qi-build_error-1765185096663-94712388
   - Description: Build error detected: app/foreman/page.tsx(247,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:391

388. **build_error** (critical)
   - ID: qi-build_error-1765185096678-973dda08
   - Description: Build error detected: app/foreman/page.tsx(247,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:392

389. **build_error** (critical)
   - ID: qi-build_error-1765185096692-0e2df0aa
   - Description: Build error detected: app/foreman/page.tsx(248,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:393

390. **build_error** (critical)
   - ID: qi-build_error-1765185096708-405a4673
   - Description: Build error detected: app/foreman/page.tsx(248,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:394

391. **build_error** (critical)
   - ID: qi-build_error-1765185096723-970c0b35
   - Description: Build error detected: app/foreman/page.tsx(249,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:395

392. **build_error** (critical)
   - ID: qi-build_error-1765185096738-aa49ffd5
   - Description: Build error detected: app/foreman/page.tsx(250,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:396

393. **build_error** (critical)
   - ID: qi-build_error-1765185096755-0e05623c
   - Description: Build error detected: app/foreman/page.tsx(251,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:397

394. **build_error** (critical)
   - ID: qi-build_error-1765185096770-78e04075
   - Description: Build error detected: app/foreman/page.tsx(251,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:398

395. **build_error** (critical)
   - ID: qi-build_error-1765185096785-922df847
   - Description: Build error detected: app/foreman/page.tsx(252,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:399

396. **build_error** (critical)
   - ID: qi-build_error-1765185096801-e54d2a77
   - Description: Build error detected: app/foreman/page.tsx(252,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:400

397. **build_error** (critical)
   - ID: qi-build_error-1765185096816-5bf4f360
   - Description: Build error detected: app/foreman/page.tsx(253,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:401

398. **build_error** (critical)
   - ID: qi-build_error-1765185096832-3b9614d2
   - Description: Build error detected: app/foreman/page.tsx(254,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:402

399. **build_error** (critical)
   - ID: qi-build_error-1765185096849-8902fa65
   - Description: Build error detected: app/foreman/page.tsx(255,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:403

400. **build_error** (critical)
   - ID: qi-build_error-1765185096864-8b87b562
   - Description: Build error detected: app/foreman/page.tsx(255,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:404

401. **build_error** (critical)
   - ID: qi-build_error-1765185096879-d9192980
   - Description: Build error detected: app/foreman/page.tsx(256,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:405

402. **build_error** (critical)
   - ID: qi-build_error-1765185096895-6c93da47
   - Description: Build error detected: app/foreman/page.tsx(256,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:406

403. **build_error** (critical)
   - ID: qi-build_error-1765185096910-82d66adc
   - Description: Build error detected: app/foreman/page.tsx(257,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:407

404. **build_error** (critical)
   - ID: qi-build_error-1765185096925-d688db95
   - Description: Build error detected: app/foreman/page.tsx(258,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:408

405. **build_error** (critical)
   - ID: qi-build_error-1765185096940-bc114b2a
   - Description: Build error detected: app/foreman/page.tsx(259,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:409

406. **build_error** (critical)
   - ID: qi-build_error-1765185096955-2c876cb2
   - Description: Build error detected: app/foreman/page.tsx(259,68): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:410

407. **build_error** (critical)
   - ID: qi-build_error-1765185096971-ea19ccad
   - Description: Build error detected: app/foreman/page.tsx(260,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:411

408. **build_error** (critical)
   - ID: qi-build_error-1765185096988-4827300e
   - Description: Build error detected: app/foreman/page.tsx(260,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:412

409. **build_error** (critical)
   - ID: qi-build_error-1765185097004-29dd05ec
   - Description: Build error detected: app/foreman/page.tsx(261,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:413

410. **build_error** (critical)
   - ID: qi-build_error-1765185097018-3c2f93f3
   - Description: Build error detected: app/foreman/page.tsx(262,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:414

411. **build_error** (critical)
   - ID: qi-build_error-1765185097034-63de7b90
   - Description: Build error detected: app/foreman/page.tsx(263,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:415

412. **build_error** (critical)
   - ID: qi-build_error-1765185097050-f447cd86
   - Description: Build error detected: app/foreman/page.tsx(266,30): error TS7006: Parameter 'message' implicitly has an 'any' type.
   - Source: build.log:416

413. **build_error** (critical)
   - ID: qi-build_error-1765185097065-4f2ca52e
   - Description: Build error detected: app/foreman/page.tsx(267,29): error TS2322: Type '{ key: any; message: any; }' is not assignable to type 'ChatBubbleProps'.
   - Source: build.log:417

414. **build_error** (critical)
   - ID: qi-build_error-1765185097083-b1d6cad9
   - Description: Build error detected: app/foreman/page.tsx(272,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:419

415. **build_error** (critical)
   - ID: qi-build_error-1765185097098-7b037ce6
   - Description: Build error detected: app/foreman/page.tsx(274,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:420

416. **build_error** (critical)
   - ID: qi-build_error-1765185097113-30bdc0fe
   - Description: Build error detected: app/foreman/page.tsx(278,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:421

417. **build_error** (critical)
   - ID: qi-build_error-1765185097129-e17d696b
   - Description: Build error detected: app/foreman/page.tsx(279,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:422

418. **build_error** (critical)
   - ID: qi-build_error-1765185097145-9a9385d8
   - Description: Build error detected: app/foreman/page.tsx(280,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:423

419. **build_error** (critical)
   - ID: qi-build_error-1765185097161-3e34deb9
   - Description: Build error detected: app/foreman/page.tsx(281,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:424

420. **build_error** (critical)
   - ID: qi-build_error-1765185097178-25f674a5
   - Description: Build error detected: app/foreman/page.tsx(282,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:425

421. **build_error** (critical)
   - ID: qi-build_error-1765185097193-ef3ea873
   - Description: Build error detected: app/foreman/page.tsx(282,103): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:426

422. **build_error** (critical)
   - ID: qi-build_error-1765185097208-802ee73a
   - Description: Build error detected: app/foreman/page.tsx(283,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:427

423. **build_error** (critical)
   - ID: qi-build_error-1765185097224-aeed5546
   - Description: Build error detected: app/foreman/page.tsx(283,138): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:428

424. **build_error** (critical)
   - ID: qi-build_error-1765185097239-fb636021
   - Description: Build error detected: app/foreman/page.tsx(284,25): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:429

425. **build_error** (critical)
   - ID: qi-build_error-1765185097255-3e55dcf8
   - Description: Build error detected: app/foreman/page.tsx(284,138): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:430

426. **build_error** (critical)
   - ID: qi-build_error-1765185097271-642e68a1
   - Description: Build error detected: app/foreman/page.tsx(285,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:431

427. **build_error** (critical)
   - ID: qi-build_error-1765185097286-6285d30e
   - Description: Build error detected: app/foreman/page.tsx(286,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:432

428. **build_error** (critical)
   - ID: qi-build_error-1765185097301-9b3f9d20
   - Description: Build error detected: app/foreman/page.tsx(286,85): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:433

429. **build_error** (critical)
   - ID: qi-build_error-1765185097317-4dbd4df2
   - Description: Build error detected: app/foreman/page.tsx(287,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:434

430. **build_error** (critical)
   - ID: qi-build_error-1765185097333-266e4e5b
   - Description: Build error detected: app/foreman/page.tsx(288,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:435

431. **build_error** (critical)
   - ID: qi-build_error-1765185097348-9994d7cc
   - Description: Build error detected: app/foreman/page.tsx(289,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:436

432. **build_error** (critical)
   - ID: qi-build_error-1765185097364-d9b7829e
   - Description: Build error detected: app/foreman/page.tsx(292,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:437

433. **build_error** (critical)
   - ID: qi-build_error-1765185097379-a491cb9f
   - Description: Build error detected: app/foreman/page.tsx(293,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:438

434. **build_error** (critical)
   - ID: qi-build_error-1765185097395-9250e5d2
   - Description: Build error detected: app/foreman/page.tsx(296,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:439

435. **build_error** (critical)
   - ID: qi-build_error-1765185097421-575a7044
   - Description: Build error detected: app/foreman/page.tsx(297,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:440

436. **build_error** (critical)
   - ID: qi-build_error-1765185097437-1ecc2357
   - Description: Build error detected: app/foreman/page.tsx(298,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:441

437. **build_error** (critical)
   - ID: qi-build_error-1765185097453-1c1ab18c
   - Description: Build error detected: app/foreman/page.tsx(301,30): error TS7006: Parameter 'e' implicitly has an 'any' type.
   - Source: build.log:442

438. **build_error** (critical)
   - ID: qi-build_error-1765185097470-504dbafc
   - Description: Build error detected: app/foreman/page.tsx(307,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:443

439. **build_error** (critical)
   - ID: qi-build_error-1765185097486-f5459461
   - Description: Build error detected: app/foreman/page.tsx(313,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:444

440. **build_error** (critical)
   - ID: qi-build_error-1765185097502-76d9460f
   - Description: Build error detected: app/foreman/page.tsx(314,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:445

441. **build_error** (critical)
   - ID: qi-build_error-1765185097519-7f04374d
   - Description: Build error detected: app/foreman/page.tsx(315,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:446

442. **build_error** (critical)
   - ID: qi-build_error-1765185097535-be2396c7
   - Description: Build error detected: app/foreman/page.tsx(317,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:447

443. **build_error** (critical)
   - ID: qi-build_error-1765185097550-854436b3
   - Description: Build error detected: app/foreman/page.tsx(318,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:448

444. **build_error** (critical)
   - ID: qi-build_error-1765185097566-1b428ca4
   - Description: Build error detected: app/foreman/page.tsx(319,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:449

445. **build_error** (critical)
   - ID: qi-build_error-1765185097581-3e64a7e0
   - Description: Build error detected: app/foreman/page.tsx(322,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:450

446. **build_error** (critical)
   - ID: qi-build_error-1765185097596-86454238
   - Description: Build error detected: app/foreman/page.tsx(323,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:451

447. **build_error** (critical)
   - ID: qi-build_error-1765185097613-6e65ea7b
   - Description: Build error detected: app/foreman/page.tsx(324,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:452

448. **build_error** (critical)
   - ID: qi-build_error-1765185097629-9bd82cba
   - Description: Build error detected: app/foreman/page.tsx(326,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:453

449. **build_error** (critical)
   - ID: qi-build_error-1765185097644-f9ace02b
   - Description: Build error detected: app/foreman/page.tsx(335,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:454

450. **build_error** (critical)
   - ID: qi-build_error-1765185097660-93e4421d
   - Description: Build error detected: app/foreman/page.tsx(336,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:455

451. **build_error** (critical)
   - ID: qi-build_error-1765185097675-440f9b02
   - Description: Build error detected: app/foreman/page.tsx(336,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:456

452. **build_error** (critical)
   - ID: qi-build_error-1765185097691-9485062d
   - Description: Build error detected: app/foreman/page.tsx(337,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:457

453. **build_error** (critical)
   - ID: qi-build_error-1765185097707-fe86d639
   - Description: Build error detected: app/foreman/page.tsx(339,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:458

454. **build_error** (critical)
   - ID: qi-build_error-1765185097723-b90dc13d
   - Description: Build error detected: app/foreman/page.tsx(340,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:459

455. **build_error** (critical)
   - ID: qi-build_error-1765185097739-f531e98d
   - Description: Build error detected: app/foreman/page.tsx(342,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:460

456. **build_error** (critical)
   - ID: qi-build_error-1765185097756-2ee159bd
   - Description: Build error detected: app/foreman/page.tsx(345,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:461

457. **build_error** (critical)
   - ID: qi-build_error-1765185097772-437715fc
   - Description: Build error detected: app/foreman/page.tsx(346,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:462

458. **build_error** (critical)
   - ID: qi-build_error-1765185097787-05e6a16d
   - Description: Build error detected: app/foreman/page.tsx(348,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:463

459. **build_error** (critical)
   - ID: qi-build_error-1765185097804-1fd2e285
   - Description: Build error detected: app/foreman/page.tsx(350,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:464

460. **build_error** (critical)
   - ID: qi-build_error-1765185097820-7259709b
   - Description: Build error detected: app/foreman/page.tsx(353,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:465

461. **build_error** (critical)
   - ID: qi-build_error-1765185097836-7c1fe027
   - Description: Build error detected: app/foreman/page.tsx(354,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:466

462. **build_error** (critical)
   - ID: qi-build_error-1765185097852-0daa1eab
   - Description: Build error detected: app/foreman/page.tsx(356,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:467

463. **build_error** (critical)
   - ID: qi-build_error-1765185097868-1ebeea01
   - Description: Build error detected: app/foreman/page.tsx(357,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:468

464. **build_error** (critical)
   - ID: qi-build_error-1765185097883-5649276d
   - Description: Build error detected: app/foreman/page.tsx(358,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:469

465. **build_error** (critical)
   - ID: qi-build_error-1765185097901-e2e40f98
   - Description: Build error detected: app/foreman/page.tsx(360,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:470

466. **build_error** (critical)
   - ID: qi-build_error-1765185097916-67120280
   - Description: Build error detected: app/foreman/page.tsx(361,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:471

467. **build_error** (critical)
   - ID: qi-build_error-1765185097931-d016e8b8
   - Description: Build error detected: app/foreman/page.tsx(363,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:472

468. **build_error** (critical)
   - ID: qi-build_error-1765185097948-79296065
   - Description: Build error detected: app/foreman/page.tsx(364,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:473

469. **build_error** (critical)
   - ID: qi-build_error-1765185097963-cf1136c3
   - Description: Build error detected: app/foreman/page.tsx(366,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:474

470. **build_error** (critical)
   - ID: qi-build_error-1765185097981-86aca7fc
   - Description: Build error detected: app/foreman/page.tsx(367,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:475

471. **build_error** (critical)
   - ID: qi-build_error-1765185097999-8d352399
   - Description: Build error detected: app/foreman/page.tsx(368,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:476

472. **build_error** (critical)
   - ID: qi-build_error-1765185098015-9df832d8
   - Description: Build error detected: app/foreman/page.tsx(369,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:477

473. **build_error** (critical)
   - ID: qi-build_error-1765185098031-a74b6954
   - Description: Build error detected: app/foreman/page.tsx(370,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:478

474. **build_error** (critical)
   - ID: qi-build_error-1765185098048-c976eb33
   - Description: Build error detected: app/foreman/page.tsx(371,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:479

475. **build_error** (critical)
   - ID: qi-build_error-1765185098064-578ab23c
   - Description: Build error detected: app/foreman/page.tsx(374,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:480

476. **build_error** (critical)
   - ID: qi-build_error-1765185098081-e2df12c3
   - Description: Build error detected: app/foreman/page.tsx(379,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:481

477. **build_error** (critical)
   - ID: qi-build_error-1765185098098-5be98e1e
   - Description: Build error detected: app/foreman/page.tsx(380,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:482

478. **build_error** (critical)
   - ID: qi-build_error-1765185098114-24256763
   - Description: Build error detected: app/layout.tsx(1,31): error TS2307: Cannot find module 'next' or its corresponding type declarations.
   - Source: build.log:483

479. **build_error** (critical)
   - ID: qi-build_error-1765185098129-49d46c8e
   - Description: Build error detected: app/layout.tsx(12,13): error TS2503: Cannot find namespace 'React'.
   - Source: build.log:484

480. **build_error** (critical)
   - ID: qi-build_error-1765185098146-be2c7889
   - Description: Build error detected: app/layout.tsx(15,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:485

481. **build_error** (critical)
   - ID: qi-build_error-1765185098166-a260d6e7
   - Description: Build error detected: app/layout.tsx(16,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:486

482. **build_error** (critical)
   - ID: qi-build_error-1765185098183-fc9f337b
   - Description: Build error detected: app/layout.tsx(16,23): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:487

483. **build_error** (critical)
   - ID: qi-build_error-1765185098199-45efa115
   - Description: Build error detected: app/layout.tsx(17,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:488

484. **build_error** (critical)
   - ID: qi-build_error-1765185098214-e4e86fd6
   - Description: Build error detected: app/page.tsx(5,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:489

485. **build_error** (critical)
   - ID: qi-build_error-1765185098230-0fb915e9
   - Description: Build error detected: app/page.tsx(6,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:490

486. **build_error** (critical)
   - ID: qi-build_error-1765185098247-27c0cd13
   - Description: Build error detected: app/page.tsx(7,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:491

487. **build_error** (critical)
   - ID: qi-build_error-1765185098263-0ea0e4e8
   - Description: Build error detected: app/page.tsx(7,69): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:492

488. **build_error** (critical)
   - ID: qi-build_error-1765185098279-a65692b0
   - Description: Build error detected: app/page.tsx(8,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:493

489. **build_error** (critical)
   - ID: qi-build_error-1765185098296-6eaa0699
   - Description: Build error detected: app/page.tsx(10,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:494

490. **build_error** (critical)
   - ID: qi-build_error-1765185098312-320bbb7e
   - Description: Build error detected: app/page.tsx(12,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:495

491. **build_error** (critical)
   - ID: qi-build_error-1765185098327-558d4bf1
   - Description: Build error detected: app/page.tsx(13,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:496

492. **build_error** (critical)
   - ID: qi-build_error-1765185098345-4899d922
   - Description: Build error detected: components/ForemanStatus.tsx(8,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:497

493. **build_error** (critical)
   - ID: qi-build_error-1765185098359-339a4fa9
   - Description: Build error detected: components/ForemanStatus.tsx(9,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:498

494. **build_error** (critical)
   - ID: qi-build_error-1765185098375-59c1d911
   - Description: Build error detected: components/ForemanStatus.tsx(9,65): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:499

495. **build_error** (critical)
   - ID: qi-build_error-1765185098393-7786b5de
   - Description: Build error detected: components/ForemanStatus.tsx(10,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:500

496. **build_error** (critical)
   - ID: qi-build_error-1765185098409-611098d0
   - Description: Build error detected: components/ForemanStatus.tsx(11,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:501

497. **build_error** (critical)
   - ID: qi-build_error-1765185098425-d477d652
   - Description: Build error detected: components/ForemanStatus.tsx(12,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:502

498. **build_error** (critical)
   - ID: qi-build_error-1765185098442-727d550f
   - Description: Build error detected: components/ForemanStatus.tsx(12,50): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:503

499. **build_error** (critical)
   - ID: qi-build_error-1765185098459-013c30ac
   - Description: Build error detected: components/ForemanStatus.tsx(13,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:504

500. **build_error** (critical)
   - ID: qi-build_error-1765185098474-236d0b6b
   - Description: Build error detected: components/ForemanStatus.tsx(13,62): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:505

501. **build_error** (critical)
   - ID: qi-build_error-1765185098491-85dcc2bf
   - Description: Build error detected: components/ForemanStatus.tsx(14,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:506

502. **build_error** (critical)
   - ID: qi-build_error-1765185098507-e8155050
   - Description: Build error detected: components/ForemanStatus.tsx(15,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:507

503. **build_error** (critical)
   - ID: qi-build_error-1765185098522-0e2f6736
   - Description: Build error detected: components/ForemanStatus.tsx(16,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:508

504. **build_error** (critical)
   - ID: qi-build_error-1765185098539-871a7d19
   - Description: Build error detected: components/ForemanStatus.tsx(16,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:509

505. **build_error** (critical)
   - ID: qi-build_error-1765185098555-b4f816d1
   - Description: Build error detected: components/ForemanStatus.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:510

506. **build_error** (critical)
   - ID: qi-build_error-1765185098571-f4ced2e3
   - Description: Build error detected: components/ForemanStatus.tsx(17,59): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:511

507. **build_error** (critical)
   - ID: qi-build_error-1765185098588-77cd11d1
   - Description: Build error detected: components/ForemanStatus.tsx(18,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:512

508. **build_error** (critical)
   - ID: qi-build_error-1765185098604-095142c8
   - Description: Build error detected: components/ForemanStatus.tsx(19,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:513

509. **build_error** (critical)
   - ID: qi-build_error-1765185098621-46fc916b
   - Description: Build error detected: components/ForemanStatus.tsx(20,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:514

510. **build_error** (critical)
   - ID: qi-build_error-1765185098638-1afdc82c
   - Description: Build error detected: components/ForemanStatus.tsx(20,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:515

511. **build_error** (critical)
   - ID: qi-build_error-1765185098655-a07b49b4
   - Description: Build error detected: components/ForemanStatus.tsx(21,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:516

512. **build_error** (critical)
   - ID: qi-build_error-1765185098671-bfecc8d2
   - Description: Build error detected: components/ForemanStatus.tsx(21,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:517

513. **build_error** (critical)
   - ID: qi-build_error-1765185098688-d91df9e8
   - Description: Build error detected: components/ForemanStatus.tsx(22,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:518

514. **build_error** (critical)
   - ID: qi-build_error-1765185098704-d6d334a2
   - Description: Build error detected: components/ForemanStatus.tsx(23,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:519

515. **build_error** (critical)
   - ID: qi-build_error-1765185098719-235eb58a
   - Description: Build error detected: components/ForemanStatus.tsx(24,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:520

516. **build_error** (critical)
   - ID: qi-build_error-1765185098748-bd94688e
   - Description: Build error detected: components/LayoutShell.tsx(6,27): error TS2307: Cannot find module 'react' or its corresponding type declarations.
   - Source: build.log:521

517. **build_error** (critical)
   - ID: qi-build_error-1765185098765-670518c8
   - Description: Build error detected: components/LayoutShell.tsx(14,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:522

518. **build_error** (critical)
   - ID: qi-build_error-1765185098781-a7999b4a
   - Description: Build error detected: components/LayoutShell.tsx(15,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:523

519. **build_error** (critical)
   - ID: qi-build_error-1765185098799-8f06946b
   - Description: Build error detected: components/LayoutShell.tsx(16,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:524

520. **build_error** (critical)
   - ID: qi-build_error-1765185098820-1ac696b2
   - Description: Build error detected: components/LayoutShell.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:525

521. **build_error** (critical)
   - ID: qi-build_error-1765185098839-d27905e5
   - Description: Build error detected: components/LayoutShell.tsx(18,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:526

522. **build_error** (critical)
   - ID: qi-build_error-1765185098855-c79d279d
   - Description: Build error detected: components/LayoutShell.tsx(20,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:527

523. **build_error** (critical)
   - ID: qi-build_error-1765185098874-92b882d0
   - Description: Build error detected: components/LayoutShell.tsx(21,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:528

524. **build_error** (critical)
   - ID: qi-build_error-1765185098890-d43b2118
   - Description: Build error detected: components/LayoutShell.tsx(22,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:529

525. **build_error** (critical)
   - ID: qi-build_error-1765185098908-a8cc5bd0
   - Description: Build error detected: components/LayoutShell.tsx(24,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:530

526. **build_error** (critical)
   - ID: qi-build_error-1765185098924-6dd46d5e
   - Description: Build error detected: components/LayoutShell.tsx(25,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:531

527. **build_error** (critical)
   - ID: qi-build_error-1765185098942-fe16acc5
   - Description: Build error detected: components/LayoutShell.tsx(27,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:532

528. **build_error** (critical)
   - ID: qi-build_error-1765185098959-6916afc7
   - Description: Build error detected: components/LayoutShell.tsx(28,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:533

529. **build_error** (critical)
   - ID: qi-build_error-1765185098978-87d644a7
   - Description: Build error detected: components/LayoutShell.tsx(29,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:534

530. **build_error** (critical)
   - ID: qi-build_error-1765185099001-50c12dc5
   - Description: Build error detected: components/LayoutShell.tsx(30,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:535

531. **build_error** (critical)
   - ID: qi-build_error-1765185099021-ebedf860
   - Description: Build error detected: components/LayoutShell.tsx(31,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:536

532. **build_error** (critical)
   - ID: qi-build_error-1765185099037-0193a950
   - Description: Build error detected: components/LayoutShell.tsx(32,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:537

533. **build_error** (critical)
   - ID: qi-build_error-1765185099056-05354206
   - Description: Build error detected: components/LayoutShell.tsx(34,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:538

534. **build_error** (critical)
   - ID: qi-build_error-1765185099073-4d667922
   - Description: Build error detected: components/LayoutShell.tsx(35,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:539

535. **build_error** (critical)
   - ID: qi-build_error-1765185099097-7d693ac7
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(30,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:540

536. **build_error** (critical)
   - ID: qi-build_error-1765185099113-357e5867
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(31,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:541

537. **build_error** (critical)
   - ID: qi-build_error-1765185099132-fd4e8fb0
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(31,88): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:542

538. **build_error** (critical)
   - ID: qi-build_error-1765185099149-a35b8c2b
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(32,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:543

539. **build_error** (critical)
   - ID: qi-build_error-1765185099172-73f3387e
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(39,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:544

540. **build_error** (critical)
   - ID: qi-build_error-1765185099187-2f9dc493
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(41,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:545

541. **build_error** (critical)
   - ID: qi-build_error-1765185099208-e01539f1
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(52,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:546

542. **build_error** (critical)
   - ID: qi-build_error-1765185099224-212e625f
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(52,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:547

543. **build_error** (critical)
   - ID: qi-build_error-1765185099249-8c531fff
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(53,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:548

544. **build_error** (critical)
   - ID: qi-build_error-1765185099265-72adb544
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(56,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:549

545. **build_error** (critical)
   - ID: qi-build_error-1765185099283-b6e53898
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(57,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:550

546. **build_error** (critical)
   - ID: qi-build_error-1765185099300-6a2a67ea
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(69,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:551

547. **build_error** (critical)
   - ID: qi-build_error-1765185099317-cb1bccee
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(71,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:552

548. **build_error** (critical)
   - ID: qi-build_error-1765185099334-02aa65f6
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(71,81): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:553

549. **build_error** (critical)
   - ID: qi-build_error-1765185099352-30c845fb
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(73,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:554

550. **build_error** (critical)
   - ID: qi-build_error-1765185099368-5e82432b
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(77,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:555

551. **build_error** (critical)
   - ID: qi-build_error-1765185099386-44888daa
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(77,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:556

552. **build_error** (critical)
   - ID: qi-build_error-1765185099402-dce924b2
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(80,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:557

553. **build_error** (critical)
   - ID: qi-build_error-1765185099420-ba4a1dd3
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(80,56): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:558

554. **build_error** (critical)
   - ID: qi-build_error-1765185099440-53d6c60c
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(82,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:559

555. **build_error** (critical)
   - ID: qi-build_error-1765185099458-f30b221e
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(85,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:560

556. **build_error** (critical)
   - ID: qi-build_error-1765185099475-6386e5c0
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(89,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:561

557. **build_error** (critical)
   - ID: qi-build_error-1765185099493-ef597d57
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(90,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:562

558. **build_error** (critical)
   - ID: qi-build_error-1765185099510-2be8b515
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(92,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:563

559. **build_error** (critical)
   - ID: qi-build_error-1765185099528-caca2135
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(93,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:564

560. **build_error** (critical)
   - ID: qi-build_error-1765185099544-d8ca13df
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(93,63): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:565

561. **build_error** (critical)
   - ID: qi-build_error-1765185099563-34135294
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(94,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:566

562. **build_error** (critical)
   - ID: qi-build_error-1765185099580-ca86fda5
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(96,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:567

563. **build_error** (critical)
   - ID: qi-build_error-1765185099598-24b13379
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(97,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:568

564. **build_error** (critical)
   - ID: qi-build_error-1765185099623-10fad0eb
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(100,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:569

565. **build_error** (critical)
   - ID: qi-build_error-1765185099641-9febd07e
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(101,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:570

566. **build_error** (critical)
   - ID: qi-build_error-1765185099658-752ebf7e
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(101,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:571

567. **build_error** (critical)
   - ID: qi-build_error-1765185099677-6a36026c
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(102,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:572

568. **build_error** (critical)
   - ID: qi-build_error-1765185099696-37e07b42
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(102,91): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:573

569. **build_error** (critical)
   - ID: qi-build_error-1765185099717-441bf073
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:574

570. **build_error** (critical)
   - ID: qi-build_error-1765185099733-388213ac
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(106,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:575

571. **build_error** (critical)
   - ID: qi-build_error-1765185099751-87dd9d3c
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(107,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:576

572. **build_error** (critical)
   - ID: qi-build_error-1765185099769-789e2d1a
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(107,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:577

573. **build_error** (critical)
   - ID: qi-build_error-1765185099790-06f462c4
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(108,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:578

574. **build_error** (critical)
   - ID: qi-build_error-1765185099807-65412cc7
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(115,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:579

575. **build_error** (critical)
   - ID: qi-build_error-1765185099826-ea5d918f
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(116,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:580

576. **build_error** (critical)
   - ID: qi-build_error-1765185099843-9d184b7c
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(118,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:581

577. **build_error** (critical)
   - ID: qi-build_error-1765185099861-354ac5c5
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(119,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:582

578. **build_error** (critical)
   - ID: qi-build_error-1765185099877-89bcfc1e
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(124,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:583

579. **build_error** (critical)
   - ID: qi-build_error-1765185099896-cdb7d104
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(125,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:584

580. **build_error** (critical)
   - ID: qi-build_error-1765185099913-7466f42b
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(126,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:585

581. **build_error** (critical)
   - ID: qi-build_error-1765185099931-41dd9e75
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(126,55): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:586

582. **build_error** (critical)
   - ID: qi-build_error-1765185099947-9d09759c
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(127,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:587

583. **build_error** (critical)
   - ID: qi-build_error-1765185099966-a298fb6b
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(127,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:588

584. **build_error** (critical)
   - ID: qi-build_error-1765185099983-c8548f4c
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(128,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:589

585. **build_error** (critical)
   - ID: qi-build_error-1765185100002-7dc472f9
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(129,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:590

586. **build_error** (critical)
   - ID: qi-build_error-1765185100019-b4c91f1d
   - Description: Build error detected: components/foreman/BuildTimeline.tsx(131,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:591

587. **build_error** (critical)
   - ID: qi-build_error-1765185100038-2716cdfd
   - Description: Build error detected: components/foreman/ChatBubble.tsx(8,27): error TS2307: Cannot find module 'react-markdown' or its corresponding type declarations.
   - Source: build.log:592

588. **build_error** (critical)
   - ID: qi-build_error-1765185100054-1f9dd636
   - Description: Build error detected: components/foreman/ChatBubble.tsx(9,23): error TS2307: Cannot find module 'remark-gfm' or its corresponding type declarations.
   - Source: build.log:593

589. **build_error** (critical)
   - ID: qi-build_error-1765185100072-925c034c
   - Description: Build error detected: components/foreman/ChatBubble.tsx(22,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:594

590. **build_error** (critical)
   - ID: qi-build_error-1765185100089-bef8bc89
   - Description: Build error detected: components/foreman/ChatBubble.tsx(23,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:595

591. **build_error** (critical)
   - ID: qi-build_error-1765185100107-58be0641
   - Description: Build error detected: components/foreman/ChatBubble.tsx(31,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:596

592. **build_error** (critical)
   - ID: qi-build_error-1765185100124-4eeb4392
   - Description: Build error detected: components/foreman/ChatBubble.tsx(34,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:597

593. **build_error** (critical)
   - ID: qi-build_error-1765185100143-65b00fa5
   - Description: Build error detected: components/foreman/ChatBubble.tsx(34,43): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:598

594. **build_error** (critical)
   - ID: qi-build_error-1765185100160-6ba5b8d4
   - Description: Build error detected: components/foreman/ChatBubble.tsx(35,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:599

595. **build_error** (critical)
   - ID: qi-build_error-1765185100178-f76342a3
   - Description: Build error detected: components/foreman/ChatBubble.tsx(35,58): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:600

596. **build_error** (critical)
   - ID: qi-build_error-1765185100195-e5d0ad61
   - Description: Build error detected: components/foreman/ChatBubble.tsx(36,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:601

597. **build_error** (critical)
   - ID: qi-build_error-1765185100213-683cf788
   - Description: Build error detected: components/foreman/ChatBubble.tsx(38,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:602

598. **build_error** (critical)
   - ID: qi-build_error-1765185100237-5c23530c
   - Description: Build error detected: components/foreman/ChatBubble.tsx(39,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:603

599. **build_error** (critical)
   - ID: qi-build_error-1765185100256-d3929d3c
   - Description: Build error detected: components/foreman/ChatBubble.tsx(42,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:604

600. **build_error** (critical)
   - ID: qi-build_error-1765185100273-0452e192
   - Description: Build error detected: components/foreman/ChatBubble.tsx(43,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:605

601. **build_error** (critical)
   - ID: qi-build_error-1765185100292-9389048b
   - Description: Build error detected: components/foreman/ChatBubble.tsx(51,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:606

602. **build_error** (critical)
   - ID: qi-build_error-1765185100309-26388b07
   - Description: Build error detected: components/foreman/ChatBubble.tsx(52,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:607

603. **build_error** (critical)
   - ID: qi-build_error-1765185100328-cbee3f1c
   - Description: Build error detected: components/foreman/ChatBubble.tsx(56,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:608

604. **build_error** (critical)
   - ID: qi-build_error-1765185100345-2c09cc91
   - Description: Build error detected: components/foreman/ChatBubble.tsx(58,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:609

605. **build_error** (critical)
   - ID: qi-build_error-1765185100364-ed0783e5
   - Description: Build error detected: components/foreman/ChatBubble.tsx(64,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:610

606. **build_error** (critical)
   - ID: qi-build_error-1765185100380-ac22a627
   - Description: Build error detected: components/foreman/ChatBubble.tsx(67,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:611

607. **build_error** (critical)
   - ID: qi-build_error-1765185100400-32c996f5
   - Description: Build error detected: components/foreman/ChatBubble.tsx(73,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:612

608. **build_error** (critical)
   - ID: qi-build_error-1765185100417-943adaf6
   - Description: Build error detected: components/foreman/ChatBubble.tsx(76,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:613

609. **build_error** (critical)
   - ID: qi-build_error-1765185100436-fdd45176
   - Description: Build error detected: components/foreman/ChatBubble.tsx(82,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:614

610. **build_error** (critical)
   - ID: qi-build_error-1765185100452-e4baf00e
   - Description: Build error detected: components/foreman/ChatBubble.tsx(85,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:615

611. **build_error** (critical)
   - ID: qi-build_error-1765185100472-4d0ca605
   - Description: Build error detected: components/foreman/ChatBubble.tsx(91,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:616

612. **build_error** (critical)
   - ID: qi-build_error-1765185100488-81af1e18
   - Description: Build error detected: components/foreman/ChatBubble.tsx(94,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:617

613. **build_error** (critical)
   - ID: qi-build_error-1765185100507-f6539ff6
   - Description: Build error detected: components/foreman/ChatBubble.tsx(103,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:618

614. **build_error** (critical)
   - ID: qi-build_error-1765185100523-d26100a7
   - Description: Build error detected: components/foreman/ChatBubble.tsx(105,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:619

615. **build_error** (critical)
   - ID: qi-build_error-1765185100542-74a2cd3c
   - Description: Build error detected: components/foreman/ChatBubble.tsx(110,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:620

616. **build_error** (critical)
   - ID: qi-build_error-1765185100559-8c3f0108
   - Description: Build error detected: components/foreman/ChatBubble.tsx(113,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:621

617. **build_error** (critical)
   - ID: qi-build_error-1765185100577-4e2b525d
   - Description: Build error detected: components/foreman/ChatBubble.tsx(113,72): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:622

618. **build_error** (critical)
   - ID: qi-build_error-1765185100594-8a2a048a
   - Description: Build error detected: components/foreman/ChatBubble.tsx(114,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:623

619. **build_error** (critical)
   - ID: qi-build_error-1765185100614-da7160d1
   - Description: Build error detected: components/foreman/ChatBubble.tsx(116,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:624

620. **build_error** (critical)
   - ID: qi-build_error-1765185100630-f30ea517
   - Description: Build error detected: components/foreman/ChatBubble.tsx(124,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:625

621. **build_error** (critical)
   - ID: qi-build_error-1765185100651-52ff4114
   - Description: Build error detected: components/foreman/ChatBubble.tsx(124,61): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:626

622. **build_error** (critical)
   - ID: qi-build_error-1765185100668-f36184d5
   - Description: Build error detected: components/foreman/ChatBubble.tsx(126,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:627

623. **build_error** (critical)
   - ID: qi-build_error-1765185100687-baec6d22
   - Description: Build error detected: components/foreman/ChatBubble.tsx(128,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:628

624. **build_error** (critical)
   - ID: qi-build_error-1765185100705-e2ebb573
   - Description: Build error detected: components/foreman/ChatBubble.tsx(131,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:629

625. **build_error** (critical)
   - ID: qi-build_error-1765185100724-fa8a7dad
   - Description: Build error detected: components/foreman/ChatBubble.tsx(133,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:630

626. **build_error** (critical)
   - ID: qi-build_error-1765185100741-682123df
   - Description: Build error detected: components/foreman/ChatBubble.tsx(135,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:631

627. **build_error** (critical)
   - ID: qi-build_error-1765185100760-b45ec869
   - Description: Build error detected: components/foreman/ChatBubble.tsx(137,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:632

628. **build_error** (critical)
   - ID: qi-build_error-1765185100778-5961bd4d
   - Description: Build error detected: components/foreman/ChatBubble.tsx(138,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:633

629. **build_error** (critical)
   - ID: qi-build_error-1765185100797-cf18586b
   - Description: Build error detected: components/foreman/ChatBubble.tsx(140,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:634

630. **build_error** (critical)
   - ID: qi-build_error-1765185100814-17ee012d
   - Description: Build error detected: components/foreman/ChatBubble.tsx(141,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:635

631. **build_error** (critical)
   - ID: qi-build_error-1765185100833-7bb101ff
   - Description: Build error detected: components/foreman/Header.tsx(32,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:636

632. **build_error** (critical)
   - ID: qi-build_error-1765185100850-f4af6e3a
   - Description: Build error detected: components/foreman/Header.tsx(33,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:637

633. **build_error** (critical)
   - ID: qi-build_error-1765185100869-4ca25ed8
   - Description: Build error detected: components/foreman/Header.tsx(34,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:638

634. **build_error** (critical)
   - ID: qi-build_error-1765185100886-e60a4274
   - Description: Build error detected: components/foreman/Header.tsx(36,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:639

635. **build_error** (critical)
   - ID: qi-build_error-1765185100904-c641e054
   - Description: Build error detected: components/foreman/Header.tsx(37,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:640

636. **build_error** (critical)
   - ID: qi-build_error-1765185100921-bf5ee967
   - Description: Build error detected: components/foreman/Header.tsx(37,42): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:641

637. **build_error** (critical)
   - ID: qi-build_error-1765185100940-e097bd0a
   - Description: Build error detected: components/foreman/Header.tsx(38,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:642

638. **build_error** (critical)
   - ID: qi-build_error-1765185100957-248e6f09
   - Description: Build error detected: components/foreman/Header.tsx(40,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:643

639. **build_error** (critical)
   - ID: qi-build_error-1765185100977-340b8735
   - Description: Build error detected: components/foreman/Header.tsx(41,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:644

640. **build_error** (critical)
   - ID: qi-build_error-1765185100995-b11d5c40
   - Description: Build error detected: components/foreman/Header.tsx(43,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:645

641. **build_error** (critical)
   - ID: qi-build_error-1765185101015-6f3c9ce4
   - Description: Build error detected: components/foreman/Header.tsx(44,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:646

642. **build_error** (critical)
   - ID: qi-build_error-1765185101033-d0c8f9e7
   - Description: Build error detected: components/foreman/Header.tsx(46,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:647

643. **build_error** (critical)
   - ID: qi-build_error-1765185101053-a6d5eedc
   - Description: Build error detected: components/foreman/Header.tsx(47,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:648

644. **build_error** (critical)
   - ID: qi-build_error-1765185101071-0613f250
   - Description: Build error detected: components/foreman/Header.tsx(47,81): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:649

645. **build_error** (critical)
   - ID: qi-build_error-1765185101091-1dfffc45
   - Description: Build error detected: components/foreman/Header.tsx(48,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:650

646. **build_error** (critical)
   - ID: qi-build_error-1765185101108-8bd41ed1
   - Description: Build error detected: components/foreman/Header.tsx(48,79): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:651

647. **build_error** (critical)
   - ID: qi-build_error-1765185101128-97b75616
   - Description: Build error detected: components/foreman/Header.tsx(49,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:652

648. **build_error** (critical)
   - ID: qi-build_error-1765185101146-81866cc8
   - Description: Build error detected: components/foreman/Header.tsx(53,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:653

649. **build_error** (critical)
   - ID: qi-build_error-1765185101166-9e238061
   - Description: Build error detected: components/foreman/Header.tsx(53,52): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:654

650. **build_error** (critical)
   - ID: qi-build_error-1765185101182-3b3598b6
   - Description: Build error detected: components/foreman/Header.tsx(54,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:655

651. **build_error** (critical)
   - ID: qi-build_error-1765185101202-1cbedce3
   - Description: Build error detected: components/foreman/Header.tsx(56,19): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:656

652. **build_error** (critical)
   - ID: qi-build_error-1765185101220-5db729f4
   - Description: Build error detected: components/foreman/Header.tsx(59,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:657

653. **build_error** (critical)
   - ID: qi-build_error-1765185101239-87c77760
   - Description: Build error detected: components/foreman/Header.tsx(60,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:658

654. **build_error** (critical)
   - ID: qi-build_error-1765185101256-0d52d022
   - Description: Build error detected: components/foreman/Header.tsx(61,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:659

655. **build_error** (critical)
   - ID: qi-build_error-1765185101276-f9ae9c39
   - Description: Build error detected: components/foreman/Header.tsx(65,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:660

656. **build_error** (critical)
   - ID: qi-build_error-1765185101293-7af6742f
   - Description: Build error detected: components/foreman/Header.tsx(70,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:661

657. **build_error** (critical)
   - ID: qi-build_error-1765185101313-dc1d1440
   - Description: Build error detected: components/foreman/Header.tsx(70,21): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:662

658. **build_error** (critical)
   - ID: qi-build_error-1765185101330-caae090c
   - Description: Build error detected: components/foreman/Header.tsx(71,13): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:663

659. **build_error** (critical)
   - ID: qi-build_error-1765185101349-43fcdc94
   - Description: Build error detected: components/foreman/Header.tsx(71,34): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:664

660. **build_error** (critical)
   - ID: qi-build_error-1765185101366-1e98f62b
   - Description: Build error detected: components/foreman/Header.tsx(72,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:665

661. **build_error** (critical)
   - ID: qi-build_error-1765185101386-0d5e70c2
   - Description: Build error detected: components/foreman/Header.tsx(74,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:666

662. **build_error** (critical)
   - ID: qi-build_error-1765185101404-ba7fc876
   - Description: Build error detected: components/foreman/Header.tsx(75,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:667

663. **build_error** (critical)
   - ID: qi-build_error-1765185101423-4a9238c9
   - Description: Build error detected: components/foreman/Sidebar.tsx(8,26): error TS2307: Cannot find module 'react' or its corresponding type declarations.
   - Source: build.log:668

664. **build_error** (critical)
   - ID: qi-build_error-1765185101440-02541e68
   - Description: Build error detected: components/foreman/Sidebar.tsx(32,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:669

665. **build_error** (critical)
   - ID: qi-build_error-1765185101458-b345fcfd
   - Description: Build error detected: components/foreman/Sidebar.tsx(34,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:670

666. **build_error** (critical)
   - ID: qi-build_error-1765185101475-922c5505
   - Description: Build error detected: components/foreman/Sidebar.tsx(35,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:671

667. **build_error** (critical)
   - ID: qi-build_error-1765185101493-d6ab16b9
   - Description: Build error detected: components/foreman/Sidebar.tsx(39,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:672

668. **build_error** (critical)
   - ID: qi-build_error-1765185101511-f5e81132
   - Description: Build error detected: components/foreman/Sidebar.tsx(39,54): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:673

669. **build_error** (critical)
   - ID: qi-build_error-1765185101531-880ea010
   - Description: Build error detected: components/foreman/Sidebar.tsx(40,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:674

670. **build_error** (critical)
   - ID: qi-build_error-1765185101549-3651aa34
   - Description: Build error detected: components/foreman/Sidebar.tsx(40,67): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:675

671. **build_error** (critical)
   - ID: qi-build_error-1765185101568-8ff7f8f9
   - Description: Build error detected: components/foreman/Sidebar.tsx(52,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:676

672. **build_error** (critical)
   - ID: qi-build_error-1765185101585-ddfc8755
   - Description: Build error detected: components/foreman/Sidebar.tsx(59,17): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:677

673. **build_error** (critical)
   - ID: qi-build_error-1765185101604-3fa3389e
   - Description: Build error detected: components/foreman/Sidebar.tsx(64,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:678

674. **build_error** (critical)
   - ID: qi-build_error-1765185101621-34b1c1db
   - Description: Build error detected: components/foreman/Sidebar.tsx(70,15): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:679

675. **build_error** (critical)
   - ID: qi-build_error-1765185101641-f5cc4e96
   - Description: Build error detected: components/foreman/Sidebar.tsx(73,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:680

676. **build_error** (critical)
   - ID: qi-build_error-1765185101658-6928fbd4
   - Description: Build error detected: components/foreman/Sidebar.tsx(74,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:681

677. **build_error** (critical)
   - ID: qi-build_error-1765185101678-293f41ca
   - Description: Build error detected: components/foreman/Sidebar.tsx(77,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:682

678. **build_error** (critical)
   - ID: qi-build_error-1765185101696-75edc092
   - Description: Build error detected: components/foreman/Sidebar.tsx(78,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:683

679. **build_error** (critical)
   - ID: qi-build_error-1765185101716-776ce6a1
   - Description: Build error detected: components/foreman/Sidebar.tsx(84,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:684

680. **build_error** (critical)
   - ID: qi-build_error-1765185101734-a43083e2
   - Description: Build error detected: components/foreman/Sidebar.tsx(84,39): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:685

681. **build_error** (critical)
   - ID: qi-build_error-1765185101754-619a7d98
   - Description: Build error detected: components/foreman/Sidebar.tsx(85,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:686

682. **build_error** (critical)
   - ID: qi-build_error-1765185101772-5c898a69
   - Description: Build error detected: components/foreman/Sidebar.tsx(85,66): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:687

683. **build_error** (critical)
   - ID: qi-build_error-1765185101793-644b80f3
   - Description: Build error detected: components/foreman/Sidebar.tsx(86,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:688

684. **build_error** (critical)
   - ID: qi-build_error-1765185101811-7015b484
   - Description: Build error detected: components/foreman/Sidebar.tsx(87,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:689

685. **build_error** (critical)
   - ID: qi-build_error-1765185101830-b3938fe2
   - Description: Build error detected: components/foreman/Sidebar.tsx(88,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:690

686. **build_error** (critical)
   - ID: qi-build_error-1765185101849-d0af25a8
   - Description: Build error detected: components/foreman/StatusEvent.tsx(39,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:691

687. **build_error** (critical)
   - ID: qi-build_error-1765185101868-927abe50
   - Description: Build error detected: components/foreman/StatusEvent.tsx(42,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:692

688. **build_error** (critical)
   - ID: qi-build_error-1765185101886-716895ec
   - Description: Build error detected: components/foreman/StatusEvent.tsx(42,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:693

689. **build_error** (critical)
   - ID: qi-build_error-1765185101906-fea6596e
   - Description: Build error detected: components/foreman/StatusEvent.tsx(43,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:694

690. **build_error** (critical)
   - ID: qi-build_error-1765185101925-a7e4ad8f
   - Description: Build error detected: components/foreman/StatusEvent.tsx(44,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:695

691. **build_error** (critical)
   - ID: qi-build_error-1765185101945-75c60c1c
   - Description: Build error detected: components/foreman/StatusEvent.tsx(44,57): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:696

692. **build_error** (critical)
   - ID: qi-build_error-1765185101962-195f795f
   - Description: Build error detected: components/foreman/StatusEvent.tsx(46,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:697

693. **build_error** (critical)
   - ID: qi-build_error-1765185101983-99403fa5
   - Description: Build error detected: components/foreman/StatusEvent.tsx(48,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:698

694. **build_error** (critical)
   - ID: qi-build_error-1765185102001-8fd1462c
   - Description: Build error detected: components/foreman/StatusEvent.tsx(50,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:699

695. **build_error** (critical)
   - ID: qi-build_error-1765185102022-98ab80af
   - Description: Build error detected: components/foreman/StatusEvent.tsx(51,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:700

696. **build_error** (critical)
   - ID: qi-build_error-1765185102040-8f1a4dd2
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(8,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:701

697. **build_error** (critical)
   - ID: qi-build_error-1765185102060-31f7d935
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(9,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:702

698. **build_error** (critical)
   - ID: qi-build_error-1765185102079-30fb95aa
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(10,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:703

699. **build_error** (critical)
   - ID: qi-build_error-1765185102099-e701033f
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(11,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:704

700. **build_error** (critical)
   - ID: qi-build_error-1765185102118-7a9de20b
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(11,51): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:705

701. **build_error** (critical)
   - ID: qi-build_error-1765185102139-e4dd5e44
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(12,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:706

702. **build_error** (critical)
   - ID: qi-build_error-1765185102157-8316f86c
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(13,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:707

703. **build_error** (critical)
   - ID: qi-build_error-1765185102177-cfb77e24
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(14,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:708

704. **build_error** (critical)
   - ID: qi-build_error-1765185102195-613c9678
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(14,85): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:709

705. **build_error** (critical)
   - ID: qi-build_error-1765185102215-c518c41a
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(15,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:710

706. **build_error** (critical)
   - ID: qi-build_error-1765185102233-feb5fffd
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(17,11): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:711

707. **build_error** (critical)
   - ID: qi-build_error-1765185102254-0bf45198
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(18,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:712

708. **build_error** (critical)
   - ID: qi-build_error-1765185102273-bf28b7fd
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(19,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:713

709. **build_error** (critical)
   - ID: qi-build_error-1765185102293-269dbd26
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(24,9): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:714

710. **build_error** (critical)
   - ID: qi-build_error-1765185102311-acc736d5
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(25,7): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:715

711. **build_error** (critical)
   - ID: qi-build_error-1765185102332-1507df9a
   - Description: Build error detected: components/foreman/UploadDropzone.tsx(26,5): error TS7026: JSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.
   - Source: build.log:716

712. **build_error** (critical)
   - ID: qi-build_error-1765185102350-fac90c09
   - Description: Build error detected: lib/builder/memory-injector.ts(167,23): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:717

713. **build_error** (critical)
   - ID: qi-build_error-1765185102370-b8ef7af5
   - Description: Build error detected: lib/builder/memory-injector.ts(371,12): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:718

714. **build_error** (critical)
   - ID: qi-build_error-1765185102388-b4a6ea2d
   - Description: Build error detected: lib/builder/memory-injector.ts(376,12): error TS2580: Cannot find name 'Buffer'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:719

715. **build_error** (critical)
   - ID: qi-build_error-1765185102409-c3305a1f
   - Description: Build error detected: lib/foreman/analytics/consolidation-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:720

716. **build_error** (critical)
   - ID: qi-build_error-1765185102427-4df494aa
   - Description: Build error detected: lib/foreman/analytics/consolidation-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:721

717. **build_error** (critical)
   - ID: qi-build_error-1765185102448-ff995d6a
   - Description: Build error detected: lib/foreman/analytics/evolution-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:722

718. **build_error** (critical)
   - ID: qi-build_error-1765185102466-25528a33
   - Description: Build error detected: lib/foreman/analytics/evolution-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:723

719. **build_error** (critical)
   - ID: qi-build_error-1765185102487-d3dbbc7a
   - Description: Build error detected: lib/foreman/analytics/governance-analytics.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:724

720. **build_error** (critical)
   - ID: qi-build_error-1765185102506-909fb882
   - Description: Build error detected: lib/foreman/analytics/governance-analytics.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:725

721. **build_error** (critical)
   - ID: qi-build_error-1765185102527-8b738713
   - Description: Build error detected: lib/foreman/analytics/memory-analytics.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:726

722. **build_error** (critical)
   - ID: qi-build_error-1765185102546-8ca1ed7e
   - Description: Build error detected: lib/foreman/analytics/memory-analytics.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:727

723. **build_error** (critical)
   - ID: qi-build_error-1765185102566-c7f26577
   - Description: Build error detected: lib/foreman/analytics/retirement-analytics.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:728

724. **build_error** (critical)
   - ID: qi-build_error-1765185102585-66e30254
   - Description: Build error detected: lib/foreman/analytics/retirement-analytics.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:729

725. **build_error** (critical)
   - ID: qi-build_error-1765185102604-e740c448
   - Description: Build error detected: lib/foreman/build-report.ts(8,31): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:730

726. **build_error** (critical)
   - ID: qi-build_error-1765185102622-d97c8a27
   - Description: Build error detected: lib/foreman/build-report.ts(9,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:731

727. **build_error** (critical)
   - ID: qi-build_error-1765185102642-e91d8b8b
   - Description: Build error detected: lib/foreman/build-report.ts(473,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:732

728. **build_error** (critical)
   - ID: qi-build_error-1765185102660-9e7ec5c2
   - Description: Build error detected: lib/foreman/build-sequence.ts(6,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
   - Source: build.log:733

729. **build_error** (critical)
   - ID: qi-build_error-1765185102679-4d018d57
   - Description: Build error detected: lib/foreman/build-sequence.ts(27,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:734

730. **build_error** (critical)
   - ID: qi-build_error-1765185102698-5d789432
   - Description: Build error detected: lib/foreman/build-sequence.ts(53,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:735

731. **build_error** (critical)
   - ID: qi-build_error-1765185102719-b8c4f3dc
   - Description: Build error detected: lib/foreman/build-sequence.ts(54,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:736

732. **build_error** (critical)
   - ID: qi-build_error-1765185102737-cc071179
   - Description: Build error detected: lib/foreman/build-sequence.ts(58,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:737

733. **build_error** (critical)
   - ID: qi-build_error-1765185102757-e0065a81
   - Description: Build error detected: lib/foreman/chat-executor.ts(1371,29): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:738

734. **build_error** (critical)
   - ID: qi-build_error-1765185102775-bf05c0b1
   - Description: Build error detected: lib/foreman/chat-executor.ts(1372,31): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:739

735. **build_error** (critical)
   - ID: qi-build_error-1765185102795-39121923
   - Description: Build error detected: lib/foreman/chat-executor.ts(1374,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:740

736. **build_error** (critical)
   - ID: qi-build_error-1765185102813-613e190a
   - Description: Build error detected: lib/foreman/desktop-sync.ts(16,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:741

737. **build_error** (critical)
   - ID: qi-build_error-1765185102834-d5073cf2
   - Description: Build error detected: lib/foreman/desktop-sync.ts(18,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:742

738. **build_error** (critical)
   - ID: qi-build_error-1765185102852-af5733ea
   - Description: Build error detected: lib/foreman/desktop-sync.ts(19,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:743

739. **build_error** (critical)
   - ID: qi-build_error-1765185102872-2472bc19
   - Description: Build error detected: lib/foreman/desktop-sync.ts(248,12): error TS2503: Cannot find namespace 'NodeJS'.
   - Source: build.log:744

740. **build_error** (critical)
   - ID: qi-build_error-1765185102890-2243fd25
   - Description: Build error detected: lib/foreman/desktop-sync.ts(302,53): error TS2503: Cannot find namespace 'NodeJS'.
   - Source: build.log:745

741. **build_error** (critical)
   - ID: qi-build_error-1765185102911-140dc02c
   - Description: Build error detected: lib/foreman/dispatch.ts(55,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:746

742. **build_error** (critical)
   - ID: qi-build_error-1765185102929-7ddcb65d
   - Description: Build error detected: lib/foreman/dispatch.ts(56,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:747

743. **build_error** (critical)
   - ID: qi-build_error-1765185102949-2423e909
   - Description: Build error detected: lib/foreman/dispatch.ts(60,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:748

744. **build_error** (critical)
   - ID: qi-build_error-1765185102968-541f5d2b
   - Description: Build error detected: lib/foreman/dispatch.ts(69,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:749

745. **build_error** (critical)
   - ID: qi-build_error-1765185102989-c2090dd5
   - Description: Build error detected: lib/foreman/dispatch.ts(70,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:750

746. **build_error** (critical)
   - ID: qi-build_error-1765185103007-6c6643ad
   - Description: Build error detected: lib/foreman/dispatch.ts(72,36): error TS7006: Parameter 's' implicitly has an 'any' type.
   - Source: build.log:751

747. **build_error** (critical)
   - ID: qi-build_error-1765185103027-6496b5fc
   - Description: Build error detected: lib/foreman/feedback/processor.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:752

748. **build_error** (critical)
   - ID: qi-build_error-1765185103046-cc1d55a9
   - Description: Build error detected: lib/foreman/feedback/processor.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:753

749. **build_error** (critical)
   - ID: qi-build_error-1765185103066-60796244
   - Description: Build error detected: lib/foreman/feedback/processor.ts(32,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:754

750. **build_error** (critical)
   - ID: qi-build_error-1765185103086-c74dd380
   - Description: Build error detected: lib/foreman/feedback/processor.ts(314,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:755

751. **build_error** (critical)
   - ID: qi-build_error-1765185103107-4ee45fd9
   - Description: Build error detected: lib/foreman/feedback/processor.ts(353,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:756

752. **build_error** (critical)
   - ID: qi-build_error-1765185103127-3fdc929e
   - Description: Build error detected: lib/foreman/governance/type-safety-events.ts(8,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:757

753. **build_error** (critical)
   - ID: qi-build_error-1765185103147-cb6a6ff3
   - Description: Build error detected: lib/foreman/governance/type-safety-events.ts(9,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:758

754. **build_error** (critical)
   - ID: qi-build_error-1765185103165-6d2df3c7
   - Description: Build error detected: lib/foreman/governance/type-safety-events.ts(76,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:759

755. **build_error** (critical)
   - ID: qi-build_error-1765185103184-740bf923
   - Description: Build error detected: lib/foreman/governance/type-safety-events.ts(113,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:760

756. **build_error** (critical)
   - ID: qi-build_error-1765185103203-b77511c4
   - Description: Build error detected: lib/foreman/initialization.ts(6,41): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:761

757. **build_error** (critical)
   - ID: qi-build_error-1765185103224-7233ba8d
   - Description: Build error detected: lib/foreman/initialization.ts(7,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:762

758. **build_error** (critical)
   - ID: qi-build_error-1765185103242-8f5be0f3
   - Description: Build error detected: lib/foreman/initialization.ts(34,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:763

759. **build_error** (critical)
   - ID: qi-build_error-1765185103263-f3f911e5
   - Description: Build error detected: lib/foreman/initialization.ts(35,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:764

760. **build_error** (critical)
   - ID: qi-build_error-1765185103282-99c93796
   - Description: Build error detected: lib/foreman/initialization.ts(36,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:765

761. **build_error** (critical)
   - ID: qi-build_error-1765185103304-c4321f3b
   - Description: Build error detected: lib/foreman/initialization.ts(37,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:766

762. **build_error** (critical)
   - ID: qi-build_error-1765185103323-47497773
   - Description: Build error detected: lib/foreman/initialization.ts(66,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:767

763. **build_error** (critical)
   - ID: qi-build_error-1765185103345-38ff0fc6
   - Description: Build error detected: lib/foreman/initialization.ts(89,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:768

764. **build_error** (critical)
   - ID: qi-build_error-1765185103363-1c1c915b
   - Description: Build error detected: lib/foreman/initialization.ts(90,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:769

765. **build_error** (critical)
   - ID: qi-build_error-1765185103384-463ecd08
   - Description: Build error detected: lib/foreman/initialization.ts(91,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:770

766. **build_error** (critical)
   - ID: qi-build_error-1765185103403-d44b028e
   - Description: Build error detected: lib/foreman/initialization.ts(92,23): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:771

767. **build_error** (critical)
   - ID: qi-build_error-1765185103423-16ef7e3f
   - Description: Build error detected: lib/foreman/initialization.ts(125,29): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:772

768. **build_error** (critical)
   - ID: qi-build_error-1765185103442-63c4de61
   - Description: Build error detected: lib/foreman/initialization.ts(203,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:773

769. **build_error** (critical)
   - ID: qi-build_error-1765185103462-2f4c4d35
   - Description: Build error detected: lib/foreman/initialization.ts(203,66): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:774

770. **build_error** (critical)
   - ID: qi-build_error-1765185103480-5a552924
   - Description: Build error detected: lib/foreman/initialization.ts(204,22): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:775

771. **build_error** (critical)
   - ID: qi-build_error-1765185103501-0fbce86b
   - Description: Build error detected: lib/foreman/initialization.ts(204,64): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:776

772. **build_error** (critical)
   - ID: qi-build_error-1765185103520-a6dd9381
   - Description: Build error detected: lib/foreman/initialization.ts(216,57): error TS7006: Parameter 's' implicitly has an 'any' type.
   - Source: build.log:777

773. **build_error** (critical)
   - ID: qi-build_error-1765185103541-d8be5749
   - Description: Build error detected: lib/foreman/initialization.ts(232,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:778

774. **build_error** (critical)
   - ID: qi-build_error-1765185103561-4ede1b5a
   - Description: Build error detected: lib/foreman/initialization.ts(258,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:779

775. **build_error** (critical)
   - ID: qi-build_error-1765185103582-fae3a8da
   - Description: Build error detected: lib/foreman/local-builder.ts(64,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:780

776. **build_error** (critical)
   - ID: qi-build_error-1765185103601-481b244f
   - Description: Build error detected: lib/foreman/local-builder.ts(110,28): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:781

777. **build_error** (critical)
   - ID: qi-build_error-1765185103622-3ac27d78
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:782

778. **build_error** (critical)
   - ID: qi-build_error-1765185103641-72b94823
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:783

779. **build_error** (critical)
   - ID: qi-build_error-1765185103662-bc1cddc5
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(11,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
   - Source: build.log:784

780. **build_error** (critical)
   - ID: qi-build_error-1765185103680-d802de44
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(12,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
   - Source: build.log:785

781. **build_error** (critical)
   - ID: qi-build_error-1765185103701-0723e78f
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(56,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:786

782. **build_error** (critical)
   - ID: qi-build_error-1765185103720-47f93f21
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(84,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:787

783. **build_error** (critical)
   - ID: qi-build_error-1765185103741-a57142fc
   - Description: Build error detected: lib/foreman/memory/consolidation-engine.ts(324,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:788

784. **build_error** (critical)
   - ID: qi-build_error-1765185103761-2a5548ff
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(21,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:789

785. **build_error** (critical)
   - ID: qi-build_error-1765185103783-97b65733
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(22,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:790

786. **build_error** (critical)
   - ID: qi-build_error-1765185103802-94d76e54
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(23,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
   - Source: build.log:791

787. **build_error** (critical)
   - ID: qi-build_error-1765185103823-ab1b9687
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(24,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
   - Source: build.log:792

788. **build_error** (critical)
   - ID: qi-build_error-1765185103842-da9c25fc
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(90,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:793

789. **build_error** (critical)
   - ID: qi-build_error-1765185103863-7e046c3c
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(398,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:794

790. **build_error** (critical)
   - ID: qi-build_error-1765185103881-c128378b
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(595,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:795

791. **build_error** (critical)
   - ID: qi-build_error-1765185103902-7dd6713d
   - Description: Build error detected: lib/foreman/memory/drift-monitor.ts(930,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:796

792. **build_error** (critical)
   - ID: qi-build_error-1765185103922-e2dffe88
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:797

793. **build_error** (critical)
   - ID: qi-build_error-1765185103942-6bedf608
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:798

794. **build_error** (critical)
   - ID: qi-build_error-1765185103960-453bc828
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(114,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:799

795. **build_error** (critical)
   - ID: qi-build_error-1765185103981-fa42e80f
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(134,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:800

796. **build_error** (critical)
   - ID: qi-build_error-1765185104000-7a17a114
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(193,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:801

797. **build_error** (critical)
   - ID: qi-build_error-1765185104023-3bf38e41
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(199,50): error TS7006: Parameter 'f' implicitly has an 'any' type.
   - Source: build.log:802

798. **build_error** (critical)
   - ID: qi-build_error-1765185104042-30f6d2c5
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(259,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:803

799. **build_error** (critical)
   - ID: qi-build_error-1765185104062-69abe5e6
   - Description: Build error detected: lib/foreman/memory/qa-miss-tracker.ts(294,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:804

800. **build_error** (critical)
   - ID: qi-build_error-1765185104082-c7f4232c
   - Description: Build error detected: lib/foreman/memory/retirement-engine.ts(15,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:805

801. **build_error** (critical)
   - ID: qi-build_error-1765185104104-23c784fb
   - Description: Build error detected: lib/foreman/memory/retirement-engine.ts(16,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:806

802. **build_error** (critical)
   - ID: qi-build_error-1765185104123-a439c44a
   - Description: Build error detected: lib/foreman/memory/retirement-engine.ts(65,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:807

803. **build_error** (critical)
   - ID: qi-build_error-1765185104144-5ec4a1c9
   - Description: Build error detected: lib/foreman/memory/retirement-engine.ts(89,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:808

804. **build_error** (critical)
   - ID: qi-build_error-1765185104163-343c4c1a
   - Description: Build error detected: lib/foreman/memory/retirement-engine.ts(394,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:809

805. **build_error** (critical)
   - ID: qi-build_error-1765185104184-025c722c
   - Description: Build error detected: lib/foreman/memory/storage.ts(6,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:810

806. **build_error** (critical)
   - ID: qi-build_error-1765185104204-e8c9dc8f
   - Description: Build error detected: lib/foreman/memory/storage.ts(7,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:811

807. **build_error** (critical)
   - ID: qi-build_error-1765185104225-2f056a0d
   - Description: Build error detected: lib/foreman/memory/storage.ts(19,23): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:812

808. **build_error** (critical)
   - ID: qi-build_error-1765185104244-782c0df3
   - Description: Build error detected: lib/foreman/orchestrator.ts(1,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
   - Source: build.log:813

809. **build_error** (critical)
   - ID: qi-build_error-1765185104264-63e642df
   - Description: Build error detected: lib/foreman/orchestrator.ts(6,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:814

810. **build_error** (critical)
   - ID: qi-build_error-1765185104284-97ef4917
   - Description: Build error detected: lib/foreman/overnight-execution.ts(24,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:815

811. **build_error** (critical)
   - ID: qi-build_error-1765185104304-af8337cd
   - Description: Build error detected: lib/foreman/overnight-execution.ts(48,23): error TS7006: Parameter 'issue' implicitly has an 'any' type.
   - Source: build.log:816

812. **build_error** (critical)
   - ID: qi-build_error-1765185104323-b64915df
   - Description: Build error detected: lib/foreman/overnight-execution.ts(52,32): error TS7006: Parameter 'label' implicitly has an 'any' type.
   - Source: build.log:817

813. **build_error** (critical)
   - ID: qi-build_error-1765185104344-c76bfe17
   - Description: Build error detected: lib/foreman/pilot-qa-check.ts(6,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:818

814. **build_error** (critical)
   - ID: qi-build_error-1765185104363-f13bf30c
   - Description: Build error detected: lib/foreman/pilot-qa-check.ts(7,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:819

815. **build_error** (critical)
   - ID: qi-build_error-1765185104384-d7fba76e
   - Description: Build error detected: lib/foreman/pilot-qa-check.ts(26,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:820

816. **build_error** (critical)
   - ID: qi-build_error-1765185104405-c6501ac2
   - Description: Build error detected: lib/foreman/pilot-qa-check.ts(91,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:821

817. **build_error** (critical)
   - ID: qi-build_error-1765185104427-83a259e5
   - Description: Build error detected: lib/foreman/projects/storage.ts(6,16): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
   - Source: build.log:822

818. **build_error** (critical)
   - ID: qi-build_error-1765185104446-942a3771
   - Description: Build error detected: lib/foreman/projects/storage.ts(7,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:823

819. **build_error** (critical)
   - ID: qi-build_error-1765185104468-205d7f84
   - Description: Build error detected: lib/foreman/projects/storage.ts(14,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:824

820. **build_error** (critical)
   - ID: qi-build_error-1765185104488-cec13140
   - Description: Build error detected: lib/foreman/projects/storage.ts(15,25): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:825

821. **build_error** (critical)
   - ID: qi-build_error-1765185104509-16dc30cb
   - Description: Build error detected: lib/foreman/projects/storage.ts(15,53): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:826

822. **build_error** (critical)
   - ID: qi-build_error-1765185104528-21c91e66
   - Description: Build error detected: lib/foreman/qa/enhanced-qa-runner.ts(33,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:827

823. **build_error** (critical)
   - ID: qi-build_error-1765185104550-7776dd6a
   - Description: Build error detected: lib/foreman/qa/enhanced-qa-runner.ts(65,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:828

824. **build_error** (critical)
   - ID: qi-build_error-1765185104569-61eefee0
   - Description: Build error detected: lib/foreman/qa/enhanced-qa-runner.ts(277,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:829

825. **build_error** (critical)
   - ID: qi-build_error-1765185104591-77522c55
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(19,26): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
   - Source: build.log:830

826. **build_error** (critical)
   - ID: qi-build_error-1765185104610-b302bf3b
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(20,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:831

827. **build_error** (critical)
   - ID: qi-build_error-1765185104631-c79e6dd8
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(21,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:832

828. **build_error** (critical)
   - ID: qi-build_error-1765185104651-1d8cfe86
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(42,11): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:833

829. **build_error** (critical)
   - ID: qi-build_error-1765185104673-ce8faaa1
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(64,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:834

830. **build_error** (critical)
   - ID: qi-build_error-1765185104692-80f5f985
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(115,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:835

831. **build_error** (critical)
   - ID: qi-build_error-1765185104713-51e5d728
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(145,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:836

832. **build_error** (critical)
   - ID: qi-build_error-1765185104732-cc5b0e3c
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(175,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:837

833. **build_error** (critical)
   - ID: qi-build_error-1765185104754-ff839de6
   - Description: Build error detected: lib/foreman/qa/log-generator.ts(205,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:838

834. **build_error** (critical)
   - ID: qi-build_error-1765185104773-2927ac7c
   - Description: Build error detected: lib/foreman/qa/log-parsing-qa.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:839

835. **build_error** (critical)
   - ID: qi-build_error-1765185104795-8ca1ad97
   - Description: Build error detected: lib/foreman/qa/log-parsing-qa.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:840

836. **build_error** (critical)
   - ID: qi-build_error-1765185104815-002cf973
   - Description: Build error detected: lib/foreman/qa/log-parsing-qa.ts(82,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:841

837. **build_error** (critical)
   - ID: qi-build_error-1765185104837-b8132def
   - Description: Build error detected: lib/foreman/qa/log-parsing-qa.ts(144,20): error TS7006: Parameter 'line' implicitly has an 'any' type.
   - Source: build.log:842

838. **build_error** (critical)
   - ID: qi-build_error-1765185104857-0176dad9
   - Description: Build error detected: lib/foreman/qa/log-parsing-qa.ts(144,26): error TS7006: Parameter 'index' implicitly has an 'any' type.
   - Source: build.log:843

839. **build_error** (critical)
   - ID: qi-build_error-1765185104878-2fc95986
   - Description: Build error detected: lib/foreman/qa/qi-incident-writer.ts(23,25): error TS2307: Cannot find module 'crypto' or its corresponding type declarations.
   - Source: build.log:844

840. **build_error** (critical)
   - ID: qi-build_error-1765185104898-260cf2ac
   - Description: Build error detected: lib/foreman/qa/qiel-runner.ts(109,18): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:845

841. **build_error** (critical)
   - ID: qi-build_error-1765185104919-07c8da61
   - Description: Build error detected: lib/foreman/qa/qiel-runner.ts(500,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:846

842. **build_error** (critical)
   - ID: qi-build_error-1765185104939-0f7ea49e
   - Description: Build error detected: lib/foreman/qa/qiel-runner.ts(518,14): error TS2580: Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:847

843. **build_error** (critical)
   - ID: qi-build_error-1765185104961-206d265c
   - Description: Build error detected: lib/foreman/qa/regression-test-generator.ts(13,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:848

844. **build_error** (critical)
   - ID: qi-build_error-1765185104981-e077d77b
   - Description: Build error detected: lib/foreman/qa/regression-test-generator.ts(14,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:849

845. **build_error** (critical)
   - ID: qi-build_error-1765185105003-02c137de
   - Description: Build error detected: lib/foreman/qa/regression-test-generator.ts(274,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:850

846. **build_error** (critical)
   - ID: qi-build_error-1765185105023-9e89f754
   - Description: Build error detected: lib/foreman/qa/regression-test-generator.ts(333,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:851

847. **build_error** (critical)
   - ID: qi-build_error-1765185105045-570e26a7
   - Description: Build error detected: lib/foreman/qa/regression-test-generator.ts(340,23): error TS7006: Parameter 'f' implicitly has an 'any' type.
   - Source: build.log:852

848. **build_error** (critical)
   - ID: qi-build_error-1765185105064-78bb322d
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(11,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:853

849. **build_error** (critical)
   - ID: qi-build_error-1765185105086-624a7cab
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(12,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:854

850. **build_error** (critical)
   - ID: qi-build_error-1765185105106-f3b53348
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(13,17): error TS2307: Cannot find module 'ajv' or its corresponding type declarations.
   - Source: build.log:855

851. **build_error** (critical)
   - ID: qi-build_error-1765185105129-f50a65f7
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(14,24): error TS2307: Cannot find module 'ajv-formats' or its corresponding type declarations.
   - Source: build.log:856

852. **build_error** (critical)
   - ID: qi-build_error-1765185105148-301e5c4f
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(86,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:857

853. **build_error** (critical)
   - ID: qi-build_error-1765185105169-22ac6715
   - Description: Build error detected: lib/foreman/qa/schema-cohesion-validator.ts(147,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:858

854. **build_error** (critical)
   - ID: qi-build_error-1765185105188-8ba02bc0
   - Description: Build error detected: lib/foreman/qa/vercel-simulation-qa.ts(14,26): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
   - Source: build.log:859

855. **build_error** (critical)
   - ID: qi-build_error-1765185105210-26410c58
   - Description: Build error detected: lib/foreman/qa/vercel-simulation-qa.ts(15,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:860

856. **build_error** (critical)
   - ID: qi-build_error-1765185105231-16bc7f60
   - Description: Build error detected: lib/foreman/qa/vercel-simulation-qa.ts(16,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:861

857. **build_error** (critical)
   - ID: qi-build_error-1765185105252-0894bb8a
   - Description: Build error detected: lib/foreman/qa/vercel-simulation-qa.ts(45,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:862

858. **build_error** (critical)
   - ID: qi-build_error-1765185105273-a23b59fa
   - Description: Build error detected: lib/foreman/qa/vercel-simulation-qa.ts(203,24): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:863

859. **build_error** (critical)
   - ID: qi-build_error-1765185105294-af4f119f
   - Description: Build error detected: lib/foreman/qa/zero-warning-policy.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:864

860. **build_error** (critical)
   - ID: qi-build_error-1765185105314-b1c3a136
   - Description: Build error detected: lib/foreman/qa/zero-warning-policy.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:865

861. **build_error** (critical)
   - ID: qi-build_error-1765185105335-42c92695
   - Description: Build error detected: lib/foreman/qiel-config.ts(19,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:866

862. **build_error** (critical)
   - ID: qi-build_error-1765185105355-fa1a74dc
   - Description: Build error detected: lib/foreman/qiel-config.ts(20,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:867

863. **build_error** (critical)
   - ID: qi-build_error-1765185105378-4208429a
   - Description: Build error detected: lib/foreman/qiel-config.ts(332,21): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:868

864. **build_error** (critical)
   - ID: qi-build_error-1765185105397-89935e9f
   - Description: Build error detected: lib/foreman/qiel-config.ts(367,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:869

865. **build_error** (critical)
   - ID: qi-build_error-1765185105419-6ba452a8
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(57,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:870

866. **build_error** (critical)
   - ID: qi-build_error-1765185105439-ce859aaf
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(58,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:871

867. **build_error** (critical)
   - ID: qi-build_error-1765185105460-7efc8b04
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(691,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:872

868. **build_error** (critical)
   - ID: qi-build_error-1765185105480-6cfb963b
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(702,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:873

869. **build_error** (critical)
   - ID: qi-build_error-1765185105501-d09a006a
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(718,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:874

870. **build_error** (critical)
   - ID: qi-build_error-1765185105521-914ad117
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(738,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:875

871. **build_error** (critical)
   - ID: qi-build_error-1765185105542-ce0422b4
   - Description: Build error detected: lib/foreman/reasoning/engine.ts(754,30): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:876

872. **build_error** (critical)
   - ID: qi-build_error-1765185105562-df29e39f
   - Description: Build error detected: lib/foreman/reasoning/evolution-engine.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:877

873. **build_error** (critical)
   - ID: qi-build_error-1765185105583-95fcdc89
   - Description: Build error detected: lib/foreman/reasoning/evolution-engine.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:878

874. **build_error** (critical)
   - ID: qi-build_error-1765185105603-044069fd
   - Description: Build error detected: lib/foreman/reasoning/evolution-engine.ts(314,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:879

875. **build_error** (critical)
   - ID: qi-build_error-1765185105624-ce3d2974
   - Description: Build error detected: lib/foreman/reasoning/evolution-engine.ts(351,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:880

876. **build_error** (critical)
   - ID: qi-build_error-1765185105643-f9c81280
   - Description: Build error detected: lib/foreman/reasoning/evolution-engine.ts(533,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:881

877. **build_error** (critical)
   - ID: qi-build_error-1765185105665-ad62bc14
   - Description: Build error detected: lib/foreman/reasoning/patterns.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:882

878. **build_error** (critical)
   - ID: qi-build_error-1765185105684-26daa364
   - Description: Build error detected: lib/foreman/reasoning/patterns.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:883

879. **build_error** (critical)
   - ID: qi-build_error-1765185105706-55f3caf8
   - Description: Build error detected: lib/foreman/reasoning/patterns.ts(123,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:884

880. **build_error** (critical)
   - ID: qi-build_error-1765185105727-62ffd7f4
   - Description: Build error detected: lib/foreman/run-self-test.ts(6,20): error TS2307: Cannot find module 'openai' or its corresponding type declarations.
   - Source: build.log:885

881. **build_error** (critical)
   - ID: qi-build_error-1765185105749-a71055ab
   - Description: Build error detected: lib/foreman/run-self-test.ts(87,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:886

882. **build_error** (critical)
   - ID: qi-build_error-1765185105768-7272864a
   - Description: Build error detected: lib/foreman/run-self-test.ts(93,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:887

883. **build_error** (critical)
   - ID: qi-build_error-1765185105791-745ba6ca
   - Description: Build error detected: lib/foreman/run-self-test.ts(125,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:888

884. **build_error** (critical)
   - ID: qi-build_error-1765185105812-ef54d011
   - Description: Build error detected: lib/foreman/run-self-test.ts(127,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:889

885. **build_error** (critical)
   - ID: qi-build_error-1765185105845-be11269d
   - Description: Build error detected: lib/foreman/run-self-test.ts(127,56): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:890

886. **build_error** (critical)
   - ID: qi-build_error-1765185105865-b2d5384c
   - Description: Build error detected: lib/foreman/run-self-test.ts(167,10): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:891

887. **build_error** (critical)
   - ID: qi-build_error-1765185105886-2f985f11
   - Description: Build error detected: lib/foreman/run-self-test.ts(177,15): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:892

888. **build_error** (critical)
   - ID: qi-build_error-1765185105908-927d6f38
   - Description: Build error detected: lib/foreman/run-self-test.ts(204,26): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:893

889. **build_error** (critical)
   - ID: qi-build_error-1765185105927-9a0ac178
   - Description: Build error detected: lib/foreman/run-self-test.ts(210,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:894

890. **build_error** (critical)
   - ID: qi-build_error-1765185105950-690b8bc7
   - Description: Build error detected: lib/foreman/run-self-test.ts(215,8): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:895

891. **build_error** (critical)
   - ID: qi-build_error-1765185105970-36ab70de
   - Description: Build error detected: lib/foreman/watchdog/quality-integrity-watchdog.ts(20,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:896

892. **build_error** (critical)
   - ID: qi-build_error-1765185105993-9b433144
   - Description: Build error detected: lib/foreman/watchdog/quality-integrity-watchdog.ts(21,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:897

893. **build_error** (critical)
   - ID: qi-build_error-1765185106014-031070d4
   - Description: Build error detected: lib/foreman/watchdog/quality-integrity-watchdog.ts(144,20): error TS7006: Parameter 'line' implicitly has an 'any' type.
   - Source: build.log:898

894. **build_error** (critical)
   - ID: qi-build_error-1765185106036-7b18da64
   - Description: Build error detected: lib/foreman/watchdog/quality-integrity-watchdog.ts(144,26): error TS7006: Parameter 'index' implicitly has an 'any' type.
   - Source: build.log:899

895. **build_error** (critical)
   - ID: qi-build_error-1765185106057-245faae3
   - Description: Build error detected: lib/foreman/watchdog/quality-integrity-watchdog.ts(420,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:900

896. **build_error** (critical)
   - ID: qi-build_error-1765185106080-682014d3
   - Description: Build error detected: lib/github.ts(22,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:901

897. **build_error** (critical)
   - ID: qi-build_error-1765185106101-343b82cf
   - Description: Build error detected: lib/github.ts(23,44): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:902

898. **build_error** (critical)
   - ID: qi-build_error-1765185106123-7ce4be15
   - Description: Build error detected: lib/github.ts(24,52): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:903

899. **build_error** (critical)
   - ID: qi-build_error-1765185106143-6d3deaaa
   - Description: Build error detected: lib/github.ts(25,50): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:904

900. **build_error** (critical)
   - ID: qi-build_error-1765185106166-27edfa50
   - Description: Build error detected: lib/github/client.ts(1,25): error TS2307: Cannot find module 'octokit' or its corresponding type declarations.
   - Source: build.log:905

901. **build_error** (critical)
   - ID: qi-build_error-1765185106188-23066f94
   - Description: Build error detected: lib/github/client.ts(4,9): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:906

902. **build_error** (critical)
   - ID: qi-build_error-1765185106210-5b82abf4
   - Description: Build error detected: lib/github/loadFiles.ts(2,35): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
   - Source: build.log:907

903. **build_error** (critical)
   - ID: qi-build_error-1765185106230-eecdddf5
   - Description: Build error detected: lib/github/loadFiles.ts(3,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:908

904. **build_error** (critical)
   - ID: qi-build_error-1765185106251-efa8786b
   - Description: Build error detected: lib/github/loadFiles.ts(39,17): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:909

905. **build_error** (critical)
   - ID: qi-build_error-1765185106271-ff7611f3
   - Description: Build error detected: lib/github/loadFiles.ts(40,16): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:910

906. **build_error** (critical)
   - ID: qi-build_error-1765185106293-28dcf1ce
   - Description: Build error detected: lib/github/loadFiles.ts(41,20): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:911

907. **build_error** (critical)
   - ID: qi-build_error-1765185106313-caf0b935
   - Description: Build error detected: lib/github/loadFiles.ts(91,27): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:912

908. **build_error** (critical)
   - ID: qi-build_error-1765185106335-984af1d7
   - Description: Build error detected: lib/github/pr-builder.ts(6,25): error TS2307: Cannot find module 'octokit' or its corresponding type declarations.
   - Source: build.log:913

909. **build_error** (critical)
   - ID: qi-build_error-1765185106355-b248876d
   - Description: Build error detected: lib/openai.ts(16,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:914

910. **build_error** (critical)
   - ID: qi-build_error-1765185106378-04da360b
   - Description: Build error detected: tailwind.config.ts(1,29): error TS2307: Cannot find module 'tailwindcss' or its corresponding type declarations.
   - Source: build.log:915

911. **build_error** (critical)
   - ID: qi-build_error-1765185106397-5ade1eb4
   - Description: Build error detected: tailwind.config.ts(24,5): error TS2580: Cannot find name 'require'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:916

912. **build_error** (critical)
   - ID: qi-build_error-1765185106419-fa5c6f5a
   - Description: Build error detected: tests/analytics/builder-performance.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:917

913. **build_error** (critical)
   - ID: qi-build_error-1765185106439-df42fe98
   - Description: Build error detected: tests/analytics/consolidation-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:918

914. **build_error** (critical)
   - ID: qi-build_error-1765185106461-7d08b348
   - Description: Build error detected: tests/analytics/drift-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:919

915. **build_error** (critical)
   - ID: qi-build_error-1765185106482-ab53763e
   - Description: Build error detected: tests/analytics/evolution-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:920

916. **build_error** (critical)
   - ID: qi-build_error-1765185106505-645718a1
   - Description: Build error detected: tests/analytics/governance-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:921

917. **build_error** (critical)
   - ID: qi-build_error-1765185106525-bd3fe98b
   - Description: Build error detected: tests/analytics/memory-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:922

918. **build_error** (critical)
   - ID: qi-build_error-1765185106546-8ee69f0c
   - Description: Build error detected: tests/analytics/project-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:923

919. **build_error** (critical)
   - ID: qi-build_error-1765185106566-149e5d07
   - Description: Build error detected: tests/analytics/retirement-panel.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:924

920. **build_error** (critical)
   - ID: qi-build_error-1765185106588-bd576b88
   - Description: Build error detected: tests/analytics/summary-endpoint.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:925

921. **build_error** (critical)
   - ID: qi-build_error-1765185106610-f2cd2ae0
   - Description: Build error detected: tests/builder-memory/context-filtering.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:926

922. **build_error** (critical)
   - ID: qi-build_error-1765185106632-3754982f
   - Description: Build error detected: tests/builder-memory/context-filtering.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:927

923. **build_error** (critical)
   - ID: qi-build_error-1765185106652-3ac2a86f
   - Description: Build error detected: tests/builder-memory/context-size-limit.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:928

924. **build_error** (critical)
   - ID: qi-build_error-1765185106674-f56e988f
   - Description: Build error detected: tests/builder-memory/context-size-limit.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:929

925. **build_error** (critical)
   - ID: qi-build_error-1765185106695-5b383805
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:930

926. **build_error** (critical)
   - ID: qi-build_error-1765185106717-ec46e8fe
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:931

927. **build_error** (critical)
   - ID: qi-build_error-1765185106737-b89cf9d3
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(32,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:932

928. **build_error** (critical)
   - ID: qi-build_error-1765185106759-5c2e1a87
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(37,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:933

929. **build_error** (critical)
   - ID: qi-build_error-1765185106779-e488d98c
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(86,7): error TS18048: 'task.memoryContext' is possibly 'undefined'.
   - Source: build.log:934

930. **build_error** (critical)
   - ID: qi-build_error-1765185106813-64940db5
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(90,7): error TS18048: 'task.memoryContext' is possibly 'undefined'.
   - Source: build.log:935

931. **build_error** (critical)
   - ID: qi-build_error-1765185106835-c5b02afa
   - Description: Build error detected: tests/builder-memory/end-to-end-build-flow.test.ts(143,29): error TS18048: 'task.memoryContext' is possibly 'undefined'.
   - Source: build.log:936

932. **build_error** (critical)
   - ID: qi-build_error-1765185106854-da6af52d
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:937

933. **build_error** (critical)
   - ID: qi-build_error-1765185106875-a48c48a6
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:938

934. **build_error** (critical)
   - ID: qi-build_error-1765185106896-b61ce34b
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(109,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:939

935. **build_error** (critical)
   - ID: qi-build_error-1765185106924-d1124762
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(110,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:940

936. **build_error** (critical)
   - ID: qi-build_error-1765185106945-6be14646
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(135,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:941

937. **build_error** (critical)
   - ID: qi-build_error-1765185106968-0ec3d4df
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(141,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:942

938. **build_error** (critical)
   - ID: qi-build_error-1765185106988-1b18a156
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(142,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:943

939. **build_error** (critical)
   - ID: qi-build_error-1765185107010-7d292997
   - Description: Build error detected: tests/builder-memory/governance-interference.test.ts(176,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:944

940. **build_error** (critical)
   - ID: qi-build_error-1765185107031-ec0e8106
   - Description: Build error detected: tests/builder-memory/integration-drift-guard.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:945

941. **build_error** (critical)
   - ID: qi-build_error-1765185107053-2c858741
   - Description: Build error detected: tests/builder-memory/integration-drift-guard.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:946

942. **build_error** (critical)
   - ID: qi-build_error-1765185107074-7cbb6619
   - Description: Build error detected: tests/builder-memory/integration-drift-guard.test.ts(121,7): error TS18048: 'task.memoryContext' is possibly 'undefined'.
   - Source: build.log:947

943. **build_error** (critical)
   - ID: qi-build_error-1765185107098-be31506a
   - Description: Build error detected: tests/consolidation/engine.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:948

944. **build_error** (critical)
   - ID: qi-build_error-1765185107118-d956d1c5
   - Description: Build error detected: tests/consolidation/engine.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:949

945. **build_error** (critical)
   - ID: qi-build_error-1765185107141-9cab2aa7
   - Description: Build error detected: tests/consolidation/engine.test.ts(51,26): error TS18048: 'qaPattern' is possibly 'undefined'.
   - Source: build.log:950

946. **build_error** (critical)
   - ID: qi-build_error-1765185107161-5cdcc7be
   - Description: Build error detected: tests/consolidation/engine.test.ts(67,26): error TS18048: 'archPattern' is possibly 'undefined'.
   - Source: build.log:951

947. **build_error** (critical)
   - ID: qi-build_error-1765185107184-26b95ea7
   - Description: Build error detected: tests/dashboard/blockers.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:952

948. **build_error** (critical)
   - ID: qi-build_error-1765185107205-a9b54910
   - Description: Build error detected: tests/dashboard/dashboard.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:953

949. **build_error** (critical)
   - ID: qi-build_error-1765185107227-34c2c68c
   - Description: Build error detected: tests/dashboard/deployment.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:954

950. **build_error** (critical)
   - ID: qi-build_error-1765185107247-bf095a45
   - Description: Build error detected: tests/dashboard/memory.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:955

951. **build_error** (critical)
   - ID: qi-build_error-1765185107271-d44a7f5a
   - Description: Build error detected: tests/dashboard/milestones.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:956

952. **build_error** (critical)
   - ID: qi-build_error-1765185107291-91e5db28
   - Description: Build error detected: tests/dashboard/s-curve.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:957

953. **build_error** (critical)
   - ID: qi-build_error-1765185107313-8e209e21
   - Description: Build error detected: tests/dashboard/status.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:958

954. **build_error** (critical)
   - ID: qi-build_error-1765185107334-230b53ad
   - Description: Build error detected: tests/dashboard/test-utils.ts(6,30): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:959

955. **build_error** (critical)
   - ID: qi-build_error-1765185107357-8c8dbf80
   - Description: Build error detected: tests/dashboard/test-utils.ts(7,22): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:960

956. **build_error** (critical)
   - ID: qi-build_error-1765185107378-7dac4050
   - Description: Build error detected: tests/dashboard/test-utils.ts(14,28): error TS2304: Cannot find name '__dirname'.
   - Source: build.log:961

957. **build_error** (critical)
   - ID: qi-build_error-1765185107400-51223c9d
   - Description: Build error detected: tests/dashboard/timeline.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:962

958. **build_error** (critical)
   - ID: qi-build_error-1765185107422-3e650192
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(6,42): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:963

959. **build_error** (critical)
   - ID: qi-build_error-1765185107445-1482c5c2
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:964

960. **build_error** (critical)
   - ID: qi-build_error-1765185107467-2e432971
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:965

961. **build_error** (critical)
   - ID: qi-build_error-1765185107490-3cecfc0b
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:966

962. **build_error** (critical)
   - ID: qi-build_error-1765185107510-b1c283f0
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(14,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:967

963. **build_error** (critical)
   - ID: qi-build_error-1765185107533-5417bfd8
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(114,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:968

964. **build_error** (critical)
   - ID: qi-build_error-1765185107553-ea02a73a
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(143,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:969

965. **build_error** (critical)
   - ID: qi-build_error-1765185107576-98c28209
   - Description: Build error detected: tests/feedback/builder-feedback-flow.test.ts(167,15): error TS18048: 'result.errors' is possibly 'undefined'.
   - Source: build.log:970

966. **build_error** (critical)
   - ID: qi-build_error-1765185107597-79fb89e4
   - Description: Build error detected: tests/feedback/drift-detection-agent-experience.test.ts(6,42): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:971

967. **build_error** (critical)
   - ID: qi-build_error-1765185107620-e596d74e
   - Description: Build error detected: tests/feedback/drift-detection-agent-experience.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:972

968. **build_error** (critical)
   - ID: qi-build_error-1765185107641-1b3925d9
   - Description: Build error detected: tests/feedback/drift-detection-agent-experience.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:973

969. **build_error** (critical)
   - ID: qi-build_error-1765185107663-188aef49
   - Description: Build error detected: tests/feedback/drift-detection-agent-experience.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:974

970. **build_error** (critical)
   - ID: qi-build_error-1765185107684-6f6e0297
   - Description: Build error detected: tests/feedback/drift-detection-agent-experience.test.ts(15,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:975

971. **build_error** (critical)
   - ID: qi-build_error-1765185107706-8e17f503
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:976

972. **build_error** (critical)
   - ID: qi-build_error-1765185107727-ebbf3140
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:977

973. **build_error** (critical)
   - ID: qi-build_error-1765185107762-7a3580eb
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(35,15): error TS18048: 'result.errors' is possibly 'undefined'.
   - Source: build.log:978

974. **build_error** (critical)
   - ID: qi-build_error-1765185107783-ea5c2b22
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(49,15): error TS18048: 'result.errors' is possibly 'undefined'.
   - Source: build.log:979

975. **build_error** (critical)
   - ID: qi-build_error-1765185107807-92fb207d
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(63,15): error TS18048: 'result.errors' is possibly 'undefined'.
   - Source: build.log:980

976. **build_error** (critical)
   - ID: qi-build_error-1765185107828-2195fd58
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(77,15): error TS18048: 'result.errors' is possibly 'undefined'.
   - Source: build.log:981

977. **build_error** (critical)
   - ID: qi-build_error-1765185107850-ce746a32
   - Description: Build error detected: tests/feedback/feedback-model-validation.test.ts(91,15): error TS18048: 'result.warnings' is possibly 'undefined'.
   - Source: build.log:982

978. **build_error** (critical)
   - ID: qi-build_error-1765185107871-1003afc3
   - Description: Build error detected: tests/feedback/governance-conflict-detection.test.ts(6,42): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:983

979. **build_error** (critical)
   - ID: qi-build_error-1765185107895-1fe70c70
   - Description: Build error detected: tests/feedback/governance-conflict-detection.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:984

980. **build_error** (critical)
   - ID: qi-build_error-1765185107915-00082cb6
   - Description: Build error detected: tests/feedback/governance-conflict-detection.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:985

981. **build_error** (critical)
   - ID: qi-build_error-1765185107938-ef1c201b
   - Description: Build error detected: tests/feedback/governance-conflict-detection.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:986

982. **build_error** (critical)
   - ID: qi-build_error-1765185107959-b8ae9a7d
   - Description: Build error detected: tests/feedback/governance-conflict-detection.test.ts(14,3): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:987

983. **build_error** (critical)
   - ID: qi-build_error-1765185107981-a3cfb7d4
   - Description: Build error detected: tests/feedback/multi-agent-harmonization.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:988

984. **build_error** (critical)
   - ID: qi-build_error-1765185108003-91ec270a
   - Description: Build error detected: tests/feedback/multi-agent-harmonization.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:989

985. **build_error** (critical)
   - ID: qi-build_error-1765185108027-ff9a6966
   - Description: Build error detected: tests/feedback/multi-agent-harmonization.test.ts(8,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:990

986. **build_error** (critical)
   - ID: qi-build_error-1765185108048-d082c0ed
   - Description: Build error detected: tests/feedback/multi-agent-harmonization.test.ts(9,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:991

987. **build_error** (critical)
   - ID: qi-build_error-1765185108071-567c8a28
   - Description: Build error detected: tests/feedback/multi-agent-harmonization.test.ts(71,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:992

988. **build_error** (critical)
   - ID: qi-build_error-1765185108092-6eaba06d
   - Description: Build error detected: tests/feedback/regression.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:993

989. **build_error** (critical)
   - ID: qi-build_error-1765185108116-16f757e2
   - Description: Build error detected: tests/feedback/regression.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:994

990. **build_error** (critical)
   - ID: qi-build_error-1765185108137-8927347c
   - Description: Build error detected: tests/gsr/gsr-enforcement.test.ts(13,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:995

991. **build_error** (critical)
   - ID: qi-build_error-1765185108160-1b41ba27
   - Description: Build error detected: tests/gsr/gsr-enforcement.test.ts(14,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:996

992. **build_error** (critical)
   - ID: qi-build_error-1765185108186-c270e014
   - Description: Build error detected: tests/gsr/gsr-enforcement.test.ts(250,15): error TS18048: 'result.uiReviewMessage' is possibly 'undefined'.
   - Source: build.log:997

993. **build_error** (critical)
   - ID: qi-build_error-1765185108208-947af613
   - Description: Build error detected: tests/gsr/gsr-enforcement.test.ts(347,15): error TS18048: 'result.uiReviewMessage' is possibly 'undefined'.
   - Source: build.log:998

994. **build_error** (critical)
   - ID: qi-build_error-1765185108229-8c3fcea0
   - Description: Build error detected: tests/gsr/gsr-enforcement.test.ts(348,15): error TS18048: 'result.uiReviewMessage' is possibly 'undefined'.
   - Source: build.log:999

995. **build_error** (critical)
   - ID: qi-build_error-1765185108252-f95d4868
   - Description: Build error detected: tests/local-builder/fallback.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1000

996. **build_error** (critical)
   - ID: qi-build_error-1765185108273-559e321d
   - Description: Build error detected: tests/local-builder/fallback.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1001

997. **build_error** (critical)
   - ID: qi-build_error-1765185108296-80226265
   - Description: Build error detected: tests/local-builder/fallback.test.ts(46,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1002

998. **build_error** (critical)
   - ID: qi-build_error-1765185108317-317c2d61
   - Description: Build error detected: tests/local-builder/fallback.test.ts(53,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1003

999. **build_error** (critical)
   - ID: qi-build_error-1765185108340-8f69795b
   - Description: Build error detected: tests/local-builder/fallback.test.ts(58,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1004

1000. **build_error** (critical)
   - ID: qi-build_error-1765185108361-9bbd19c8
   - Description: Build error detected: tests/local-builder/fallback.test.ts(79,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1005

1001. **build_error** (critical)
   - ID: qi-build_error-1765185108383-a755068b
   - Description: Build error detected: tests/local-builder/fallback.test.ts(86,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1006

1002. **build_error** (critical)
   - ID: qi-build_error-1765185108404-c0dc733a
   - Description: Build error detected: tests/local-builder/fallback.test.ts(99,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1007

1003. **build_error** (critical)
   - ID: qi-build_error-1765185108427-bfafd83c
   - Description: Build error detected: tests/local-builder/fallback.test.ts(106,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1008

1004. **build_error** (critical)
   - ID: qi-build_error-1765185108449-2eafe4fc
   - Description: Build error detected: tests/local-builder/fallback.test.ts(128,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1009

1005. **build_error** (critical)
   - ID: qi-build_error-1765185108471-a0890b9f
   - Description: Build error detected: tests/local-builder/fallback.test.ts(129,12): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1010

1006. **build_error** (critical)
   - ID: qi-build_error-1765185108492-08b830bc
   - Description: Build error detected: tests/local-builder/integration.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1011

1007. **build_error** (critical)
   - ID: qi-build_error-1765185108514-541e85de
   - Description: Build error detected: tests/local-builder/integration.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1012

1008. **build_error** (critical)
   - ID: qi-build_error-1765185108534-bcd216cf
   - Description: Build error detected: tests/local-builder/integration.test.ts(15,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1013

1009. **build_error** (critical)
   - ID: qi-build_error-1765185108557-8c991fa6
   - Description: Build error detected: tests/local-builder/integration.test.ts(16,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1014

1010. **build_error** (critical)
   - ID: qi-build_error-1765185108578-172c4b0d
   - Description: Build error detected: tests/local-builder/integration.test.ts(48,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1015

1011. **build_error** (critical)
   - ID: qi-build_error-1765185108600-0de8f277
   - Description: Build error detected: tests/local-builder/integration.test.ts(49,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1016

1012. **build_error** (critical)
   - ID: qi-build_error-1765185108621-ca1d7bf1
   - Description: Build error detected: tests/local-builder/integration.test.ts(63,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1017

1013. **build_error** (critical)
   - ID: qi-build_error-1765185108645-f84e8682
   - Description: Build error detected: tests/local-builder/integration.test.ts(64,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1018

1014. **build_error** (critical)
   - ID: qi-build_error-1765185108667-83a0e60d
   - Description: Build error detected: tests/local-builder/integration.test.ts(65,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1019

1015. **build_error** (critical)
   - ID: qi-build_error-1765185108689-081b9bde
   - Description: Build error detected: tests/local-builder/integration.test.ts(85,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1020

1016. **build_error** (critical)
   - ID: qi-build_error-1765185108710-c970d572
   - Description: Build error detected: tests/local-builder/integration.test.ts(86,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1021

1017. **build_error** (critical)
   - ID: qi-build_error-1765185108733-18a05f21
   - Description: Build error detected: tests/local-builder/integration.test.ts(87,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1022

1018. **build_error** (critical)
   - ID: qi-build_error-1765185108755-e7c5153b
   - Description: Build error detected: tests/local-builder/integration.test.ts(92,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1023

1019. **build_error** (critical)
   - ID: qi-build_error-1765185108790-1464a4b3
   - Description: Build error detected: tests/local-builder/integration.test.ts(112,26): error TS18048: 'task.input' is possibly 'undefined'.
   - Source: build.log:1024

1020. **build_error** (critical)
   - ID: qi-build_error-1765185108812-347c4746
   - Description: Build error detected: tests/local-builder/integration.test.ts(113,17): error TS18048: 'task.input' is possibly 'undefined'.
   - Source: build.log:1025

1021. **build_error** (critical)
   - ID: qi-build_error-1765185108836-917951e0
   - Description: Build error detected: tests/local-builder/integration.test.ts(114,17): error TS18048: 'task.input' is possibly 'undefined'.
   - Source: build.log:1026

1022. **build_error** (critical)
   - ID: qi-build_error-1765185108856-47952e79
   - Description: Build error detected: tests/local-builder/integration.test.ts(118,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1027

1023. **build_error** (critical)
   - ID: qi-build_error-1765185108879-d00c2fea
   - Description: Build error detected: tests/local-builder/integration.test.ts(124,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1028

1024. **build_error** (critical)
   - ID: qi-build_error-1765185108901-294325d3
   - Description: Build error detected: tests/local-builder/integration.test.ts(125,5): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1029

1025. **build_error** (critical)
   - ID: qi-build_error-1765185108924-686b86a1
   - Description: Build error detected: tests/local-builder/integration.test.ts(148,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1030

1026. **build_error** (critical)
   - ID: qi-build_error-1765185108946-bffa168d
   - Description: Build error detected: tests/local-builder/integration.test.ts(149,14): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1031

1027. **build_error** (critical)
   - ID: qi-build_error-1765185108969-f3e198fc
   - Description: Build error detected: tests/memory-drift/auto-recommendation.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1032

1028. **build_error** (critical)
   - ID: qi-build_error-1765185108990-745c876a
   - Description: Build error detected: tests/memory-drift/auto-recommendation.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1033

1029. **build_error** (critical)
   - ID: qi-build_error-1765185109015-bb6f70c5
   - Description: Build error detected: tests/memory-drift/contradiction-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1034

1030. **build_error** (critical)
   - ID: qi-build_error-1765185109036-27ebe8e1
   - Description: Build error detected: tests/memory-drift/contradiction-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1035

1031. **build_error** (critical)
   - ID: qi-build_error-1765185109060-b1a40587
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1036

1032. **build_error** (critical)
   - ID: qi-build_error-1765185109081-7207d0f7
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1037

1033. **build_error** (critical)
   - ID: qi-build_error-1765185109104-e32fb8c8
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(12,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1038

1034. **build_error** (critical)
   - ID: qi-build_error-1765185109125-62111218
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(13,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1039

1035. **build_error** (critical)
   - ID: qi-build_error-1765185109148-0116f2ea
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(33,34): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1040

1036. **build_error** (critical)
   - ID: qi-build_error-1765185109169-d0ef70e8
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(68,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1041

1037. **build_error** (critical)
   - ID: qi-build_error-1765185109192-ef57af8d
   - Description: Build error detected: tests/memory-drift/cross-agent-drift.test.ts(96,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1042

1038. **build_error** (critical)
   - ID: qi-build_error-1765185109214-d692550d
   - Description: Build error detected: tests/memory-drift/governance-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1043

1039. **build_error** (critical)
   - ID: qi-build_error-1765185109238-bae497ce
   - Description: Build error detected: tests/memory-drift/governance-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1044

1040. **build_error** (critical)
   - ID: qi-build_error-1765185109259-a72f4440
   - Description: Build error detected: tests/memory-drift/integration.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1045

1041. **build_error** (critical)
   - ID: qi-build_error-1765185109282-eb4b3966
   - Description: Build error detected: tests/memory-drift/integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1046

1042. **build_error** (critical)
   - ID: qi-build_error-1765185109304-00982192
   - Description: Build error detected: tests/memory-drift/schema-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1047

1043. **build_error** (critical)
   - ID: qi-build_error-1765185109328-dd88cf7a
   - Description: Build error detected: tests/memory-drift/schema-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1048

1044. **build_error** (critical)
   - ID: qi-build_error-1765185109349-a8da6595
   - Description: Build error detected: tests/memory-drift/staleness-drift.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1049

1045. **build_error** (critical)
   - ID: qi-build_error-1765185109372-0ec54760
   - Description: Build error detected: tests/memory-drift/staleness-drift.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1050

1046. **build_error** (critical)
   - ID: qi-build_error-1765185109394-c7942e04
   - Description: Build error detected: tests/memory-fabric/structure.test.ts(15,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1051

1047. **build_error** (critical)
   - ID: qi-build_error-1765185109417-7cd3885e
   - Description: Build error detected: tests/memory-fabric/structure.test.ts(16,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
   - Source: build.log:1052

1048. **build_error** (critical)
   - ID: qi-build_error-1765185109438-fad6e9de
   - Description: Build error detected: tests/memory-fabric/structure.test.ts(17,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1053

1049. **build_error** (critical)
   - ID: qi-build_error-1765185109461-c886f263
   - Description: Build error detected: tests/memory-fabric/structure.test.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1054

1050. **build_error** (critical)
   - ID: qi-build_error-1765185109482-e5e6f02d
   - Description: Build error detected: tests/memory-fabric/structure.test.ts(28,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1055

1051. **build_error** (critical)
   - ID: qi-build_error-1765185109505-d623cbae
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1056

1052. **build_error** (critical)
   - ID: qi-build_error-1765185109527-6e8fe580
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(8,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1057

1053. **build_error** (critical)
   - ID: qi-build_error-1765185109551-0385a112
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(88,24): error TS18048: 'heavyTaskRule' is possibly 'undefined'.
   - Source: build.log:1058

1054. **build_error** (critical)
   - ID: qi-build_error-1765185109572-6daf5f0e
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(92,24): error TS18048: 'multiFileRule' is possibly 'undefined'.
   - Source: build.log:1059

1055. **build_error** (critical)
   - ID: qi-build_error-1765185109595-d00b3842
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(97,24): error TS18048: 'archRule' is possibly 'undefined'.
   - Source: build.log:1060

1056. **build_error** (critical)
   - ID: qi-build_error-1765185109616-c14d498e
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(206,15): error TS18048: 'escalationIssue' is possibly 'undefined'.
   - Source: build.log:1061

1057. **build_error** (critical)
   - ID: qi-build_error-1765185109639-86b2bf66
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(214,15): error TS18048: 'syncIssue' is possibly 'undefined'.
   - Source: build.log:1062

1058. **build_error** (critical)
   - ID: qi-build_error-1765185109660-d82cc378
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(222,15): error TS18048: 'healIssue' is possibly 'undefined'.
   - Source: build.log:1063

1059. **build_error** (critical)
   - ID: qi-build_error-1765185109683-326d6630
   - Description: Build error detected: tests/overnight-execution/overnight-execution.test.ts(230,15): error TS18048: 'gsrIssue' is possibly 'undefined'.
   - Source: build.log:1064

1060. **build_error** (critical)
   - ID: qi-build_error-1765185109705-afdfa6f0
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(14,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1065

1061. **build_error** (critical)
   - ID: qi-build_error-1765185109729-f6124994
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(15,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
   - Source: build.log:1066

1062. **build_error** (critical)
   - ID: qi-build_error-1765185109751-11c9d986
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(16,22): error TS2307: Cannot find module 'child_process' or its corresponding type declarations.
   - Source: build.log:1067

1063. **build_error** (critical)
   - ID: qi-build_error-1765185109787-723a7625
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(17,27): error TS2307: Cannot find module 'util' or its corresponding type declarations.
   - Source: build.log:1068

1064. **build_error** (critical)
   - ID: qi-build_error-1765185109809-1280b3ef
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(18,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1069

1065. **build_error** (critical)
   - ID: qi-build_error-1765185109832-a80c77a2
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(21,31): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1070

1066. **build_error** (critical)
   - ID: qi-build_error-1765185109854-1e9fbb18
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(65,31): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
   - Source: build.log:1071

1067. **build_error** (critical)
   - ID: qi-build_error-1765185109879-c975079b
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(90,16): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1072

1068. **build_error** (critical)
   - ID: qi-build_error-1765185109901-f6d01239
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(158,31): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
   - Source: build.log:1073

1069. **build_error** (critical)
   - ID: qi-build_error-1765185109924-31300508
   - Description: Build error detected: tests/qa-structural/build-simulation.test.ts(187,31): error TS2307: Cannot find module 'fs/promises' or its corresponding type declarations.
   - Source: build.log:1074

1070. **build_error** (critical)
   - ID: qi-build_error-1765185109946-5bfbf75e
   - Description: Build error detected: tests/qa-structural/cross-engine-interface.test.ts(14,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1075

1071. **build_error** (critical)
   - ID: qi-build_error-1765185109970-b65adaf4
   - Description: Build error detected: tests/qa-structural/cross-engine-interface.test.ts(15,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
   - Source: build.log:1076

1072. **build_error** (critical)
   - ID: qi-build_error-1765185109992-004145a5
   - Description: Build error detected: tests/qa-structural/type-validation.test.ts(14,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1077

1073. **build_error** (critical)
   - ID: qi-build_error-1765185110017-6a267016
   - Description: Build error detected: tests/qa-structural/type-validation.test.ts(15,20): error TS2307: Cannot find module 'node:assert/strict' or its corresponding type declarations.
   - Source: build.log:1078

1074. **build_error** (critical)
   - ID: qi-build_error-1765185110039-f9921b4b
   - Description: Build error detected: tests/qa/qa-system.test.ts(11,37): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1079

1075. **build_error** (critical)
   - ID: qi-build_error-1765185110062-156def99
   - Description: Build error detected: tests/qa/qa-system.test.ts(12,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1080

1076. **build_error** (critical)
   - ID: qi-build_error-1765185110085-3071f447
   - Description: Build error detected: tests/qa/qa-system.test.ts(13,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1081

1077. **build_error** (critical)
   - ID: qi-build_error-1765185110109-3604569d
   - Description: Build error detected: tests/qa/qa-system.test.ts(14,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1082

1078. **build_error** (critical)
   - ID: qi-build_error-1765185110131-2a297943
   - Description: Build error detected: tests/qa/qa-system.test.ts(24,19): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1083

1079. **build_error** (critical)
   - ID: qi-build_error-1765185110154-23d10f9b
   - Description: Build error detected: tests/qa/qa-system.test.ts(32,33): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1084

1080. **build_error** (critical)
   - ID: qi-build_error-1765185110176-f8b14118
   - Description: Build error detected: tests/qa/qa-system.test.ts(177,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1085

1081. **build_error** (critical)
   - ID: qi-build_error-1765185110198-5d881da3
   - Description: Build error detected: tests/qa/qa-system.test.ts(183,33): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1086

1082. **build_error** (critical)
   - ID: qi-build_error-1765185110220-9c337a78
   - Description: Build error detected: tests/qa/qa-system.test.ts(237,35): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1087

1083. **build_error** (critical)
   - ID: qi-build_error-1765185110242-4f30a8cb
   - Description: Build error detected: tests/qic/qic-loader.test.ts(6,32): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1088

1084. **build_error** (critical)
   - ID: qi-build_error-1765185110264-cb28d0ce
   - Description: Build error detected: tests/qic/qic-loader.test.ts(7,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1089

1085. **build_error** (critical)
   - ID: qi-build_error-1765185110286-31c8bdc4
   - Description: Build error detected: tests/qic/qiel-system.test.ts(12,37): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1090

1086. **build_error** (critical)
   - ID: qi-build_error-1765185110308-532c1a96
   - Description: Build error detected: tests/qic/qiel-system.test.ts(13,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1091

1087. **build_error** (critical)
   - ID: qi-build_error-1765185110331-e338d770
   - Description: Build error detected: tests/qic/qiel-system.test.ts(14,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1092

1088. **build_error** (critical)
   - ID: qi-build_error-1765185110353-10e2fb2b
   - Description: Build error detected: tests/qic/qiel-system.test.ts(15,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1093

1089. **build_error** (critical)
   - ID: qi-build_error-1765185110375-47bcdbd2
   - Description: Build error detected: tests/qic/qiel-system.test.ts(169,39): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1094

1090. **build_error** (critical)
   - ID: qi-build_error-1765185110397-2fa86c00
   - Description: Build error detected: tests/qic/qiel-system.test.ts(219,33): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1095

1091. **build_error** (critical)
   - ID: qi-build_error-1765185110421-a75f1b0e
   - Description: Build error detected: tests/qic/qiel-system.test.ts(300,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1096

1092. **build_error** (critical)
   - ID: qi-build_error-1765185110443-02f3b79b
   - Description: Build error detected: tests/qiel/env-diff.test.ts(13,36): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1097

1093. **build_error** (critical)
   - ID: qi-build_error-1765185110466-aef349f9
   - Description: Build error detected: tests/qiel/env-diff.test.ts(14,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1098

1094. **build_error** (critical)
   - ID: qi-build_error-1765185110487-3cbfab81
   - Description: Build error detected: tests/qiel/env-diff.test.ts(15,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1099

1095. **build_error** (critical)
   - ID: qi-build_error-1765185110509-1f7e98ce
   - Description: Build error detected: tests/qiel/env-diff.test.ts(16,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1100

1096. **build_error** (critical)
   - ID: qi-build_error-1765185110530-54e65b43
   - Description: Build error detected: tests/qiel/env-diff.test.ts(95,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1101

1097. **build_error** (critical)
   - ID: qi-build_error-1765185110553-3b601743
   - Description: Build error detected: tests/qiel/env-diff.test.ts(122,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1102

1098. **build_error** (critical)
   - ID: qi-build_error-1765185110574-80d4e843
   - Description: Build error detected: tests/qiel/env-diff.test.ts(137,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1103

1099. **build_error** (critical)
   - ID: qi-build_error-1765185110600-2399f0c5
   - Description: Build error detected: tests/qiel/env-diff.test.ts(155,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1104

1100. **build_error** (critical)
   - ID: qi-build_error-1765185110621-e8a2f862
   - Description: Build error detected: tests/qiel/env-diff.test.ts(169,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1105

1101. **build_error** (critical)
   - ID: qi-build_error-1765185110645-a1b7dc00
   - Description: Build error detected: tests/qiel/env-diff.test.ts(278,32): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1106

1102. **build_error** (critical)
   - ID: qi-build_error-1765185110666-838f86ef
   - Description: Build error detected: tests/qiel/env-diff.test.ts(290,41): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1107

1103. **build_error** (critical)
   - ID: qi-build_error-1765185110702-5c5e3611
   - Description: Build error detected: tests/qiel/env-diff.test.ts(328,38): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1108

1104. **build_error** (critical)
   - ID: qi-build_error-1765185110723-c1f086a7
   - Description: Build error detected: tests/qiel/env-diff.test.ts(333,41): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1109

1105. **build_error** (critical)
   - ID: qi-build_error-1765185110747-b176f7d0
   - Description: Build error detected: tests/qiel/qiel-alignment.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1110

1106. **build_error** (critical)
   - ID: qi-build_error-1765185110768-90e60d2f
   - Description: Build error detected: tests/qiel/qiel-alignment.test.ts(8,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1111

1107. **build_error** (critical)
   - ID: qi-build_error-1765185110791-4c39d92d
   - Description: Build error detected: tests/qiel/qiel-alignment.test.ts(10,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1112

1108. **build_error** (critical)
   - ID: qi-build_error-1765185110812-2a9e0317
   - Description: Build error detected: tests/qiel/qiel-alignment.test.ts(11,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1113

1109. **build_error** (critical)
   - ID: qi-build_error-1765185110835-ea7e2a4f
   - Description: Build error detected: tests/reasoning/engine.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1114

1110. **build_error** (critical)
   - ID: qi-build_error-1765185110857-f1573ce3
   - Description: Build error detected: tests/reasoning/engine.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1115

1111. **build_error** (critical)
   - ID: qi-build_error-1765185110881-4c3bcdd6
   - Description: Build error detected: tests/reasoning/engine.test.ts(217,26): error TS18047: 'snapshot.project' is possibly 'null'.
   - Source: build.log:1116

1112. **build_error** (critical)
   - ID: qi-build_error-1765185110902-8c795fa8
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1117

1113. **build_error** (critical)
   - ID: qi-build_error-1765185110925-b199899e
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1118

1114. **build_error** (critical)
   - ID: qi-build_error-1765185110947-fdd5e585
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(16,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1119

1115. **build_error** (critical)
   - ID: qi-build_error-1765185110970-7cf04a52
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(17,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1120

1116. **build_error** (critical)
   - ID: qi-build_error-1765185110992-961ee270
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(28,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1121

1117. **build_error** (critical)
   - ID: qi-build_error-1765185111016-b2918cea
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(36,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1122

1118. **build_error** (critical)
   - ID: qi-build_error-1765185111038-1430cd6c
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(124,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1123

1119. **build_error** (critical)
   - ID: qi-build_error-1765185111060-ce6e920c
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(214,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1124

1120. **build_error** (critical)
   - ID: qi-build_error-1765185111082-8f2991e3
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(281,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1125

1121. **build_error** (critical)
   - ID: qi-build_error-1765185111105-dc595b7a
   - Description: Build error detected: tests/reasoning/evolution/builder-impact.test.ts(333,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1126

1122. **build_error** (critical)
   - ID: qi-build_error-1765185111126-68e18eb5
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1127

1123. **build_error** (critical)
   - ID: qi-build_error-1765185111149-528b0e8d
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1128

1124. **build_error** (critical)
   - ID: qi-build_error-1765185111170-9594790c
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(15,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1129

1125. **build_error** (critical)
   - ID: qi-build_error-1765185111193-5fe1b03f
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(16,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1130

1126. **build_error** (critical)
   - ID: qi-build_error-1765185111215-cb07cbc7
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(26,44): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1131

1127. **build_error** (critical)
   - ID: qi-build_error-1765185111240-4c074bfd
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(30,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1132

1128. **build_error** (critical)
   - ID: qi-build_error-1765185111262-634a3b72
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(41,32): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1133

1129. **build_error** (critical)
   - ID: qi-build_error-1765185111285-e5aad6b1
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(99,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1134

1130. **build_error** (critical)
   - ID: qi-build_error-1765185111307-5cd1972b
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(201,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1135

1131. **build_error** (critical)
   - ID: qi-build_error-1765185111330-1aad0c55
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(229,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1136

1132. **build_error** (critical)
   - ID: qi-build_error-1765185111352-f0abdb36
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(297,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1137

1133. **build_error** (critical)
   - ID: qi-build_error-1765185111375-d7be95b3
   - Description: Build error detected: tests/reasoning/evolution/consolidation-integration.test.ts(307,36): error TS7006: Parameter 'f' implicitly has an 'any' type.
   - Source: build.log:1138

1134. **build_error** (critical)
   - ID: qi-build_error-1765185111397-f38567f5
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1139

1135. **build_error** (critical)
   - ID: qi-build_error-1765185111419-56ac720b
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1140

1136. **build_error** (critical)
   - ID: qi-build_error-1765185111442-ce4850b5
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(14,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1141

1137. **build_error** (critical)
   - ID: qi-build_error-1765185111466-cebd8246
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(15,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1142

1138. **build_error** (critical)
   - ID: qi-build_error-1765185111487-f12f68fe
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(26,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1143

1139. **build_error** (critical)
   - ID: qi-build_error-1765185111511-a6d05e41
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(38,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1144

1140. **build_error** (critical)
   - ID: qi-build_error-1765185111534-985b1f76
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(77,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1145

1141. **build_error** (critical)
   - ID: qi-build_error-1765185111569-a552cda2
   - Description: Build error detected: tests/reasoning/evolution/evolution-cycle.test.ts(99,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1146

1142. **build_error** (critical)
   - ID: qi-build_error-1765185111592-892baef4
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1147

1143. **build_error** (critical)
   - ID: qi-build_error-1765185111617-c42f7e3e
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1148

1144. **build_error** (critical)
   - ID: qi-build_error-1765185111638-a4fc197a
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(12,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1149

1145. **build_error** (critical)
   - ID: qi-build_error-1765185111661-f5e5d3ba
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(13,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1150

1146. **build_error** (critical)
   - ID: qi-build_error-1765185111683-d88cf159
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(23,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1151

1147. **build_error** (critical)
   - ID: qi-build_error-1765185111705-3ae2b2e1
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(31,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1152

1148. **build_error** (critical)
   - ID: qi-build_error-1765185111728-d6bff10c
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(38,37): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1153

1149. **build_error** (critical)
   - ID: qi-build_error-1765185111752-b5bba374
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(64,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1154

1150. **build_error** (critical)
   - ID: qi-build_error-1765185111773-838022ee
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(87,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1155

1151. **build_error** (critical)
   - ID: qi-build_error-1765185111797-69ad309b
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(95,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1156

1152. **build_error** (critical)
   - ID: qi-build_error-1765185111819-7a5afd8a
   - Description: Build error detected: tests/reasoning/evolution/governance-compliance.test.ts(133,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1157

1153. **build_error** (critical)
   - ID: qi-build_error-1765185111842-578ef8c4
   - Description: Build error detected: tests/reasoning/evolution/pattern-scoring.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1158

1154. **build_error** (critical)
   - ID: qi-build_error-1765185111864-8a22389d
   - Description: Build error detected: tests/reasoning/evolution/pattern-scoring.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1159

1155. **build_error** (critical)
   - ID: qi-build_error-1765185111887-e0a56d98
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1160

1156. **build_error** (critical)
   - ID: qi-build_error-1765185111909-1142f431
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1161

1157. **build_error** (critical)
   - ID: qi-build_error-1765185111933-dbd23c49
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(16,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1162

1158. **build_error** (critical)
   - ID: qi-build_error-1765185111956-9198b2c7
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(17,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1163

1159. **build_error** (critical)
   - ID: qi-build_error-1765185111980-19d53c09
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(38,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1164

1160. **build_error** (critical)
   - ID: qi-build_error-1765185112004-9e22a496
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(46,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1165

1161. **build_error** (critical)
   - ID: qi-build_error-1765185112028-b8fb9887
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(52,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1166

1162. **build_error** (critical)
   - ID: qi-build_error-1765185112051-b252fd86
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(145,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1167

1163. **build_error** (critical)
   - ID: qi-build_error-1765185112074-3bdfe7d6
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(203,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1168

1164. **build_error** (critical)
   - ID: qi-build_error-1765185112096-530998e4
   - Description: Build error detected: tests/reasoning/evolution/recovery-from-failure.test.ts(341,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1169

1165. **build_error** (critical)
   - ID: qi-build_error-1765185112119-65ed0411
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(6,44): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1170

1166. **build_error** (critical)
   - ID: qi-build_error-1765185112141-4aa3d7ea
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1171

1167. **build_error** (critical)
   - ID: qi-build_error-1765185112164-44be7568
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(16,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1172

1168. **build_error** (critical)
   - ID: qi-build_error-1765185112187-4f4b675e
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(17,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1173

1169. **build_error** (critical)
   - ID: qi-build_error-1765185112210-41611255
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(28,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1174

1170. **build_error** (critical)
   - ID: qi-build_error-1765185112232-9d67007a
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(36,21): error TS7006: Parameter 'file' implicitly has an 'any' type.
   - Source: build.log:1175

1171. **build_error** (critical)
   - ID: qi-build_error-1765185112256-fd7d4641
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(42,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1176

1172. **build_error** (critical)
   - ID: qi-build_error-1765185112277-1b6290ee
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(151,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1177

1173. **build_error** (critical)
   - ID: qi-build_error-1765185112300-69d67eb2
   - Description: Build error detected: tests/reasoning/evolution/regression-prevention.test.ts(303,7): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1178

1174. **build_error** (critical)
   - ID: qi-build_error-1765185112323-55441471
   - Description: Build error detected: tests/retirement/immutability.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1179

1175. **build_error** (critical)
   - ID: qi-build_error-1765185112346-ba9aebca
   - Description: Build error detected: tests/retirement/immutability.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1180

1176. **build_error** (critical)
   - ID: qi-build_error-1765185112368-e45809f9
   - Description: Build error detected: tests/retirement/integration.test.ts(6,38): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1181

1177. **build_error** (critical)
   - ID: qi-build_error-1765185112391-dd0da9a3
   - Description: Build error detected: tests/retirement/integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1182

1178. **build_error** (critical)
   - ID: qi-build_error-1765185112414-99517a77
   - Description: Build error detected: tests/retirement/integration.test.ts(9,16): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1183

1179. **build_error** (critical)
   - ID: qi-build_error-1765185112437-03c9505e
   - Description: Build error detected: tests/retirement/integration.test.ts(10,18): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1184

1180. **build_error** (critical)
   - ID: qi-build_error-1765185112459-4a481d98
   - Description: Build error detected: tests/retirement/integration.test.ts(13,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1185

1181. **build_error** (critical)
   - ID: qi-build_error-1765185112482-1f739e2a
   - Description: Build error detected: tests/retirement/reasoning-integration.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1186

1182. **build_error** (critical)
   - ID: qi-build_error-1765185112504-b4b14961
   - Description: Build error detected: tests/retirement/reasoning-integration.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1187

1183. **build_error** (critical)
   - ID: qi-build_error-1765185112527-e0ddb157
   - Description: Build error detected: tests/retirement/staleness-retirement.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1188

1184. **build_error** (critical)
   - ID: qi-build_error-1765185112549-6eabba4c
   - Description: Build error detected: tests/retirement/staleness-retirement.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1189

1185. **build_error** (critical)
   - ID: qi-build_error-1765185112584-fe664ad5
   - Description: Build error detected: tests/retirement/supersession-retirement.test.ts(6,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1190

1186. **build_error** (critical)
   - ID: qi-build_error-1765185112606-5a1f9167
   - Description: Build error detected: tests/retirement/supersession-retirement.test.ts(7,20): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1191

1187. **build_error** (critical)
   - ID: qi-build_error-1765185112630-91c03fb8
   - Description: Build error detected: tests/watchdog/qiw-integration.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1192

1188. **build_error** (critical)
   - ID: qi-build_error-1765185112652-70fe6d8e
   - Description: Build error detected: tests/watchdog/qiw-integration.test.ts(8,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1193

1189. **build_error** (critical)
   - ID: qi-build_error-1765185112676-0577b389
   - Description: Build error detected: tests/watchdog/qiw-integration.test.ts(9,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1194

1190. **build_error** (critical)
   - ID: qi-build_error-1765185112699-0a5bde10
   - Description: Build error detected: tests/watchdog/qiw-integration.test.ts(10,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1195

1191. **build_error** (critical)
   - ID: qi-build_error-1765185112723-23d141ad
   - Description: Build error detected: tests/watchdog/qiw.test.ts(7,30): error TS2307: Cannot find module 'node:test' or its corresponding type declarations.
   - Source: build.log:1196

1192. **build_error** (critical)
   - ID: qi-build_error-1765185112746-b19e2062
   - Description: Build error detected: tests/watchdog/qiw.test.ts(8,25): error TS2307: Cannot find module 'node:assert' or its corresponding type declarations.
   - Source: build.log:1197

1193. **build_error** (critical)
   - ID: qi-build_error-1765185112769-5b25f95a
   - Description: Build error detected: tests/watchdog/qiw.test.ts(9,21): error TS2307: Cannot find module 'fs' or its corresponding type declarations.
   - Source: build.log:1198

1194. **build_error** (critical)
   - ID: qi-build_error-1765185112792-dfe4f5de
   - Description: Build error detected: tests/watchdog/qiw.test.ts(10,23): error TS2307: Cannot find module 'path' or its corresponding type declarations.
   - Source: build.log:1199

1195. **build_error** (critical)
   - ID: qi-build_error-1765185112815-a7dcd221
   - Description: Build error detected: tests/watchdog/qiw.test.ts(259,36): error TS2580: Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node`.
   - Source: build.log:1200

## Auto-Generated Regression Tests

- **Tests Generated This Run**: 1195
- **Total Regression Tests**: 1195

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

**Timestamp**: 2025-12-08T09:11:52.846Z

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
