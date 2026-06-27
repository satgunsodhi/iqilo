import type { Course, DailyProtocol } from "@/lib/types";

export const QUANT_PROTOCOL: DailyProtocol = {
    synthesize:
        "45m: Read official documentation and conceptual guides to deeply understand the underlying data structures, performance characteristics, and API design patterns.",
    grind:
        "60-90m: Implement core financial calculations (returns, volatility, Sharpe ratio, etc.) from scratch using the day's library, focusing on execution speed, memory efficiency, and vectorized operations.",
    bridge:
        "30m: Apply the day's concepts to a real financial dataset (Yahoo Finance, Alpha Vantage, etc.) to build environmental resilience and practical intuition.",
    template:
        "15m: Re-write/extend the core template functions in your clean Python cheat sheet from scratch from memory to build operational muscle memory.",
};

export const quantFoundationRoadmap: Course = {
    id: "python-for-quants-data-wrangling",
    title: "Python for Quants I: Data Wrangling & SciPy",
    description:
        "A rigorous, hands-on foundation in Python's scientific computing stack, explicitly designed for quantitative trading. Covers NumPy's vectorized array operations, Pandas' time-series and panel data manipulation, and SciPy's optimization and statistical routines, all within the context of financial data analysis and strategy development.",
    difficulty: "Intermediate",
    tags: ["Python", "NumPy", "Pandas", "SciPy", "Quant Finance", "Backtesting"],
    estimatedHours: 84,
    category: "Quant Finance",
    tagline: "Master the Python data stack that powers modern quantitative trading.",
    totalDays: 28,
    weeks: [
        {
            weekNumber: 1,
            title: "NumPy Mastery: The Engine of Quantitative Finance",
            days: [
                {
                    dayNumber: 1,
                    title: "NumPy Fundamentals & Vectorization",
                    objective:
                        "Internalize NumPy's ndarray as the foundational data structure for all numerical computing in finance. Master array creation, indexing, slicing, and the critical concept of vectorization to eliminate slow Python loops.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "NumPy: the absolute basics for beginners",
                            url: "https://numpy.org/doc/stable/user/absolute_beginners.html",
                        },
                        {
                            label: "NumPy Quickstart Tutorial",
                            url: "https://numpy.org/doc/stable/user/quickstart.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "NumPy Tutorials (Official Jupyter Notebooks)",
                            url: "https://numpy.org/numpy-tutorials/",
                        },
                    ],
                    pitfall:
                        "Avoid using Python lists for numerical data. NumPy arrays are stored contiguously in memory and operations are vectorized (executed in C), providing orders of magnitude speed improvements. Never iterate over array elements with a for-loop when a vectorized operation is possible.",
                },
                {
                    dayNumber: 2,
                    title: "Broadcasting & Universal Functions (ufuncs)",
                    objective:
                        "Understand and apply NumPy's broadcasting rules to perform arithmetic operations on arrays of different shapes. Master universal functions for element-wise operations, including mathematical, trigonometric, and comparison functions.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "NumPy Broadcasting",
                            url: "https://numpy.org/doc/stable/user/basics.broadcasting.html",
                        },
                        {
                            label: "Universal functions (ufuncs)",
                            url: "https://numpy.org/doc/stable/reference/ufuncs.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "100 NumPy Exercises",
                            url: "https://github.com/rougier/numpy-100",
                        },
                    ],
                    pitfall:
                        "Broadcasting can create large intermediate arrays, leading to memory blow-ups. Be mindful of the shapes involved and use `np.newaxis` or `reshape` carefully to ensure operations are memory-efficient. A broadcasting error is a common source of silent shape mismatches.",
                },
                {
                    dayNumber: 3,
                    title: "Advanced Indexing & Array Manipulation",
                    objective:
                        "Deploy advanced indexing techniques including integer array indexing, boolean masking, and fancy indexing to efficiently select, filter, and modify data subsets. Master array manipulation routines like `reshape`, `concatenate`, `split`, and `stack`.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "NumPy Indexing",
                            url: "https://numpy.org/doc/stable/reference/arrays.indexing.html",
                        },
                        {
                            label: "Array manipulation routines",
                            url: "https://numpy.org/doc/stable/reference/routines.array-manipulation.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "NumPy Tutorials (Official)",
                            url: "https://numpy.org/numpy-tutorials/",
                        },
                    ],
                    pitfall:
                        "Boolean indexing returns a copy, not a view. If you need to modify the original array, assign the result back or use `np.where`. Fancy indexing (integer array indexing) also returns a copy, which can be a source of confusion when expecting in-place modifications.",
                },
                {
                    dayNumber: 4,
                    title: "Linear Algebra with NumPy",
                    objective:
                        "Implement core linear algebra operations using `np.linalg`: matrix multiplication, inverses, determinants, eigenvalues, and solving linear systems. These are essential for portfolio optimization, factor models, and risk management.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Linear algebra (numpy.linalg)",
                            url: "https://numpy.org/doc/stable/reference/routines.linalg.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Scientific Python Lectures",
                            url: "https://lectures.scientific-python.org/",
                        },
                    ],
                    pitfall:
                        "Use `np.dot` or `@` for matrix multiplication, not `*` (which is element-wise). Also, be extremely cautious about matrix condition numbers; inverting an ill-conditioned matrix can lead to numerical instability. For solving systems of equations, prefer `np.linalg.solve` over computing the inverse directly.",
                },
                {
                    dayNumber: 5,
                    title: "Random Number Generation & Simulations",
                    objective:
                        "Master `np.random` for generating random samples from various distributions (normal, uniform, etc.). Use this to simulate asset price paths (e.g., Geometric Brownian Motion) and perform Monte Carlo simulations for option pricing and risk analysis.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Random sampling (numpy.random)",
                            url: "https://numpy.org/doc/stable/reference/random/index.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "NumPy Tutorials (Official)",
                            url: "https://numpy.org/numpy-tutorials/",
                        },
                    ],
                    pitfall:
                        "Always set a random seed (`np.random.seed(42)`) for reproducibility in research and backtesting. The new `default_rng()` interface is preferred over the legacy `np.random` for better statistical properties and performance.",
                },
                {
                    dayNumber: 6,
                    title: "Performance Tuning & Memory Management",
                    objective:
                        "Optimize NumPy code for speed and memory. Learn to use `np.einsum`, `np.lib.stride_tricks`, and understand the difference between views and copies. Profile code to identify bottlenecks and use `numexpr` or `numba` for further acceleration if needed.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "NumPy Performance Optimization",
                            url: "https://numpy.org/doc/stable/user/performance.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "From Python to NumPy",
                            url: "https://www.labri.fr/perso/nrougier/from-python-to-numpy/",
                        },
                    ],
                    pitfall:
                        "Avoid unnecessary copies. Use views (`arr[::2]`) instead of copies (`arr[::2].copy()`) where possible. Be aware that `reshape` returns a view, while `resize` returns a copy. For large datasets, memory inefficiency is the primary cause of slowdowns and crashes.",
                },
                {
                    dayNumber: 7,
                    title: "Timed Simulation: NumPy for Quant",
                    objective:
                        "Simulate a fast-paced quantitative research task to reinforce NumPy proficiency under time pressure.",
                    tasks: [
                        "Within a strict 90-minute block, implement a function to calculate the Efficient Frontier for a portfolio of 10 assets using NumPy, given their historical returns and covariance matrix.",
                        "Implement a Monte Carlo simulation for pricing a European call option using Geometric Brownian Motion.",
                        "Profile your code using `%timeit` in Jupyter and optimize any slow operations.",
                        "Document all vectorized operations and broadcasting logic for future reference.",
                    ],
                },
            ],
        },
        {
            weekNumber: 2,
            title: "Pandas: Time-Series & Panel Data Mastery",
            days: [
                {
                    dayNumber: 8,
                    title: "Pandas Fundamentals: Series & DataFrame",
                    objective:
                        "Internalize Pandas' Series and DataFrame as the primary tools for handling financial time-series and panel data. Master creation, indexing, selection (`loc`, `iloc`, `at`, `iat`), and basic operations.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "10 minutes to pandas",
                            url: "https://pandas.pydata.org/docs/user_guide/10min.html",
                        },
                        {
                            label: "Intro to Data Structures",
                            url: "https://pandas.pydata.org/docs/user_guide/dsintro.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Pandas User Guide: Basics",
                            url: "https://pandas.pydata.org/docs/user_guide/basics.html",
                        },
                    ],
                    pitfall:
                        "Avoid chained indexing (e.g., `df['A'][0] = 5`). It can lead to unpredictable results and performance issues. Always use `.loc` or `.iloc` for explicit indexing. Also, be aware of the difference between a view and a copy; Pandas operations may return either, so use `.copy()` when you need a safe, independent copy.",
                },
                {
                    dayNumber: 9,
                    title: "Data Import, Cleaning & Preprocessing",
                    objective:
                        "Master reading financial data from various sources (CSV, Excel, databases, APIs). Apply data cleaning techniques: handling missing values (`isna`, `fillna`, `dropna`), removing duplicates, and converting data types.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "IO Tools (Reading & Writing)",
                            url: "https://pandas.pydata.org/docs/user_guide/io.html",
                        },
                        {
                            label: "Working with missing data",
                            url: "https://pandas.pydata.org/docs/user_guide/missing_data.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Pandas User Guide: IO & Missing Data",
                            url: "https://pandas.pydata.org/docs/user_guide/index.html#user-guide",
                        },
                    ],
                    pitfall:
                        "Always parse dates correctly using `parse_dates` in `pd.read_csv`. Inconsistent date parsing is a common source of errors in time-series analysis. Be explicit about `dtype` to avoid automatic and potentially incorrect type inference, especially for large datasets.",
                },
                {
                    dayNumber: 10,
                    title: "Data Selection, Filtering & Transformation",
                    objective:
                        "Apply advanced data selection techniques: boolean filtering, query strings, and `where`. Master data transformation: applying functions (`apply`, `map`, `applymap`), and creating new columns.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Indexing and selecting data",
                            url: "https://pandas.pydata.org/docs/user_guide/indexing.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Pandas User Guide: Indexing & Selecting",
                            url: "https://pandas.pydata.org/docs/user_guide/indexing.html",
                        },
                    ],
                    pitfall:
                        "`apply` with a Python function can be slow for large DataFrames; prefer vectorized operations or `np.where` where possible. The `query` method is often more readable and efficient for complex boolean filtering than chained conditions.",
                },
                {
                    dayNumber: 11,
                    title: "GroupBy, Aggregation & Pivot Tables",
                    objective:
                        "Master `groupby` for split-apply-combine operations on financial data. Use aggregation functions (`agg`, `transform`, `filter`) and pivot tables to summarize and reshape data for portfolio analysis and risk reporting.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Group By: split-apply-combine",
                            url: "https://pandas.pydata.org/docs/user_guide/groupby.html",
                        },
                        {
                            label: "Reshaping and pivot tables",
                            url: "https://pandas.pydata.org/docs/user_guide/reshaping.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Pandas User Guide: GroupBy",
                            url: "https://pandas.pydata.org/docs/user_guide/groupby.html",
                        },
                    ],
                    pitfall:
                        "`groupby` can be memory-intensive. Ensure you're grouping on a column with a reasonable cardinality. Use `as_index=False` to keep the grouped column as a column rather than moving it to the index.",
                },
                {
                    dayNumber: 12,
                    title: "Time Series Fundamentals",
                    objective:
                        "Work with Pandas' time series functionality: `DatetimeIndex`, date ranges, resampling (`resample`), frequency conversion, and rolling window calculations (moving averages, volatility).",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Time series / date functionality",
                            url: "https://pandas.pydata.org/docs/user_guide/timeseries.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Pandas User Guide: Time Series",
                            url: "https://pandas.pydata.org/docs/user_guide/timeseries.html",
                        },
                    ],
                    pitfall:
                        "Be explicit about timezone handling. Use `tz_localize` and `tz_convert` to manage timezone-aware data. When resampling, choose the right aggregation method (`ohlc`, `mean`, `sum`) and be aware of `closed` and `label` parameters to avoid off-by-one errors.",
                },
                {
                    dayNumber: 13,
                    title: "Merging, Joining & Concatenating",
                    objective:
                        "Combine multiple DataFrames using `merge`, `join`, and `concat`. Master different join types (inner, outer, left, right) for combining price data, fundamentals, and other financial information.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Merge, join, concatenate and compare",
                            url: "https://pandas.pydata.org/docs/user_guide/merging.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Pandas User Guide: Merging",
                            url: "https://pandas.pydata.org/docs/user_guide/merging.html",
                        },
                    ],
                    pitfall:
                        "When merging on multiple columns, ensure the join keys have the same dtype. Inconsistent dtypes (e.g., int vs. float) can lead to empty results. Be explicit about the `how` parameter to avoid unexpected Cartesian products or data loss.",
                },
                {
                    dayNumber: 14,
                    title: "Timed Simulation: Pandas for Alpha Research",
                    objective:
                        "Simulate an alpha research task to solidify Pandas skills under time constraints.",
                    tasks: [
                        "Within a strict 90-minute block, load 5 years of daily price data for 100 stocks from a CSV.",
                        "Calculate daily returns, and then compute the 20-day, 50-day, and 200-day rolling volatility for each stock.",
                        "Construct a long-short portfolio based on a momentum signal (e.g., 12-month return) and compute the portfolio's daily returns.",
                        "Resample the portfolio returns to monthly frequency and compute the Sharpe ratio.",
                        "Document all cleaning, transformation, and merging steps with clear comments.",
                    ],
                },
            ],
        },
        {
            weekNumber: 3,
            title: "SciPy: Scientific Computing for Quant Strategies",
            days: [
                {
                    dayNumber: 15,
                    title: "SciPy Overview & Constants",
                    objective:
                        "Understand SciPy's structure and its subpackages. Use `scipy.constants` for physical and mathematical constants relevant to finance (e.g., conversion factors).",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "SciPy User Guide",
                            url: "https://docs.scipy.org/doc/scipy/tutorial/index.html",
                        },
                        {
                            label: "Constants (scipy.constants)",
                            url: "https://docs.scipy.org/doc/scipy/reference/constants.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "SciPy Tutorials (Official)",
                            url: "https://docs.scipy.org/doc/scipy/tutorial/index.html",
                        },
                    ],
                    pitfall:
                        "SciPy is organized into subpackages; import only what you need (e.g., `from scipy import optimize`). Avoid `import scipy` as it doesn't import the subpackages automatically.",
                },
                {
                    dayNumber: 16,
                    title: "Optimization: Portfolio Construction",
                    objective:
                        "Use `scipy.optimize` to solve constrained optimization problems central to quant finance: maximizing the Sharpe ratio, minimizing portfolio variance (Markowitz), and optimizing trading strategies.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Optimization (scipy.optimize)",
                            url: "https://docs.scipy.org/doc/scipy/reference/optimize.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "SciPy Tutorial: Optimization",
                            url: "https://docs.scipy.org/doc/scipy/tutorial/optimize.html",
                        },
                    ],
                    pitfall:
                        "Be explicit about bounds and constraints; many optimization algorithms assume unconstrained variables. For financial applications, constraints like `sum(weights) = 1` and `weights >= 0` are common and must be specified correctly using `LinearConstraint` or `NonlinearConstraint`.",
                },
                {
                    dayNumber: 17,
                    title: "Statistical Distributions & Hypothesis Testing",
                    objective:
                        "Leverage `scipy.stats` for probability distributions, descriptive statistics, and hypothesis tests. Essential for risk modeling, performance attribution, and backtesting.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Statistical functions (scipy.stats)",
                            url: "https://docs.scipy.org/doc/scipy/reference/stats.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "SciPy Tutorial: Statistics",
                            url: "https://docs.scipy.org/doc/scipy/tutorial/stats.html",
                        },
                    ],
                    pitfall:
                        "Many statistical tests assume normality or independence. Always check the assumptions of a test before applying it to financial data, which is often non-normal and autocorrelated. The `scipy.stats` module provides a wide range of tests; choose the appropriate one for your data and hypothesis.",
                },
                {
                    dayNumber: 18,
                    title: "Interpolation & Smoothing",
                    objective:
                        "Apply `scipy.interpolate` for curve fitting, yield curve construction, and filling missing data in time series.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Interpolation (scipy.interpolate)",
                            url: "https://docs.scipy.org/doc/scipy/reference/interpolate.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "SciPy Tutorial: Interpolation",
                            url: "https://docs.scipy.org/doc/scipy/tutorial/interpolate.html",
                        },
                    ],
                    pitfall:
                        "Interpolation is an approximation; the choice of method (linear, cubic, spline) significantly impacts results, especially at the boundaries. For financial data, avoid extrapolating far beyond the range of observed data, as this can produce unrealistic results.",
                },
                {
                    dayNumber: 19,
                    title: "Signal Processing & Filtering",
                    objective:
                        "Use `scipy.signal` for filtering financial time series (e.g., moving averages, Kalman filters) to remove noise and extract signals.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Signal processing (scipy.signal)",
                            url: "https://docs.scipy.org/doc/scipy/reference/signal.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "SciPy Tutorial: Signal Processing",
                            url: "https://docs.scipy.org/doc/scipy/tutorial/signal.html",
                        },
                    ],
                    pitfall:
                        "Filters introduce phase delays. For real-time trading applications, use zero-phase filters (`filtfilt`) to avoid look-ahead bias. Be cautious with filter order; high-order filters can be unstable.",
                },
                {
                    dayNumber: 20,
                    title: "Integration & ODEs",
                    objective:
                        "Apply `scipy.integrate` for numerical integration (e.g., option pricing) and solving ordinary differential equations (e.g., stochastic differential equations for interest rate models).",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Integration (scipy.integrate)",
                            url: "https://docs.scipy.org/doc/scipy/reference/integrate.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "SciPy Tutorial: Integration",
                            url: "https://docs.scipy.org/doc/scipy/tutorial/integrate.html",
                        },
                    ],
                    pitfall:
                        "For ODEs, choose the right solver (`solve_ivp` with `method='RK45'` or `'LSODA'`). Stiff systems require implicit methods. The error tolerance (`rtol`, `atol`) must be carefully set to balance accuracy and performance.",
                },
                {
                    dayNumber: 21,
                    title: "Timed Simulation: SciPy for Strategy Optimization",
                    objective:
                        "Simulate a quantitative research task requiring advanced SciPy routines.",
                    tasks: [
                        "Within a strict 90-minute block, fit a yield curve to a set of government bond prices using `scipy.optimize` and `scipy.interpolate`.",
                        "Price a European call option using `scipy.integrate.quad` and compare it to the Black-Scholes closed-form solution.",
                        "Use `scipy.stats` to test whether a strategy's returns are significantly different from zero.",
                        "Optimize the parameters of a simple moving average crossover strategy using `scipy.optimize`.",
                    ],
                },
            ],
        },
        {
            weekNumber: 4,
            title: "Integration, Optimization & Real-World Workflows",
            days: [
                {
                    dayNumber: 22,
                    title: "Integrating NumPy, Pandas & SciPy",
                    objective:
                        "Build end-to-end workflows that leverage all three libraries. Load data with Pandas, perform numerical computations with NumPy, and apply statistical and optimization routines with SciPy.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "SciPy & NumPy Integration",
                            url: "https://docs.scipy.org/doc/scipy/tutorial/index.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Scientific Python Lectures",
                            url: "https://lectures.scientific-python.org/",
                        },
                    ],
                    pitfall:
                        "Data types must be consistent across libraries. Pandas DataFrames can hold mixed types; ensure that columns passed to NumPy or SciPy are homogeneous and of a numeric dtype (e.g., `float64`). Use `.to_numpy()` or `.values` to extract a NumPy array.",
                },
                {
                    dayNumber: 23,
                    title: "High-Performance Workflows",
                    objective:
                        "Optimize end-to-end data pipelines for speed and memory. Use Pandas' `eval` and `query` for efficient expression evaluation. Explore `numexpr` and `numba` for further acceleration.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Enhancing Performance",
                            url: "https://pandas.pydata.org/docs/user_guide/enhancingperf.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Pandas User Guide: Performance",
                            url: "https://pandas.pydata.org/docs/user_guide/enhancingperf.html",
                        },
                    ],
                    pitfall:
                        "Profiling is essential. Don't optimize prematurely. Use `%timeit`, `line_profiler`, and `memory_profiler` to identify true bottlenecks. Vectorization is usually the first and most effective optimization.",
                },
                {
                    dayNumber: 24,
                    title: "Real-World Data: APIs & Databases",
                    objective:
                        "Pull financial data from APIs (Yahoo Finance, Alpha Vantage, etc.) and databases. Handle large datasets that don't fit in memory using chunking and efficient I/O.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "IO Tools (Reading & Writing)",
                            url: "https://pandas.pydata.org/docs/user_guide/io.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Pandas User Guide: IO",
                            url: "https://pandas.pydata.org/docs/user_guide/io.html",
                        },
                    ],
                    pitfall:
                        "API rate limits and network latency can be bottlenecks. Use caching (`pd.HDFStore`, `pd.read_pickle`) to avoid redundant downloads. When reading large CSV files, use `chunksize` to process data in manageable pieces.",
                },
                {
                    dayNumber: 25,
                    title: "Building a Backtesting Engine",
                    objective:
                        "Construct a simple yet robust vectorized backtesting engine. Use Pandas to manage price data, NumPy for vectorized signal generation and performance calculations, and SciPy for optimization and statistical analysis.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Backtesting with Pandas",
                            url: "https://www.google.com/search?q=pandas+backtesting+tutorial",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Quant Roadmap GitHub",
                            url: "https://github.com/mahdibahlouli/quant-roadmap",
                        },
                    ],
                    pitfall:
                        "Avoid look-ahead bias: ensure signals are computed using only data available at the time of the trade. Use `.shift()` to align signals with the correct period. Slippage and transaction costs, while not modeled in vectorized backtests, should be estimated and incorporated for realistic results.",
                },
                {
                    dayNumber: 26,
                    title: "Template Consolidation",
                    objective:
                        "Create a personal Python quant library with reusable templates for common tasks.",
                    tasks: [
                        "Re-engineer from scratch core templates for: loading and cleaning financial data, computing returns and volatility, performing rolling regressions, optimizing portfolios with `scipy.optimize`, and backtesting a simple momentum strategy.",
                        "Ensure every template is prefaced with a documentation block specifying input requirements, output format, and performance characteristics.",
                    ],
                },
                {
                    dayNumber: 27,
                    title: "Mock Project: End-to-End Quant Workflow",
                    objective:
                        "Simulate a complete quantitative research project from data ingestion to strategy evaluation under a strict time limit.",
                    tasks: [
                        "Select a universe of 50 stocks and download 10 years of daily price data.",
                        "Compute and analyze risk factors (e.g., Market, Size, Value) using Pandas and SciPy.",
                        "Construct a factor-based long-short portfolio and backtest it.",
                        "Evaluate the strategy's performance using a range of metrics (Sharpe, Sortino, Max Drawdown) and statistical tests from `scipy.stats`.",
                        "Present the results in a clear, well-commented Jupyter Notebook.",
                    ],
                },
                {
                    dayNumber: 28,
                    title: "Final Review & Next Steps",
                    objective:
                        "Consolidate knowledge and plan the next phase: advanced topics like time-series modeling (Statsmodels), machine learning (scikit-learn), and deep learning (PyTorch/TensorFlow) for quant trading.",
                    tasks: [
                        "Review all code, templates, and notes from the past 4 weeks.",
                        "Identify areas of weakness and plan targeted practice.",
                        "Explore the next course in the series: 'Advanced Time-Series & Machine Learning for Quant Trading'.",
                        "Rest and reset for the next intensive learning phase.",
                    ],
                },
            ],
        },
    ],
};