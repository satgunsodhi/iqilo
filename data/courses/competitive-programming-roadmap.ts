import type { Course, DailyProtocol } from "@/lib/types";

export const STANDARD_PROTOCOL: DailyProtocol = {
  synthesize:
    "Read/watch conceptual resources to understand underlying invariants (30m).",
  grind:
    "Solve LeetCode problems in Java. Focus on execution speed and defensive programming (60-90m).",
  bridge:
    "Tackle the designated CSES problem. These feature strict timelines and memory ceilings (30m).",
  template:
    "Re-write the underlying template class in your clean cheat sheet file from scratch (15m).",
};

export const competitiveProgrammingRoadmap: Course = {
  id: "competitive-programming-roadmap",
  title: "Java CP Core: Graphs, DP & OA Prep",
  description:
    "An exhaustive, high-fidelity curriculum for Online Assessment preparation covering graphs, DP, data structures, and timed mock assessments.",
  difficulty: "Advanced",
  tags: ["Java", "Graphs", "Dynamic Programming", "OA Prep", "CSES", "LeetCode"],
  estimatedHours: 90,
  category: "Algorithms",
  tagline: "Ace your OA with graph mastery, DP, and timed simulations.",
  totalDays: 30,
  weeks: [
    {
      weekNumber: 1,
      title: "Graph Mastery + Monotonic Stack",
      days: [
        {
          dayNumber: 1,
          title: "Dijkstra's Shortest Path",
          objective:
            "Find single-source shortest paths on positive-weighted graphs in O((V + E) log V) time.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Dijkstra",
              url: "https://cp-algorithms.com/graph/dijkstra.html",
            },
            {
              label: "Fiset: Dijkstra's Algorithm",
              url: "https://www.youtube.com/watch?v=pSqmAO-m7Lk",
              embed: "youtube",
            },
          ],
          practice: [
            {
              label: "LC 743 — Network Delay Time",
              url: "https://leetcode.com/problems/network-delay-time/",
              platform: "leetcode",
            },
            {
              label: "LC 1631 — Path With Minimum Effort",
              url: "https://leetcode.com/problems/path-with-minimum-effort/",
              platform: "leetcode",
            },
            {
              label: "CSES — Shortest Routes I",
              url: "https://cses.fi/problemset/task/1671/",
              platform: "cses",
            },
          ],
          pitfall:
            "Avoid customized class wrappers for PriorityQueue. Use flat int[] arrays like new int[]{node, weight} with (a, b) -> Integer.compare(a[1], b[1]) to avoid overhead.",
        },
        {
          dayNumber: 2,
          title: "Bellman-Ford & SPFA",
          objective:
            "Solve single-source shortest path problems with negative edge weights and detect negative cycles.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Bellman-Ford",
              url: "https://cp-algorithms.com/graph/bellman_ford.html",
            },
          ],
          practice: [
            {
              label: "LC 787 — Cheapest Flights Within K Stops",
              url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",
              platform: "leetcode",
            },
            {
              label: "LC 1334 — Find the City With the Smallest Number of Neighbors",
              url: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/",
              platform: "leetcode",
            },
            {
              label: "CSES — Shortest Routes II",
              url: "https://cses.fi/problemset/task/1672/",
              platform: "cses",
            },
          ],
          pitfall:
            "In the K-relaxation variant, create a deep copy of the distance array before the current relaxation pass to avoid using path improvements achieved within the same step.",
        },
        {
          dayNumber: 3,
          title: "Union-Find (DSU)",
          objective:
            "Maintain disjoint dynamic sets with near-constant time operations using path compression & union by rank.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "Fiset: Disjoint Set Union",
              url: "https://www.youtube.com/watch?v=KbFlZYCpONM",
              embed: "youtube",
            },
          ],
          practice: [
            {
              label: "LC 323 — Number of Connected Components",
              url: "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
              platform: "leetcode",
            },
            {
              label: "LC 684 — Redundant Connection",
              url: "https://leetcode.com/problems/redundant-connection/",
              platform: "leetcode",
            },
            {
              label: "LC 721 — Accounts Merge",
              url: "https://leetcode.com/problems/accounts-merge/",
              platform: "leetcode",
            },
            {
              label: "CSES — Building Roads",
              url: "https://cses.fi/problemset/task/1666/",
              platform: "cses",
            },
          ],
          pitfall:
            "Skip structural node representations. Pack state directly into flat arrays: int[] parent and int[] rank to keep memory cache-friendly.",
        },
        {
          dayNumber: 4,
          title: "Topological Sort",
          objective:
            "Find linear ordering of vertices in Directed Acyclic Graphs (DAG) via Kahn's BFS or DFS post-order.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Topological Sort",
              url: "https://cp-algorithms.com/graph/topological-sort.html",
            },
          ],
          practice: [
            {
              label: "LC 207 — Course Schedule",
              url: "https://leetcode.com/problems/course-schedule/",
              platform: "leetcode",
            },
            {
              label: "LC 210 — Course Schedule II",
              url: "https://leetcode.com/problems/course-schedule-ii/",
              platform: "leetcode",
            },
            {
              label: "CSES — Course Schedule",
              url: "https://cses.fi/problemset/task/1679/",
              platform: "cses",
            },
          ],
          pitfall:
            "Track visited nodes with primitive tracking array int[] state (0 = unvisited, 1 = visiting, 2 = visited) instead of costly object collections to spot cycles easily.",
        },
        {
          dayNumber: 5,
          title: "Tarjan's Bridge & Articulation",
          objective:
            "Detect edges/nodes whose removal increases the number of connected components in O(V + E) time.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "Fiset: Bridges & Articulation Points",
              url: "https://www.youtube.com/watch?v=aZXi1clj8fA",
              embed: "youtube",
            },
          ],
          practice: [
            {
              label: "LC 1192 — Critical Connections in a Network",
              url: "https://leetcode.com/problems/critical-connections-in-a-network/",
              platform: "leetcode",
            },
            {
              label: "LC 1319 — Number of Operations to Make Network Connected",
              url: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/",
              platform: "leetcode",
            },
            {
              label: "CSES — Building Teams",
              url: "https://cses.fi/problemset/task/1668/",
              platform: "cses",
            },
          ],
          pitfall:
            "Avoid recursive call stack exhaustion for large graph sizes (V ≥ 10⁵). Optimize your DFS or increase stack limits if the platform allows it.",
        },
        {
          dayNumber: 6,
          title: "Advanced Monotonic Stack",
          objective:
            "Solve range queries for nearest larger/smaller values in O(N) using a structured monotonic stack.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Stack Modifications",
              url: "https://cp-algorithms.com/data_structures/stack.html",
            },
          ],
          practice: [
            {
              label: "LC 84 — Largest Rectangle in Histogram",
              url: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
              platform: "leetcode",
            },
            {
              label: "LC 907 — Sum of Subarray Minimums",
              url: "https://leetcode.com/problems/sum-of-subarray-minimums/",
              platform: "leetcode",
            },
            {
              label: "LC 402 — Remove K Digits",
              url: "https://leetcode.com/problems/remove-k-digits/",
              platform: "leetcode",
            },
            {
              label: "CSES — Nearest Smaller Values",
              url: "https://cses.fi/problemset/task/1473/",
              platform: "cses",
            },
          ],
          pitfall:
            "Never use java.util.Stack as it is synchronized and slow. Prefer a fast, array-backed deque model (java.util.ArrayDeque) or an explicit array pointer.",
        },
        {
          dayNumber: 7,
          title: "Timed OA Simulation #1",
          objective:
            "Accustom yourself to tight deadline pressures, testing frameworks, and unfamiliar algorithmic sets.",
          tasks: [
            "Archived Codeforces Div. 2 Contest (A to D)",
            "90-minute timer",
            "Post-contest analysis",
            "Update Gotcha Log",
          ],
        },
      ],
    },
    {
      weekNumber: 2,
      title: "Binary Search + Segment Tree + BIT",
      days: [
        {
          dayNumber: 8,
          title: "Binary Search on Answer",
          objective:
            "Locate the optimal valid state within monotonic search bounds in O(N log(range)) time.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "Modified Binary Search Pattern",
              url: "https://emre.me/patterns/modified-binary-search/",
            },
          ],
          practice: [
            {
              label: "LC 410 — Split Array Largest Sum",
              url: "https://leetcode.com/problems/split-array-largest-sum/",
              platform: "leetcode",
            },
            {
              label: "LC 1011 — Capacity To Ship Packages Within D Days",
              url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",
              platform: "leetcode",
            },
            {
              label: "CSES — Factory Machines",
              url: "https://cses.fi/problemset/task/1620/",
              platform: "cses",
            },
          ],
          pitfall:
            "Prevent numerical overflows. Ensure boundary computation uses mid = lo + (hi - lo) / 2 instead of (lo + hi) / 2.",
        },
        {
          dayNumber: 9,
          title: "Segment Tree (Point Update)",
          objective:
            "Build a range-query data engine capable of dynamic modifications and queries in O(log N) time.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Segment Trees",
              url: "https://cp-algorithms.com/data_structures/segment_tree.html",
            },
          ],
          practice: [
            {
              label: "LC 307 — Range Sum Query - Mutable",
              url: "https://leetcode.com/problems/range-sum-query-mutable/",
              platform: "leetcode",
            },
            {
              label: "LC 315 — Count of Smaller Numbers After Self",
              url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
              platform: "leetcode",
            },
            {
              label: "CSES — Range Minimum Queries II",
              url: "https://cses.fi/problemset/task/1649/",
              platform: "cses",
            },
          ],
          pitfall:
            "Implement trees using flat array layouts size 4N to boost execution, avoiding object pointers and GC overhead.",
        },
        {
          dayNumber: 10,
          title: "Segment Tree (Lazy Propagation)",
          objective:
            "Generalize Segment Trees to handle range updates and range queries simultaneously in O(log N) time.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Lazy Propagation",
              url: "https://cp-algorithms.com/data_structures/segment_tree.html",
            },
          ],
          practice: [
            {
              label: "LC 732 — My Calendar III",
              url: "https://leetcode.com/problems/my-calendar-iii/",
              platform: "leetcode",
            },
            {
              label: "LC 699 — Falling Squares",
              url: "https://leetcode.com/problems/falling-squares/",
              platform: "leetcode",
            },
            {
              label: "CSES — Range Update Queries",
              url: "https://cses.fi/problemset/task/1651/",
              platform: "cses",
            },
          ],
          pitfall:
            "Always apply lazy updates downward to child nodes before executing mutations or evaluation logic.",
        },
        {
          dayNumber: 11,
          title: "Fenwick Tree (BIT)",
          objective:
            "Maintain prefix sum arrays and carry out dynamic adjustments inside a lightweight space footprint.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Fenwick Tree",
              url: "https://cp-algorithms.com/data_structures/fenwick.html",
            },
          ],
          practice: [
            {
              label: "LC 315 — Count of Smaller Numbers After Self",
              url: "https://leetcode.com/problems/count-of-smaller-numbers-after-self/",
              platform: "leetcode",
            },
            {
              label: "LC 1649 — Create Sorted Array through Instructions",
              url: "https://leetcode.com/problems/create-sorted-array-through-instructions/",
              platform: "leetcode",
            },
            {
              label: "CSES — Range Sum Queries I",
              url: "https://cses.fi/problemset/task/1646/",
              platform: "cses",
            },
          ],
          pitfall:
            "Keep the tree structure 1-indexed to enable rapid progression using fast bitwise updates: idx += (idx & -idx).",
        },
        {
          dayNumber: 12,
          title: "Interval DP",
          objective:
            "Compute global optimum states for segments [i, j] by partitioning into subproblems.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "Errichto: DP Tutorials",
              url: "https://www.youtube.com/watch?v=YP7Z-Xf-l88",
              embed: "youtube",
            },
          ],
          practice: [
            {
              label: "LC 312 — Burst Balloons",
              url: "https://leetcode.com/problems/burst-balloons/",
              platform: "leetcode",
            },
            {
              label: "LC 664 — Strange Printer",
              url: "https://leetcode.com/problems/strange-printer/",
              platform: "leetcode",
            },
            {
              label: "LC 1000 — Minimum Cost to Merge Stones",
              url: "https://leetcode.com/problems/minimum-cost-to-merge-stones/",
              platform: "leetcode",
            },
            {
              label: "CSES — Removal Game",
              url: "https://cses.fi/problemset/task/1097/",
              platform: "cses",
            },
          ],
          pitfall:
            "Structure nested loops with length as outer variable, then start indices, then partition points.",
        },
        {
          dayNumber: 13,
          title: "KMP & Z-Algorithm",
          objective:
            "Perform linear-time pattern searches and locate repeating prefixes inside strings in O(N + M) time.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: KMP",
              url: "https://cp-algorithms.com/string/prefix-function.html",
            },
            {
              label: "CP-Algorithms: Z-function",
              url: "https://cp-algorithms.com/string/z-function.html",
            },
          ],
          practice: [
            {
              label: "LC 28 — Find the Index of the First Occurrence",
              url: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
              platform: "leetcode",
            },
            {
              label: "LC 214 — Shortest Palindrome",
              url: "https://leetcode.com/problems/shortest-palindrome/",
              platform: "leetcode",
            },
            {
              label: "CSES — String Matching",
              url: "https://cses.fi/problemset/task/1753/",
              platform: "cses",
            },
          ],
          pitfall:
            "Avoid String.substring() in loops to prevent memory limits. Convert inputs to primitive arrays (char[] s = str.toCharArray()) first.",
        },
        {
          dayNumber: 14,
          title: "Timed OA Simulation #2",
          objective:
            "Learn to divide limited testing hours effectively across mixed-difficulty problem tasks.",
          tasks: [
            "Archived LeetCode Weekly Contest",
            "90-minute block",
            "Solve 3 problems cleanly within 50m",
            "Edge-case validation for P4",
          ],
        },
      ],
    },
    {
      weekNumber: 3,
      title: "Bitmask, Trees, Digit DP & Number Theory",
      days: [
        {
          dayNumber: 15,
          title: "Bitmask DP (Foundations)",
          objective:
            "Compute state transitions for NP-Hard routing problems across subsets up to size N ≈ 20.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "Colin Galen: Bitmask DP",
              url: "https://www.youtube.com/watch?v=685LFbeVnRE",
              embed: "youtube",
            },
          ],
          practice: [
            {
              label: "LC 698 — Partition to K Equal Sum Subsets",
              url: "https://leetcode.com/problems/partition-to-k-equal-sum-subsets/",
              platform: "leetcode",
            },
            {
              label: "LC 464 — Can I Win",
              url: "https://leetcode.com/problems/can-i-win/",
              platform: "leetcode",
            },
            {
              label: "CSES — Elevator Rides",
              url: "https://cses.fi/problemset/task/1653/",
              platform: "cses",
            },
          ],
          pitfall:
            "Pre-calculate subset submask configurations using bitwise arithmetic before executing the main recursion step to avoid duplicate work.",
        },
        {
          dayNumber: 16,
          title: "Bitmask DP (TSP / Assignment)",
          objective:
            "Apply bitmask states to coordinate assignments and calculate minimum traveling paths.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Bitmask DP",
              url: "https://cp-algorithms.com/dynamic_programming/bitmask.html",
            },
          ],
          practice: [
            {
              label: "LC 847 — Shortest Path Visiting All Nodes",
              url: "https://leetcode.com/problems/shortest-path-visiting-all-nodes/",
              platform: "leetcode",
            },
            {
              label: "LC 1879 — Minimum XOR Sum of Two Arrays",
              url: "https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/",
              platform: "leetcode",
            },
            {
              label: "CSES — Counting Tilings",
              url: "https://cses.fi/problemset/task/2181/",
              platform: "cses",
            },
          ],
          pitfall:
            "Initialize memoization matrices with −1 (or sentinels) using Arrays.fill(). Do not rely on default 0 values, as 0 can be a valid sub-solution.",
        },
        {
          dayNumber: 17,
          title: "DP on Trees (Subtree Recursion)",
          objective:
            "Calculate optimal subtree arrangements by combining recursive bottom-up tree structures.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "William Fiset: Tree DP",
              url: "https://www.youtube.com/watch?v=Jm21nB11o0A",
              embed: "youtube",
            },
          ],
          practice: [
            {
              label: "LC 337 — House Robber III",
              url: "https://leetcode.com/problems/house-robber-iii/",
              platform: "leetcode",
            },
            {
              label: "LC 968 — Binary Tree Cameras",
              url: "https://leetcode.com/problems/binary-tree-cameras/",
              platform: "leetcode",
            },
            {
              label: "CSES — Tree Matching",
              url: "https://cses.fi/problemset/task/1130/",
              platform: "cses",
            },
          ],
          pitfall:
            "Return small, fixed primitive arrays (new int[]{include, exclude}) from DFS to group state outputs and avoid object allocations.",
        },
        {
          dayNumber: 18,
          title: "DP on Trees (Rerooting Technique)",
          objective:
            "Solve optimization problems relative to every possible node using a two-pass DFS approach.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Tree Rerooting",
              url: "https://cp-algorithms.com/graph/tree_matching.html",
            },
          ],
          practice: [
            {
              label: "LC 834 — Sum of Distances in Tree",
              url: "https://leetcode.com/problems/sum-of-distances-in-tree/",
              platform: "leetcode",
            },
            {
              label: "LC 1339 — Maximum Product of Splitted Binary Tree",
              url: "https://leetcode.com/problems/maximum-product-of-splitted-binary-tree/",
              platform: "leetcode",
            },
            {
              label: "CSES — Tree Distances I",
              url: "https://cses.fi/problemset/task/1132/",
              platform: "cses",
            },
          ],
          pitfall:
            "Use the 1st DFS to gather standard bottom-up state counts, then use a 2nd top-down DFS to distribute and update parent attributes.",
        },
        {
          dayNumber: 19,
          title: "Digit DP",
          objective:
            "Count occurrences of specific digit patterns across ranges [L, R] in O(digits · states) time.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "Codeforces Tutorial: Digit DP",
              url: "https://codeforces.com/blog/entry/53960",
            },
          ],
          practice: [
            {
              label: "LC 357 — Count Numbers with Unique Digits",
              url: "https://leetcode.com/problems/count-numbers-with-unique-digits/",
              platform: "leetcode",
            },
            {
              label: "LC 902 — Numbers At Most N Given Digit Set",
              url: "https://leetcode.com/problems/numbers-at-most-n-given-digit-set/",
              platform: "leetcode",
            },
            {
              label: "CSES — Counting Numbers",
              url: "https://cses.fi/problemset/task/2220/",
              platform: "cses",
            },
          ],
          pitfall:
            "Design the recursion state to include a tight bit flag to indicate if you are currently restricted by the upper limit bounds of the input range.",
        },
        {
          dayNumber: 20,
          title: "Number Theory (Sieve, ModPow)",
          objective:
            "Perform calculations with primes, modular exponentiation, and multiplicative inverses in O(log(exp)).",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Sieve of Eratosthenes",
              url: "https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html",
            },
            {
              label: "CP-Algorithms: Modular Inverse",
              url: "https://cp-algorithms.com/algebra/module-inverse.html",
            },
          ],
          practice: [
            {
              label: "LC 204 — Count Primes",
              url: "https://leetcode.com/problems/count-primes/",
              platform: "leetcode",
            },
            {
              label: "LC 372 — Super Pow",
              url: "https://leetcode.com/problems/super-pow/",
              platform: "leetcode",
            },
            {
              label: "LC 878 — Nth Magical Number",
              url: "https://leetcode.com/problems/nth-magical-number/",
              platform: "leetcode",
            },
            {
              label: "CSES — Counting Divisors",
              url: "https://cses.fi/problemset/task/1713/",
              platform: "cses",
            },
          ],
          pitfall:
            "Cast intermediate calculations to long when computing modular multiplications to prevent wrapping errors: int res = (int) (((long) a * b) % MOD).",
        },
        {
          dayNumber: 21,
          title: "Timed OA Simulation #3",
          objective:
            "Simulate the conditions and requirements of highly competitive technical assessments.",
          tasks: [
            "Unyielding 3-hour block",
            "3-problem set from Codeforces Gym",
            "45 min per problem limit",
            "Write brute-force for partials if stuck",
          ],
        },
      ],
    },
    {
      weekNumber: 4,
      title: "Hard Consolidation + Full Mocks",
      days: [
        {
          dayNumber: 22,
          title: "Two-Heap Pattern",
          objective:
            "Track dynamic medians inside stream structures in O(log N) insertion and O(1) query time.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "Grokking Pattern: Two Heaps",
              url: "https://emre.me/patterns/two-heaps/",
            },
          ],
          practice: [
            {
              label: "LC 295 — Find Median from Data Stream",
              url: "https://leetcode.com/problems/find-median-from-data-stream/",
              platform: "leetcode",
            },
            {
              label: "LC 480 — Sliding Window Median",
              url: "https://leetcode.com/problems/sliding-window-median/",
              platform: "leetcode",
            },
            {
              label: "CSES — Josephus Problem II",
              url: "https://cses.fi/problemset/task/2163/",
              platform: "cses",
            },
          ],
          pitfall:
            "Keep min-heap and max-heap balanced. Ensure element removals (sliding window dropouts) are tracked correctly to prevent heap mismatches.",
        },
        {
          dayNumber: 23,
          title: "Advanced Sliding Window & Two-Pointer",
          objective:
            "Find longest/shortest contiguous subsegments matching criteria in linear O(N) sweeps.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "Grokking Pattern: Sliding Window",
              url: "https://emre.me/patterns/sliding-window/",
            },
          ],
          practice: [
            {
              label: "LC 992 — Subarrays with K Different Integers",
              url: "https://leetcode.com/problems/subarrays-with-k-different-integers/",
              platform: "leetcode",
            },
            {
              label: "LC 76 — Minimum Window Substring",
              url: "https://leetcode.com/problems/minimum-window-substring/",
              platform: "leetcode",
            },
            {
              label: "CSES — Playlist",
              url: "https://cses.fi/problemset/task/1141/",
              platform: "cses",
            },
          ],
          pitfall:
            "Use flat, array-backed frequency tables (int[] count = new int[128]) instead of map wrappers for ASCII inputs to optimize lookup performance.",
        },
        {
          dayNumber: 24,
          title: "Advanced Trie (XOR Trie)",
          objective:
            "Solve maximum XOR range queries in O(30) bits using binary bit-trie structures.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: Trie",
              url: "https://cp-algorithms.com/data_structures/trie.html",
            },
          ],
          practice: [
            {
              label: "LC 421 — Maximum XOR of Two Numbers in an Array",
              url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/",
              platform: "leetcode",
            },
            {
              label: "LC 212 — Word Search II",
              url: "https://leetcode.com/problems/word-search-ii/",
              platform: "leetcode",
            },
            {
              label: "CSES — Finding Patterns",
              url: "https://cses.fi/problemset/task/2102/",
              platform: "cses",
            },
          ],
          pitfall:
            "When writing XOR Tries, represent children using binary sub-arrays: TrieNode[] children = new TrieNode[2]. Simplifies bitwise traversal.",
        },
        {
          dayNumber: 25,
          title: "Polynomial Rolling Hash",
          objective:
            "Search for substrings and check sequence equality in near-instant O(1) time.",
          protocol: STANDARD_PROTOCOL,
          resources: [
            {
              label: "CP-Algorithms: String Hashing",
              url: "https://cp-algorithms.com/string/string-hashing.html",
            },
          ],
          practice: [
            {
              label: "LC 1044 — Longest Duplicate Substring",
              url: "https://leetcode.com/problems/longest-duplicate-substring/",
              platform: "leetcode",
            },
            {
              label: "LC 686 — Repeated String Match",
              url: "https://leetcode.com/problems/repeated-string-match/",
              platform: "leetcode",
            },
            {
              label: "CSES — Finding Periods",
              url: "https://cses.fi/problemset/task/1751/",
              platform: "cses",
            },
          ],
          pitfall:
            "Use double hashing with two different prime bases (e.g., 10⁹ + 7 and 10⁹ + 9) to prevent hash collisions on adversarial test suites.",
        },
        {
          dayNumber: 26,
          title: "Speed Round (Hard DP Revision)",
          objective:
            "Re-solve complex dynamic programming tasks from memory to sharpen implementation fluency.",
          tasks: [
            "Re-implement: LC 312, 664, 834",
            "25 min limit per problem without resources",
            "Double-check bounds, bases, and optimizations",
          ],
        },
        {
          dayNumber: 27,
          title: "Timed OA Simulation #4",
          objective:
            "Simulate the dynamic nature of top-tier coding evaluations.",
          tasks: [
            "LeetCode Weekly Contest (late 2024/2025)",
            "3-hour limit",
            "Solve 3 problems cleanly within 70m",
            "Audit boundary edge cases",
          ],
        },
        {
          dayNumber: 28,
          title: "Timed OA Simulation #5 + Weak Spot Drill",
          objective:
            "Turn remaining weak points into strengths before the final review.",
          tasks: [
            "Final 3-hour Codeforces/HackerRank challenge",
            "Identify top 2 weak topics from Gotcha Log",
            "Drill for 60m with targeted practice",
          ],
        },
        {
          dayNumber: 29,
          title: "Gotcha Log Audit & Template Polish",
          objective:
            "Audit your knowledge base and verify that all templates are ready to use.",
          tasks: [
            "Review Gotcha Log bugs",
            "Re-write the 12 master templates from scratch",
            "Fix minor bugs, index issues, or variable names in repository",
          ],
        },
        {
          dayNumber: 30,
          title: "Targeted Review & Rest",
          objective:
            "Complete final preparations and transition into an optimal state of readiness.",
          tasks: [
            "Solve 3 comfortable, medium-difficulty problems",
            "Avoid starting new topics",
            "Clear your mind and rest well for upcoming assessments",
          ],
        },
      ],
    },
  ],
};
