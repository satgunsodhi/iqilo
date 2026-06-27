import type { Course, DailyProtocol } from "@/lib/types";

export const INTRO_PROTOCOL: DailyProtocol = {
    synthesize:
        "20-30m: Read/watch beginner-friendly resources to understand the core idea, constraints, and why this pattern matters in campus coding rounds.",
    grind:
        "45-60m: Solve 2–4 easy/medium problems in Java, focusing on correctness first, then one pass and memory-aware solutions.",
    bridge:
        "20-30m: Attempt 1 slightly harder or timed problem (LeetCode or CSES) under light time pressure to simulate placement rounds.",
    template:
        "10-15m: Update your personal Java cheat sheet (I/O template, common utilities, and pattern snippets) from memory without copy-paste."
};

export const introProgrammingRoadmap: Course = {
    id: "intro-java-dsa-roadmap",
    title: "Java DSA Intro: Placement Foundations",
    description:
        "A 3-week, student-first introduction to Java-based data structures and algorithms focused on campus placements and online assessments. You’ll master core array/string/hashmap patterns, understand linear structures like linked lists and stacks, and build a strong foundational intuition for trees and graphs.",
    difficulty: "Beginner",
    tags: ["Arrays & Strings", "Binary Search", "Sliding Window", "Recursion", "LinkedLists", "Stacks & Queues", "Trees & Graphs"],
    estimatedHours: 45,
    category: "Algorithms",
    tagline: "Start from zero and reach confident, placement-ready DSA fluency in Java.",
    totalDays: 18,
    weeks: [
        {
            weekNumber: 1,
            title: "Java Template, Arrays, Strings & Basic Hashing",
            days: [
                {
                    dayNumber: 1,
                    title: "Java Setup & Competitive Template",
                    objective:
                        "Set up your Java environment, understand fast I/O (BufferedReader/StringTokenizer), and create a reusable template for online assessments.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Java Getting Started (Official Docs)",
                            url: "https://docs.oracle.com/javase/tutorial/getStarted/index.html"
                        },
                        {
                            label: "Fast I/O Patterns in Java for CP",
                            url: "https://codeforces.com/blog/entry/7018"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 1 — Two Sum",
                            url: "https://leetcode.com/problems/two-sum/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 217 — Contains Duplicate",
                            url: "https://leetcode.com/problems/contains-duplicate/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 242 — Valid Anagram",
                            url: "https://leetcode.com/problems/valid-anagram/"
                        }
                    ],
                    pitfall:
                        "Avoid over-engineering your template with complex nested classes; keep it a single file with fast I/O so it complies easily on platform compilers."
                },
                {
                    dayNumber: 2,
                    title: "Arrays Basics: Traversal & Linear Scans",
                    objective:
                        "Get comfortable iterating arrays, tracking running values, and optimizing native brute-force loops into clean linear-time passes.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Array Basics in Java (Official Tutorial)",
                            url: "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 121 — Best Time to Buy and Sell Stock",
                            url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 283 — Move Zeroes",
                            url: "https://leetcode.com/problems/move-zeroes/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 485 — Max Consecutive Ones",
                            url: "https://leetcode.com/problems/max-consecutive-ones/"
                        }
                    ],
                    pitfall:
                        "Don’t jump to complex data structures yet; first see if a single left-to-right pass with tracking variables can maintain the state you need."
                },
                {
                    dayNumber: 3,
                    title: "Strings & Two-Pointer Basics",
                    objective:
                        "Understand Java's String immutability, memory implications in the string pool, and leverage basic two-pointer techniques.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Strings in Java (Official Tutorial)",
                            url: "https://docs.oracle.com/javase/tutorial/java/data/strings.html"
                        },
                        {
                            label: "Two-Pointer Technique Overview",
                            url: "https://cp-algorithms.com/two_pointers/standard.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 125 — Valid Palindrome",
                            url: "https://leetcode.com/problems/valid-palindrome/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 344 — Reverse String",
                            url: "https://leetcode.com/problems/reverse-string/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 1768 — Merge Strings Alternately",
                            url: "https://leetcode.com/problems/merge-strings-alternately/"
                        }
                    ],
                    pitfall:
                        "Never append strings using '+' inside a loop; it creates endless garbage objects. Use StringBuilder or manipulate character arrays in-place."
                },
                {
                    dayNumber: 4,
                    title: "Hash Maps & Frequency Counting",
                    objective:
                        "Learn to use Java’s HashMap and HashSet to track element distributions, frequencies, and lookups in O(1) time.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "HashMap and HashSet in Java Documentation",
                            url: "https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 169 — Majority Element",
                            url: "https://leetcode.com/problems/majority-element/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 387 — First Unique Character in a String",
                            url: "https://leetcode.com/problems/first-unique-character-in-a-string/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 1207 — Unique Number of Occurrences",
                            url: "https://leetcode.com/problems/unique-number-of-occurrences/"
                        }
                    ],
                    pitfall:
                        "Remember that HashMaps incur autoboxing overhead when mapping primitives (e.g., int to Integer). For pure frequency arrays of fixed character sets, a simple int[] array is faster."
                },
                {
                    dayNumber: 5,
                    title: "Basic Binary Search",
                    objective:
                        "Master the traditional divide-and-conquer search approach on sorted spaces, focusing on boundaries and termination conditions.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Binary Search Implementation Details",
                            url: "https://cp-algorithms.com/num_methods/binary_search.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 704 — Binary Search",
                            url: "https://leetcode.com/problems/binary-search/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 35 — Search Insert Position",
                            url: "https://leetcode.com/problems/search-insert-position/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 74 — Search a 2D Matrix",
                            url: "https://leetcode.com/problems/search-a-2d-matrix/"
                        }
                    ],
                    pitfall:
                        "Calculate your midpoint using `mid = low + (high - low) / 2` instead of `(low + high) / 2` to avoid integer overflow bugs on massive input sizes."
                },
                {
                    dayNumber: 6,
                    title: "Week 1 Review & Foundations Challenge",
                    objective:
                        "Solidify array traversal, strings, basic maps, and classic binary search under a timed setting without learning new syntax.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "How to Analyze and Reflect After Practice Sessions",
                            url: "https://codeforces.com/blog/entry/18380"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 13 — Roman to Integer",
                            url: "https://leetcode.com/problems/roman-to-integer/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 26 — Remove Duplicates from Sorted Array",
                            url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 350 — Intersection of Two Arrays II",
                            url: "https://leetcode.com/problems/intersection-of-two-arrays-ii/"
                        }
                    ],
                    pitfall:
                        "Treat this day as a simulated coding round. If you struggle, note down whether the bottleneck was syntax translation or logic clarity."
                }
            ]
        },
        {
            weekNumber: 2,
            title: "Advanced Linear Patterns, Recursion & 1D DP",
            days: [
                {
                    dayNumber: 7,
                    title: "Sliding Window Fundamentals",
                    objective:
                        "Learn how to maintain a dynamic or fixed moving window over arrays to handle contiguous subarray criteria efficiently.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Sliding Window Pattern Overview",
                            url: "https://leetcode.com/discuss/general-discussion/657398/"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 1456 — Maximum Number of Vowels in a Substring",
                            url: "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 1004 — Max Consecutive Ones III",
                            url: "https://leetcode.com/problems/max-consecutive-ones-iii/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 1493 — Longest Subarray of 1's After Deleting One Element",
                            url: "https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/"
                        }
                    ],
                    pitfall:
                        "Don't slice or recalculate window contents from scratch inside the loop. Adjust the state incrementally by handling only the incoming right element and outgoing left element."
                },
                {
                    dayNumber: 8,
                    title: "Prefix Sums & Subarray Optimization",
                    objective:
                        "Utilize prefix running totals combined with hashing to find arbitrary subarray targets in a single sweep.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Prefix Sums Concept & Applications",
                            url: "https://leetcode.com/discuss/general-discussion/563022/prefix-sum-for-beginners/"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 724 — Find Pivot Index",
                            url: "https://leetcode.com/problems/find-pivot-index/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 560 — Subarray Sum Equals K",
                            url: "https://leetcode.com/problems/subarray-sum-equals-k/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 238 — Product of Array Except Self",
                            url: "https://leetcode.com/problems/product-of-array-except-self/"
                        }
                    ],
                    pitfall:
                        "When storing prefix sums in a map, always pre-populate your base case `map.put(0, 1)` or `map.put(0, -1)` depending on the query target, or you'll drop edge subarrays starting at index 0."
                },
                {
                    dayNumber: 9,
                    title: "Binary Search on Answers (Monotonic Spaces)",
                    objective:
                        "Apply binary search to optimization problems where the validity of answers follows a predictable, monotonic path.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Binary Search on Answer Range Explained",
                            url: "https://codeforces.com/blog/entry/67509"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 162 — Find Peak Element",
                            url: "https://leetcode.com/problems/find-peak-element/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 875 — Koko Eating Bananas",
                            url: "https://leetcode.com/problems/koko-eating-bananas/"
                        }
                    ],
                    pitfall:
                        "Clearly map out your feasibility check function. Ensure the boundary conditions accurately shrink the search window without causing infinite loop lockups."
                },
                {
                    dayNumber: 10,
                    title: "Recursion Stack & Backtracking Foundations",
                    objective:
                        "Understand the execution stack frames and master decision-tree traversals to build combinations and permutations.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Recursion and State Space Trees",
                            url: "https://www.geeksforgeeks.org/recursion/"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 509 — Fibonacci Number",
                            url: "https://leetcode.com/problems/fibonacci-number/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 39 — Combination Sum",
                            url: "https://leetcode.com/problems/combination-sum/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 22 — Generate Parentheses",
                            url: "https://leetcode.com/problems/generate-parentheses/"
                        }
                    ],
                    pitfall:
                        "Forgetting to perform the 'undo' action on shared state collections (like lists or path builders) will leak invalid path variables into parallel recursive branches."
                },
                {
                    dayNumber: 11,
                    title: "Introduction to 1D Dynamic Programming",
                    objective:
                        "Transition from exponential recursion to polynomial states using bottom-up tabulation for sequential transitions.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Demystifying Tabulation vs Memoization",
                            url: "https://cp-algorithms.com/dp/knapsack.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 70 — Climbing Stairs",
                            url: "https://leetcode.com/problems/climbing-stairs/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 746 — Min Cost Climbing Stairs",
                            url: "https://leetcode.com/problems/min-cost-climbing-stairs/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 198 — House Robber",
                            url: "https://leetcode.com/problems/house-robber/"
                        }
                    ],
                    pitfall:
                        "Do not attempt complex multi-dimensional states right away. Focus exclusively on how array index `dp[i]` depends cleanly on `dp[i-1]` or `dp[i-2]`."
                },
                {
                    dayNumber: 12,
                    title: "Week 2 Placement Mock Assessment",
                    objective:
                        "Simulate a real online technical screening round incorporating arrays, sliding windows, and initial structural transitions.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Simulating Coding Assessments Under Strict Timers",
                            url: "https://leetcode.com/discuss/general-discussion/1059473/"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 11 — Container With Most Water",
                            url: "https://leetcode.com/problems/container-with-most-water/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 1343 — Sub-arrays of Size K Above Threshold",
                            url: "https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 53 — Maximum Subarray",
                            url: "https://leetcode.com/problems/maximum-subarray/"
                        }
                    ],
                    pitfall:
                        "Keep an eye on the clock. If you get stuck on a problem for more than 30 minutes, write down your partial logic or brute force to lock in partial credit strategy."
                }
            ]
        },
        {
            weekNumber: 3,
            title: "Linked Lists, Non-Linear Structs, Stacks & Queues",
            days: [
                {
                    dayNumber: 13,
                    title: "Linked List Reference Manipulation",
                    objective:
                        "Master manual pointer/reference management by traversing, reversing, and detecting loops inside linear structural nodes.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Linked List Fundamentals & Pointer Operations",
                            url: "https://cp-algorithms.com/data_structures/deleting_from_list.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 206 — Reverse Linked List",
                            url: "https://leetcode.com/problems/reverse-linked-list/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 141 — Linked List Cycle",
                            url: "https://leetcode.com/problems/linked-list-cycle/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 21 — Merge Two Sorted Lists",
                            url: "https://leetcode.com/problems/merge-two-sorted-lists/"
                        }
                    ],
                    pitfall:
                        "Always draw node configurations out on paper. Forgetting to handle edge nodes like `head == null` or `head.next == null` will trigger immediate NullPointerExceptions."
                },
                {
                    dayNumber: 14,
                    title: "Stacks, Queues & Monotonic Sequences",
                    objective:
                        "Utilize linear LIFO/FIFO collections to orchestrate order tracking, structural simulations, and linear monotonic arrays.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Stack and Queue Practical Applications",
                            url: "https://cp-algorithms.com/data_structures/stack_queue.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 20 — Valid Parentheses",
                            url: "https://leetcode.com/problems/valid-parentheses/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 232 — Implement Queue using Stacks",
                            url: "https://leetcode.com/problems/implement-queue-using-stacks/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 739 — Daily Temperatures",
                            url: "https://leetcode.com/problems/daily-temperatures/"
                        }
                    ],
                    pitfall:
                        "In Java, avoid using the legacy `Stack` class because it is synchronized and has performance overhead. Prefer the `ArrayDeque` collection for both Stack and Queue operations."
                },
                {
                    dayNumber: 15,
                    title: "Hierarchical Traversal: Binary Trees",
                    objective:
                        "Understand structural node configurations and build structural depth using classic recursive DFS and iterative level-order BFS.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Tree Representation Basics",
                            url: "https://cp-algorithms.com/data_structures/tree_basic.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 104 — Maximum Depth of Binary Tree",
                            url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 102 — Binary Tree Level Order Traversal",
                            url: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 112 — Path Sum",
                            url: "https://leetcode.com/problems/path-sum/"
                        }
                    ],
                    pitfall:
                        "Don’t assume tree structures are perfectly balanced. Always evaluate your space boundaries based on worst-case degenerate trees (skewed trees)."
                },
                {
                    dayNumber: 16,
                    title: "Binary Search Trees (BST) & Ordered Operations",
                    objective:
                        "Leverage organized node characteristics to achieve targeted searches, structural insertions, and removals within logarithmic bounds.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "BST Specific Rules & Invariants",
                            url: "https://cp-algorithms.com/data_structures/tree_basic.html#binary-search-tree"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 700 — Search in a Binary Search Tree",
                            url: "https://leetcode.com/problems/search-in-a-binary-search-tree/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 701 — Insert into a Binary Search Tree",
                            url: "https://leetcode.com/problems/insert-into-a-binary-search-tree/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 98 — Validate Binary Search Tree",
                            url: "https://leetcode.com/problems/validate-binary-search-tree/"
                        }
                    ],
                    pitfall:
                        "When verifying structural correctness, checking if a node is simply larger than its left child and smaller than its right child is insufficient. You must carry proper minimum and maximum limits down your recursion paths."
                },
                {
                    dayNumber: 17,
                    title: "Graph Traversal & Adjacency Structures",
                    objective:
                        "Map custom mesh topologies into standard adjacency configurations and track nodes using simple matrix traversals.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Graph Implementations & Explorations",
                            url: "https://cp-algorithms.com/graph/depth-first-search.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 200 — Number of Islands",
                            url: "https://leetcode.com/problems/number-of-islands/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 547 — Number of Provinces",
                            url: "https://leetcode.com/problems/number-of-provinces/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 994 — Rotting Oranges",
                            url: "https://leetcode.com/problems/rotting-oranges/"
                        }
                    ],
                    pitfall:
                        "Always maintain a robust state tracking mechanism (like a `boolean[] visited` array or in-place value overrides) or your explorations will drop into infinite cyclic loops."
                },
                {
                    dayNumber: 18,
                    title: "Comprehensive Comprehensive Placement Simulation",
                    objective:
                        "Synthesize everything you've learned over the last 18 days in a full, multi-pattern mock test designed to mirror a tier-1 technical screening environment.",
                    protocol: INTRO_PROTOCOL,
                    resources: [
                        {
                            label: "Strategies for Advancing to Intermediate/Hard Target Tasks",
                            url: "https://leetcode.com/discuss/general-discussion/1179774/"
                        }
                    ],
                    practice: [
                        {
                            platform: "leetcode",
                            label: "LC 394 — Decode String",
                            url: "https://leetcode.com/problems/decode-string/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 2390 — Removing Stars From a String",
                            url: "https://leetcode.com/problems/removing-stars-from-a-string/"
                        },
                        {
                            platform: "leetcode",
                            label: "LC 102 — Binary Tree Level Order Traversal (Timed Retry)",
                            url: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
                        }
                    ],
                    pitfall:
                        "Don’t evaluate success solely based on whether all test cases passed. Look at your overall improvement in identifying structural patterns early and setting up your fast input configurations cleanly."
                }
            ]
        }
    ]
};