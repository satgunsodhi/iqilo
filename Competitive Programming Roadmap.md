## **4-Week Java Competitive Programming Roadmap** 

_An exhaustive, high-fidelity curriculum for Online Assessment preparation._ 

## **Daily Execution Protocol** 

- **Synthesize (30m):** Read/watch conceptual resources to understand underlying invariants. 

- **Grind (60-90m):** Solve LeetCode problems in Java. Focus on execution speed and defensive programming. 

- **Bridge (30m):** Tackle the designated CSES problem. These feature strict timelines and memory ceilings. 

- **Template (15m):** Re-write the underlying template class in your clean cheat sheet file from scratch. 

## **Week 1: Graph Mastery + Monotonic Stack** 

## **Day 1: Dijkstra’s Shortest Path** 

- **Objective:** Find single-source shortest paths on positive-weighted graphs in _O_ (( _V_ + _E_ ) log _V_ ) time. 

- **Resources:** CP-Algorithms | Fiset Video 

- **Practice:** LC: 743, 1631 | CSES: Shortest Routes I 

- **Pitfall:** Avoid customized class wrappers for `PriorityQueue` . Use flat `int[]` arrays like `new int[]{node, weight}` with `(a, b) -> Integer.compare(a[1], b[1])` to avoid overhead. 

## **Day 2: Bellman-Ford & SPFA** 

- **Objective:** Solve single-source shortest path problems with negative edge weights and detect negative cycles. 

- **Resources:** CP-Algorithms: Bellman-Ford 

- **Practice:** LC: 787, 1334 | CSES: Shortest Routes II 

- **Pitfall:** In the _K_ -relaxation variant, create a deep copy of the distance array before the current relaxation pass to avoid using path improvements achieved within the same step. 

## **Day 3: Union-Find (DSU)** 

- **Objective:** Maintain disjoint dynamic sets with near-constant time operations using path compression & union by rank. 

- **Resources:** Fiset: Disjoint Set Video 

- **Practice:** LC: 323, 684, 721 | CSES: Building Roads 

- **Pitfall:** Skip structural node representations. Pack state directly into flat arrays: `int[] parent` and `int[] rank` to keep memory cache-friendly. 

## **Day 4: Topological Sort** 

- **Objective:** Find linear ordering of vertices in Directed Acyclic Graphs (DAG) via Kahn’s BFS or DFS post-order. 

- **Resources:** CP-Algorithms: Topological Sort 

- **Practice:** LC: 207, 210 | CSES: Course Schedule 

- **Pitfall:** Track visited nodes with primitive tracking array `int[] state` (0 = unvisited, 1 = visiting, 2 = visited) instead of costly object collections to spot cycles easily. 

## **Day 5: Tarjan’s Bridge & Articulation** 

- **Objective:** Detect edges/nodes whose removal increases the number of connected components in _O_ ( _V_ + _E_ ) time. 

- **Resources:** Fiset: Bridges & Articulation Points 

- **Practice:** LC: 1192, 1319 | CSES: Building Teams 

- **Pitfall:** Avoid recursive call stack exhaustion for large graph sizes ( _V ≥_ 10[5] ). Optimize your DFS or increase stack limits if the platform allows it. 

## **Day 6: Advanced Monotonic Stack** 

- **Objective:** Solve range queries for nearest larger/smaller values in _O_ ( _N_ ) using a structured monotonic stack. 

- **Resources:** CP-Algorithms: Minimum Stack 

- **Practice:** LC: 84, 907, 402 | CSES: Nearest Smaller Values 

- **Pitfall:** Never use `java.util.Stack` as it is synchronized and slow. Prefer a fast, array-backed deque model ( `java.util.ArrayDeque` ) or an explicit array pointer. 

## **Day 7: Timed OA Simulation #1** 

- **Objective:** Accustom yourself to tight deadline pressures, testing frameworks, and unfamiliar algorithmic sets. 

- **Tasks:** 1. Archived **Codeforces Div. 2 Contest** (A to D) | 2. **90-minute** timer | 3. Post-contest analysis | 4. Update _Gotcha Log_ . 

## **Week 2: Binary Search + Segment Tree + BIT** 

## **Day 8: Binary Search on Answer** 

- **Objective:** Locate the optimal valid state within monotonic search bounds in _O_ ( _N_ log(range)) time. 

- **Resources:** Modified Binary Search Pattern 

- **Practice:** LC: 410, 1011 | CSES: Factory Machines 

1 

- **Pitfall:** Prevent numerical overflows. Ensure boundary computation uses `mid = lo + (hi - lo) / 2` instead of `(lo + hi) / 2` . 

## **Day 9: Segment Tree (Point Update)** 

- **Objective:** Build a range-query data engine capable of dynamic modifications and queries in _O_ (log _N_ ) time. 

- **Resources:** CP-Algorithms: Segment Trees 

- **Practice:** LC: 307, 315 | CSES: Range Minimum Queries II 

- **Pitfall:** Implement trees using flat array layouts size 4 _N_ to boost execution, avoiding object pointers and GC overhead. 

## **Day 10: Segment Tree (Lazy Propagation)** 

- **Objective:** Generalize Segment Trees to handle range updates and range queries simultaneously in _O_ (log _N_ ) time. 

- **Resources:** CP-Algorithms: Lazy Propagation 

- **Practice:** LC: 732, 699 | CSES: Range Update Queries 

- **Pitfall:** Always apply lazy updates downward to child nodes _before_ executing mutations or evaluation logic. 

## **Day 11: Fenwick Tree (BIT)** 

- **Objective:** Maintain prefix sum arrays and carry out dynamic adjustments inside a lightweight space footprint. 

- **Resources:** CP-Algorithms: Fenwick Tree 

- **Practice:** LC: 315, 1649 | CSES: Range Sum Queries I 

- **Pitfall:** Keep the tree structure 1-indexed to enable rapid progression using fast bitwise updates: `idx += (idx & -idx)` . 

## **Day 12: Interval DP** 

- **Objective:** Compute global optimum states for segments [ _i, j_ ] by partitioning into subproblems. 

- **Resources:** Errichto: DP Tutorials 

- **Practice:** LC: 312, 664, 1000 | CSES: Removal Game 

- **Pitfall:** Structure nested loops with `length` as outer variable, then `start indices` , then `partition points` . 

## **Day 13: KMP & Z-Algorithm** 

- **Objective:** Perform linear-time pattern searches and locate repeating prefixes inside strings in _O_ ( _N_ + _M_ ) time. 

- **Resources:** CP-Algorithms: KMP | Z-function 

- **Practice:** LC: 28, 214 | CSES: String Matching 

- **Pitfall:** Avoid `String.substring()` in loops to prevent memory limits. Convert inputs to primitive arrays ( `char[] s = str.toCharArray()` ) first. 

## **Day 14: Timed OA Simulation #2** 

- **Objective:** Learn to divide limited testing hours effectively across mixed-difficulty problem tasks. 

- **Tasks:** 1. Archived **LeetCode Weekly Contest** | 2. **90-minute** block | 3. Solve 3 problems cleanly within 50m | 4. Edge-case validation for P4. 

## **Week 3: Bitmask, Trees, Digit DP & Number Theory** 

## **Day 15: Bitmask DP (Foundations)** 

- **Objective:** Compute state transitions for NP-Hard routing problems across subsets up to size _N ≈_ 20. 

- **Resources:** Colin Galen: Bitmask DP 

- **Practice:** LC: 698, 464 | CSES: Elevator Rides 

- **Pitfall:** Pre-calculate subset submask configurations using bitwise arithmetic before executing the main recursion step to avoid duplicate work. 

## **Day 16: Bitmask DP (TSP / Assignment)** 

- **Objective:** Apply bitmask states to coordinate assignments and calculate minimum traveling paths. 

- **Resources:** CP-Algorithms: Bitmask DP 

- **Practice:** LC: 847, 1879 | CSES: Counting Tilings 

- **Pitfall:** Initialize memoization matrices with _−_ 1 (or sentinels) using `Arrays.fill()` . Do not rely on default 0 values, as 0 can be a valid sub-solution. 

## **Day 17: DP on Trees (Subtree Recursion)** 

- **Objective:** Calculate optimal subtree arrangements by combining recursive bottom-up tree structures. 

- **Resources:** William Fiset: Tree DP 

- **Practice:** LC: 337, 968 | CSES: Tree Matching 

- **Pitfall:** Return small, fixed primitive arrays ( `new int[]{include, exclude}` ) from DFS to group state outputs and avoid object allocations. 

## **Day 18: DP on Trees (Rerooting Technique)** 

- **Objective:** Solve optimization problems relative to every possible node using a two-pass DFS approach. 

- **Resources:** CP-Algorithms: Tree Rerooting 

2 

- **Practice:** LC: 834, 1339 | CSES: Tree Distances I 

- **Pitfall:** Use the 1st DFS to gather standard bottom-up state counts, then use a 2nd top-down DFS to distribute and update parent attributes. 

## **Day 19: Digit DP** 

- **Objective:** Count occurrences of specific digit patterns across ranges [ _L, R_ ] in _O_ (digits _·_ states) time. 

- **Resources:** Codeforces Tutorial: Digit DP 

- **Practice:** LC: 357, 902 | CSES: Counting Numbers 

- **Pitfall:** Design the recursion state to include a `tight` bit flag to indicate if you are currently restricted by the upper limit bounds of the input range. 

## **Day 20: Number Theory (Sieve, ModPow)** 

- **Objective:** Perform calculations with primes, modular exponentiation, and multiplicative inverses in _O_ (log(exp)). 

- **Resources:** CP-Algorithms: Sieve & Mod Inverse 

- **Practice:** LC: 204, 372, 878 | CSES: Counting Divisors 

- **Pitfall:** Cast intermediate calculations to `long` when computing modular multiplications to prevent wrapping errors: `int res = (int) (((long) a * b) % MOD)` . 

## **Day 21: Timed OA Simulation #3** 

- **Objective:** Simulate the conditions and requirements of highly competitive technical assessments. 

- **Tasks:** 1. Unyielding **3-hour** block | 2. 3-problem set from **Codeforces Gym** | 3. 45 min per problem limit | 4. Write brute-force for partials if stuck. 

## **Week 4: Hard Consolidation + Full Mocks** 

## **Day 22: Two-Heap Pattern** 

- **Objective:** Track dynamic medians inside stream structures in _O_ (log _N_ ) insertion and _O_ (1) query time. 

- **Resources:** Grokking Pattern: Two Heaps 

- **Practice:** LC: 295, 480 | CSES: Josephus Problem II 

- **Pitfall:** Keep min-heap and max-heap balanced. Ensure element removals (sliding window dropouts) are tracked correctly to prevent heap mismatches. 

## **Day 23: Advanced Sliding Window & Two-Pointer** 

- **Objective:** Find longest/shortest contiguous subsegments matching criteria in linear _O_ ( _N_ ) sweeps. 

- **Resources:** Grokking Pattern: Sliding Window 

- **Practice:** LC: 992, 76 | CSES: Playlist 

- **Pitfall:** Use flat, array-backed frequency tables ( `int[] count = new int[128]` ) instead of map wrappers for ASCII inputs to optimize lookup performance. 

## **Day 24: Advanced Trie (XOR Trie)** 

- **Objective:** Solve maximum XOR range queries in _O_ (30) bits using binary bit-trie structures. 

- **Resources:** CP-Algorithms: Trie 

- **Practice:** LC: 421, 212 | CSES: Finding Patterns 

- **Pitfall:** When writing XOR Tries, represent children using binary sub-arrays: `TrieNode[] children = new TrieNode[2]` . Simplifies bitwise traversal. 

## **Day 25: Polynomial Rolling Hash** 

- **Objective:** Search for substrings and check sequence equality in near-instant _O_ (1) time. 

- **Resources:** CP-Algorithms: String Hashing 

- **Practice:** LC: 1044, 686 | CSES: Finding Periods 

- **Pitfall:** Use double hashing with two different prime bases (e.g., 10[9] + 7 and 10[9] + 9) to prevent hash collisions on adversarial test suites. 

## **Day 26: Speed Round (Hard DP Revision)** 

- **Objective:** Re-solve complex dynamic programming tasks from memory to sharpen implementation fluency. 

- **Tasks:** 1. Re-implement: 312, 664, 834 | 2. **25 min limit** per problem without resources | 3. Double-check bounds, bases, and optimizations. 

## **Day 27: Timed OA Simulation #4** 

- **Objective:** Simulate the dynamic nature of top-tier coding evaluations. 

- **Tasks:** 1. **LeetCode Weekly Contest** (late 2024/2025) | 2. **3-hour** limit | 3. Solve 3 problems cleanly within 70m | 4. Audit boundary edge cases. 

## **Day 28: Timed OA Simulation #5 + Weak Spot Drill** 

- **Objective:** Turn remaining weak points into strengths before the final review. 

- **Tasks:** 1. Final **3-hour** Codeforces/HackerRank challenge | 2. Identify top 2 weak topics from _Gotcha Log_ | 3. Drill for 60m with targeted practice. 

3 

## **Day 29: Gotcha Log Audit & Template Polish** 

- **Objective:** Audit your knowledge base and verify that all templates are ready to use. 

- **Tasks:** 1. Review _Gotcha Log_ bugs | 2. Re-write the 12 master templates from scratch | 3. Fix minor bugs, index issues, or variable names in repository. 

## **Day 30: Targeted Review & Rest** 

- **Objective:** Complete final preparations and transition into an optimal state of readiness. 

- **Tasks:** 1. Solve 3 comfortable, medium-difficulty problems | 2. Avoid starting new topics | 3. Clear your mind and rest well for upcoming assessments. 

4 

