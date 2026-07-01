import type { Course, DailyProtocol } from "@/lib/types";

export const QUANT_PROTOCOL: DailyProtocol = {
    synthesize: "45m: Read official documentation and conceptual guides to deeply understand the underlying data structures, performance characteristics, and API design patterns.",
    grind: "60-90m: Implement core financial calculations (returns, volatility, Sharpe ratio, etc.) from scratch using the day's library, focusing on execution speed, memory efficiency, and vectorized operations.",
    bridge: "30m: Apply the day's concepts to a real financial dataset (Yahoo Finance, Alpha Vantage, etc.) to build environmental resilience and practical intuition.",
    template: "15m: Re-write/extend the core template functions in your clean Python cheat sheet from scratch from memory to build operational muscle memory.",
};

export const quantFoundationRoadmap: Course = {
    id: "python-for-quants-data-wrangling",
    title: "Python for Quants I: Data Wrangling & SciPy",
    description: "A rigorous, hands-on foundation in Python's scientific computing stack, explicitly designed for quantitative trading. Covers NumPy's vectorized array operations, Pandas' time-series and panel data manipulation, and SciPy's optimization and statistical routines, all within the context of financial data analysis and strategy development.",
    difficulty: "Intermediate",
    tags: ["Vectorized Arrays", "DataFrame Operations", "Time-Series Alignment", "SciPy Optimizers", "Statistical Functions", "Data Aggregation"],
    estimatedHours: 84,
    category: "Quant Finance",
    tagline: "Master the Python data stack that powers modern quantitative trading.",
    totalDays: 28,
    weeks: [
        {
            weekNumber: 1,
            title: "NumPy Mastery & Memory Layouts: The Engine of Quantitative Finance",
            days: [
                {
                    dayNumber: 1,
                    title: "NumPy Fundamentals & Vectorization (Microstructure Arrays)",
                    objective: "Internalize NumPy's ndarray as the foundational data structure for all numerical computing in finance. Master array creation, indexing, slicing, and the critical concept of vectorization to eliminate slow Python loops in return calculations.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "NumPy: The absolute basics for beginners",
                            url: "https://numpy.org/doc/stable/user/absolute_beginners.html"
                        },
                        {
                            label: "From Python to NumPy: Code Vectorization",
                            url: "https://www.labri.fr/perso/nrougier/from-python-to-numpy/#code-vectorization"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "NumPy 100 Exercises (Rougier)",
                            url: "https://github.com/rougier/numpy-100"
                        }
                    ],
                    pitfall: "Avoid using Python lists for numerical tick data. NumPy arrays are stored contiguously in memory and operations are vectorized (executed in C). Never iterate over array elements with a for-loop when calculating daily log returns."
                },
                {
                    dayNumber: 2,
                    title: "Broadcasting Rules & Cross-Asset Correlation",
                    objective: "Master NumPy broadcasting to treat arrays of different shapes during arithmetic operations. Apply this to multi-asset portfolio weighting and constructing covariance matrices without copying data in memory.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "NumPy Broadcasting Guide",
                            url: "https://numpy.org/doc/stable/user/basics.broadcasting.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Vector Quantization Example Implementation",
                            url: "https://numpy.org/doc/stable/user/basics.broadcasting.html#a-practical-example-vector-quantization"
                        }
                    ],
                    pitfall: "Misaligning array dimensions (e.g., trying to broadcast a (500,) returns array with a (50,) weights array improperly) will raise ValueError. Always utilize np.newaxis to explicitly define orientation when calculating portfolio variance."
                },
                {
                    dayNumber: 3,
                    title: "Memory Layouts, Strides, and Contiguity",
                    objective: "Understand how tick data is physically stored in memory. Manipulate array strides to access C-contiguous and F-contiguous data layouts for ultra-low latency order book snapshot parsing.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "NumPy Strides and Memory Glossary",
                            url: "https://numpy.org/doc/stable/glossary.html"
                        },
                        {
                            label: "numpy.lib.stride_tricks.as_strided",
                            url: "https://numpy.org/doc/stable/reference/generated/numpy.lib.stride_tricks.as_strided.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Anatomy of an Array (Memory Layout)",
                            url: "https://www.labri.fr/perso/nrougier/from-python-to-numpy/#anatomy-of-an-array"
                        }
                    ],
                    pitfall: "Using as_strided incorrectly can point array elements to invalid memory, crashing your backtester. Always rely on original strides or prefer sliding_window_view for creating multi-dimensional lookbacks."
                },
                {
                    dayNumber: 4,
                    title: "Zero-Copy Sliding Windows for Rolling Features",
                    objective: "Deploy sliding_window_view to generate 2D rolling windows over 1D price series for rapid Volume-Weighted Average Price (VWAP) and Simple Moving Average (SMA) calculations without memory duplication.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "numpy.lib.stride_tricks.sliding_window_view",
                            url: "https://numpy.org/doc/stable/reference/generated/numpy.lib.stride_tricks.sliding_window_view.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "kaggle",
                            label: "NIFTY-50 VWAP Calculation Challenge",
                            url: "https://www.kaggle.com/code/rohanrao/a-modern-time-series-tutorial"
                        }
                    ],
                    pitfall: "Writing to a writeable=True sliding window will alter the original array and affect multiple overlapping window positions. Always treat rolling views in quantitative feature engineering as strictly read-only."
                },
                {
                    dayNumber: 5,
                    title: "Advanced Fancy Indexing & Signal Generation",
                    objective: "Utilize boolean masking and advanced integer indexing to filter massive arrays of trade signals. Isolate exact timestamps where order book imbalances exceed critical thresholds without iterative conditionals.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Advanced/Fancy Indexing Concepts",
                            url: "https://numpy.org/doc/stable/glossary.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "kaggle",
                            label: "Filtering NIFTY-50 Candlestick Patterns",
                            url: "https://www.kaggle.com/code/rushikeshhiray/backtesting-hammer-candlestick-strategy"
                        }
                    ],
                    pitfall: "Confusing boolean masking with standard slicing. Slicing returns a view of the array (sharing memory), whereas fancy indexing generates an entirely new copy of the array, introducing latency if called repetitively in a loop."
                },
                {
                    dayNumber: 6,
                    title: "Random Number Generation for Monte Carlo Paths",
                    objective: "Transition to NumPy's modern Generator API (PCG64) to simulate thousands of stochastic price paths for options pricing (Black-Scholes-Merton) and portfolio risk simulation (Value-at-Risk).",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "NumPy Random Generator documentation",
                            url: "https://numpy.org/doc/stable/reference/random/index.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "QuantEcon: Simulating Random Variables",
                            url: "https://python.quantecon.org/stats_examples.html"
                        }
                    ],
                    pitfall: "Relying on the legacy np.random.RandomState (MT19937). Always transition to np.random.default_rng() (PCG64) for vastly superior statistical properties, speed, and parallel RNG stream generation capabilities."
                },
                {
                    dayNumber: 7,
                    title: "Week 1 Capstone: Vectorized Limit Order Book Simulator",
                    objective: "Combine broadcasting, sliding windows, and advanced indexing to build a stateless, vectorized LOB snapshot parser that calculates bid-ask spread, mid-price, and micro-price at every tick.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "NumPy Strides and Memory Operations Review",
                            url: "https://numpy.org/doc/stable/reference/routines.lib.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "NumPy 100 Exercises (Complete array mechanics)",
                            url: "https://github.com/rougier/numpy-100"
                        }
                    ],
                    pitfall: "Attempting to track order queue state (which is path-dependent) using purely stateless vector operations. Recognize the boundary of NumPy's utility before shifting to Numba for stateful market simulations."
                }
            ]
        },
        {
            weekNumber: 2,
            title: "Advanced Pandas & Financial Time-Series Architecture",
            days: [
                {
                    dayNumber: 8,
                    title: "Pandas DatetimeIndex & Time-Series Alignment",
                    objective: "Establish Pandas as the architecture for aligned time-series. Use DatetimeIndex to align asynchronous tick data, resample OHLCV bars, and manage localized timezone structures for global markets.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Pandas Time Series & Date Functionality",
                            url: "https://pandas.pydata.org/docs/user_guide/timeseries.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "kaggle",
                            label: "NIFTY-50 Time Series Alignment",
                            url: "https://www.kaggle.com/datasets/rohanrao/nifty50-stock-market-data"
                        }
                    ],
                    pitfall: "Failing to localize timezones when cross-listing assets, leading to 'Spider Web' graphs and look-ahead bias in backtests. Always standardize tick data to UTC before applying exchange-specific offsets."
                },
                {
                    dayNumber: 9,
                    title: "Timedeltas and Market Session Masking",
                    objective: "Manipulate `pd.Timedelta` and `timedelta64[ns]` to calculate holding periods, latency, and duration metrics. Create market session masks to drop overnight gaps and pre-market noise.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Pandas Time Deltas",
                            url: "https://pandas.pydata.org/docs/user_guide/timedeltas.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "kaggle",
                            label: "Nifty 50 Market Hours Masking",
                            url: "https://www.kaggle.com/datasets/setseries/nifty50-stocks-dataset20102021/data"
                        }
                    ],
                    pitfall: "Assuming timedelta resolution defaults to minutes/hours. Pandas operates on 64-bit nanosecond resolution for timedeltas; dividing naive floats by timedeltas will yield dimensionally inaccurate return frequencies."
                },
                {
                    dayNumber: 10,
                    title: "High-Performance Data Scaling & Memory Optimization",
                    objective: "Transition from text-based CSV files to highly compressed Parquet formats. Implement integer downcasting, categorical variables, and memory-mapping to ingest multi-gigabyte tick datasets without OOM errors.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Pandas: Scaling to Large Datasets",
                            url: "https://pandas.pydata.org/docs/user_guide/scale.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "kaggle",
                            label: "Stock Market Prediction (Data Downcasting)",
                            url: "https://www.kaggle.com/code/omchimurkar/nifty-50-prediction-tuning-xgboost-lightgbm"
                        }
                    ],
                    pitfall: "Loading string-based ticker symbols as standard object types. Converting high-repetition strings (like 'AAPL', 'RELIANCE') into Pandas Categorical types can reduce dataframe memory footprints by over 80%."
                },
                {
                    dayNumber: 11,
                    title: "Windowing, Expanding, and EWMA for Volatility",
                    objective: "Implement Exponentially Weighted Moving Averages (EWMA) and rolling standard deviations to model asset volatility (e.g., Bollinger Bands, Average True Range) in dynamic trading environments.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Pandas Windowing Operations",
                            url: "https://pandas.pydata.org/docs/user_guide/window.html"
                        },
                        {
                            label: "Pandas Cookbook: Expanding Data",
                            url: "https://pandas.pydata.org/docs/user_guide/cookbook.html#expanding-data"
                        }
                    ],
                    practice: [
                        {
                            platform: "kaggle",
                            label: "Building Volatility Features (ATR)",
                            url: "https://www.kaggle.com/code/omchimurkar/nifty-50-prediction-tuning-xgboost-lightgbm"
                        }
                    ],
                    pitfall: "Using standard arithmetic rolling means for financial variance. Financial volatility requires exponential decay (EWMA) to place heavier significance on recent price shocks rather than flat windowing."
                },
                {
                    dayNumber: 12,
                    title: "Microstructure Alignment via Merge As-Of",
                    objective: "Execute high-performance backward-looking joins using `pd.merge_asof`. Align executing trade prices to the exact prevailing bid-ask quote that existed milliseconds prior to the execution.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Pandas Merge, Join, and Compare",
                            url: "https://pandas.pydata.org/docs/user_guide/merging.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Joining Asynchronous Market Data",
                            url: "https://pandas.pydata.org/docs/user_guide/cookbook.html#merge-join-concatenate-and-compare"
                        }
                    ],
                    pitfall: "Using standard outer joins for time-series. This generates massive NaN expansions. `merge_asof` executes an ordered search that prevents look-ahead bias by enforcing `direction='backward'`."
                },
                {
                    dayNumber: 13,
                    title: "Live Data Ingestion: yfinance & Alpha Vantage",
                    objective: "Automate the fetching of OHLCV and fundamental data directly into Pandas DataFrames using real-time API integrations, managing API rate limits and data formatting anomalies.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Alpha Vantage API Documentation",
                            url: "https://www.alphavantage.co/documentation/"
                        },
                        {
                            label: "yfinance GitHub Repository",
                            url: "https://github.com/ranaroussi/yfinance"
                        }
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Daily Risk Free Rate Implementation (yfinance)",
                            url: "https://gist.github.com/ranaroussi/72d0e92bbe31d1514baccf00175049e4"
                        }
                    ],
                    pitfall: "Assuming downloaded API data is perfectly clean. Always check for unadjusted splits and missing dividends. Ensure you are using split-adjusted close prices (`Adj Close`) when calculating long-term cumulative returns."
                },
                {
                    dayNumber: 14,
                    title: "Week 2 Capstone: Vectorized VWAP & Order Imbalance",
                    objective: "Construct a comprehensive Pandas pipeline that ingests NIFTY-50 data, downcasts memory, calculates 1D forward returns, generates rolling VWAP features, and aligns disparate temporal datasets.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Kaggle Nifty50 EDA & Time Series",
                            url: "https://www.kaggle.com/code/rohanrao/a-modern-time-series-tutorial"
                        }
                    ],
                    practice: [
                        {
                            platform: "kaggle",
                            label: "NIFTY-50 Feature Engineering Pipeline",
                            url: "https://www.kaggle.com/code/omchimurkar/nifty-50-prediction-tuning-xgboost-lightgbm"
                        }
                    ],
                    pitfall: "Writing logic that requires dataframe iteration (`df.iterrows()`). If you are iterating over rows in a Capstone backtest, your code will fail to execute in an acceptable timeframe in live trading environments."
                }
            ]
        },
        {
            weekNumber: 3,
            title: "SciPy Optimization, Linear Algebra & Statistical Modelling",
            days: [
                {
                    dayNumber: 15,
                    title: "Statistical Distributions & Return Modeling",
                    objective: "Leverage SciPy to fit continuous and discrete probability distributions to empirical asset returns. Measure skewness, kurtosis, and tail-risk for identifying fat-tailed asset behavior.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "QuantEcon: Statistical Examples in Python",
                            url: "https://python.quantecon.org/stats_examples.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Simulating Geometric & Negative Binomials",
                            url: "https://python.quantecon.org/stats_examples.html#negative-binomial-distribution"
                        }
                    ],
                    pitfall: "Assuming asset returns are strictly normally distributed. Financial returns exhibit leptokurtic (fat-tailed) distributions; using pure Gaussian assumptions will severely underestimate catastrophic downside risk (tail risk)."
                },
                {
                    dayNumber: 16,
                    title: "Linear Regression, CAPM, and Rolling Beta",
                    objective: "Deploy `scipy.stats.linregress` to compute the linear least-squares regression between individual stock returns and a benchmark index to derive the asset's Beta and construct Capital Asset Pricing Models (CAPM).",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "SciPy: scipy.stats.linregress",
                            url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.linregress.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "kaggle",
                            label: "NIFTY-50 Sector Beta Calculations",
                            url: "https://www.kaggle.com/code/avaneeshgujran/stock-market-prediction-data-model"
                        }
                    ],
                    pitfall: "Failing to account for non-stationary data. Regression analysis on raw price series generates spurious correlations. Always regress stationary time-series, such as percentage log returns."
                },
                {
                    dayNumber: 17,
                    title: "Linear Algebra & Markowitz Optimization",
                    objective: "Utilize NumPy and SciPy linear algebra solvers to construct covariance matrices and identify the Tangency Portfolio on the Efficient Frontier via modern portfolio theory (Markowitz).",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "QuantEcon: Linear Algebra",
                            url: "https://python.quantecon.org/linear_algebra.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Solving Systems of Equations & Inverses",
                            url: "https://python.quantecon.org/linear_algebra.html#linear-equations-with-scipy"
                        }
                    ],
                    pitfall: "Covariance matrix inversion on highly correlated assets leads to singularity matrices and exploding portfolio weights. Implement ridge regression or Tikhonov regularization (matrix shrinkage) before taking the inverse."
                },
                {
                    dayNumber: 18,
                    title: "Non-Linear Least Squares & Curve Fitting",
                    objective: "Apply `scipy.optimize.curve_fit` to calibrate theoretical pricing models to empirical data. Construct parameterized interest rate yield curves from sovereign bond market data.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "SciPy: scipy.optimize.curve_fit",
                            url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.curve_fit.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "SciPy Optimization Overview",
                            url: "https://docs.scipy.org/doc/scipy/reference/optimize.html#curve-fitting"
                        }
                    ],
                    pitfall: "Levenberg-Marquardt (the default curve_fit method) cannot handle bounds. For yield curves requiring strict positive outputs, explicitly shift to the 'trf' or 'dogbox' methods inside the curve_fit parameters."
                },
                {
                    dayNumber: 19,
                    title: "Global Optimization (SHGO) for Hyperparameters",
                    objective: "Use Simplicial Homology Global Optimization (SHGO) to discover optimal strategy parameters (e.g., RSI thresholds, stop-loss limits) over multi-dimensional, non-convex trading surfaces without getting stuck in local minima.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "SciPy: scipy.optimize.shgo",
                            url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.shgo.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Global Optimization Benchmark Implementations",
                            url: "https://docs.scipy.org/doc/scipy/reference/optimize.html#global-optimization"
                        }
                    ],
                    pitfall: "Overfitting. Just because a global optimizer discovers the mathematical peak of a PnL surface in the training set does not mean it will generalize. Always optimize strictly over in-sample data and validate out-of-sample."
                },
                {
                    dayNumber: 20,
                    title: "Convolutions & Signal Processing",
                    objective: "Repurpose signal processing techniques (`scipy.signal.fftconvolve`) to apply low-pass filters to high-frequency tick data, effectively smoothing out microstructure noise to reveal true price trajectory.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "QuantEcon: Convolutions and Distributions",
                            url: "https://python.quantecon.org/hoist_failure.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Fast Fourier Transform Convolution (fftconvolve)",
                            url: "https://python.quantecon.org/hoist_failure.html#approximating-distributions"
                        }
                    ],
                    pitfall: "Using standard `numpy.convolve` for large tick datasets. Time complexity scales quadratically. Always use FFT-based convolution (`scipy.signal.fftconvolve`) for data arrays larger than a few thousand elements."
                },
                {
                    dayNumber: 21,
                    title: "Week 3 Capstone: Statistical Arbitrage & Co-integration",
                    objective: "Synthesize SciPy linear regression, arrays, and optimizers to test for asset cointegration (e.g., pairs trading). Calculate spread z-scores and globally optimize the entry/exit standard deviation thresholds.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "SciPy Root Finding and Optimization",
                            url: "https://docs.scipy.org/doc/scipy/reference/optimize.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "QuantEcon Linear Algebra Eigenvalues",
                            url: "https://python.quantecon.org/eig_circulant.html"
                        }
                    ],
                    pitfall: "Assuming cointegration is static. Spread relationships break down (structural breaks) over time. Optimization parameters must be designed to adapt continuously in a rolling or sliding window approach."
                }
            ]
        },
        {
            weekNumber: 4,
            title: "Performance Tuning (Numba/Cython) & End-to-End Vectorized Backtester",
            days: [
                {
                    dayNumber: 22,
                    title: "Numba JIT Compilation (`@njit`) for Price Loops",
                    objective: "Dismantle Python's execution bottleneck. Use Numba's `@njit` (nopython mode) to compile path-dependent loops (like portfolio equity curves and drawdown calculations) down to native LLVM machine code.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "A ~5 minute guide to Numba",
                            url: "https://numba.readthedocs.io/en/stable/user/5minguide.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "QuantEcon: Endogenous Grid Method via JIT",
                            url: "https://python.quantecon.org/ifp_egm.html#numba-implementation"
                        }
                    ],
                    pitfall: "Passing Pandas DataFrames or non-homogeneous lists to an `@njit` decorated function. Numba only understands core Python scalars and NumPy arrays. Passing untyped objects invokes the massive overhead of object mode."
                },
                {
                    dayNumber: 23,
                    title: "Numba Auto-Parallelization & Prange",
                    objective: "Scale backtesting architecture across all CPU cores. Replace standard `range` with `prange` inside JIT functions to run multi-asset strategy parameter sweeps completely in parallel.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Numba: Automatic Parallelization",
                            url: "https://numba.readthedocs.io/en/stable/user/parallel.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Explicit Parallel Loops Implementation",
                            url: "https://numba.readthedocs.io/en/stable/user/parallel.html#explicit-parallel-loops"
                        }
                    ],
                    pitfall: "Race conditions. Care must be taken when reducing into slices or array elements accessed by multiple threads simultaneously. Ensure parallel loop indices target independent memory sectors."
                },
                {
                    dayNumber: 24,
                    title: "Vectorize and GUVectorize for Custom Indicators",
                    objective: "Build custom Universal Functions (ufuncs) using `@vectorize`. Create low-level, C-speed mathematical operations that natively broadcast across arrays for high-speed technical indicator generation.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Numba: Creating NumPy universal functions",
                            url: "https://numba.readthedocs.io/en/stable/user/vectorize.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Generalized UFuncs (GUVectorize)",
                            url: "https://numba.readthedocs.io/en/stable/user/vectorize.html#the-guvectorize-decorator"
                        }
                    ],
                    pitfall: "Using `@vectorize` on functions that require access to the entire array structure (like a rolling mean). Standard vectorize is strictly element-by-element; use `@guvectorize` to define input/output layout signatures for array subsets."
                },
                {
                    dayNumber: 25,
                    title: "Numba Jitclass for Stateful Strategies",
                    objective: "Design complex, state-aware quantitative systems. Use `@jitclass` to construct a blazing-fast Limit Order Book (LOB) matching engine that tracks liquidity profiles and order states inside machine code.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Numba: Compiling Python classes with @jitclass",
                            url: "https://numba.readthedocs.io/en/stable/user/jitclass.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Specifying numba.typed containers",
                            url: "https://numba.readthedocs.io/en/stable/user/jitclass.html#specifying-numba-typed-containers-as-class-members-explicitly"
                        }
                    ],
                    pitfall: "Failing to rigidly define class member types in the setup tuple list. A jitclass requires all fields (and array dimensions) to be explicitly mapped to Numba types before instantiation."
                },
                {
                    dayNumber: 26,
                    title: "Cython Static Typing and Pure Python Mode",
                    objective: "Explore an alternative optimization paradigm using Cython. Use `cython.declare` in Pure Python mode to inject C data types into variables and functions, allowing seamless compilation without custom .pyx syntax.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Cython: Faster code via static typing",
                            url: "https://cython.readthedocs.io/en/latest/src/quickstart/cythonize.html"
                        },
                        {
                            label: "Cython: Basic Tutorial",
                            url: "https://cython.readthedocs.io/en/latest/src/tutorial/cython_tutorial.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Pure Python Mode in Cython",
                            url: "https://cython.readthedocs.io/en/latest/src/tutorial/pure.html"
                        }
                    ],
                    pitfall: "Integer overflow. Cython maps typed integers strictly to C limits. A runaway compounding return loop mapped to a standard `cython.int` can silently overflow, whereas standard Python would scale arbitrarily."
                },
                {
                    dayNumber: 27,
                    title: "Profiling Bottlenecks & Optimization Pitfalls",
                    objective: "Profile Python execution environments to pinpoint microsecond latency. Identify Type Inference Failures in Numba and utilize HTML annotation files in Cython to target the specific lines relying on the C-API.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Numba Troubleshooting and Tips",
                            url: "https://numba.readthedocs.io/en/stable/user/troubleshoot.html"
                        },
                        {
                            label: "Determining where to add types (Cython)",
                            url: "https://cython.readthedocs.io/en/latest/src/quickstart/cythonize.html#determining-where-to-add-types"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Inspecting untyped list problems in JIT",
                            url: "https://numba.readthedocs.io/en/stable/user/troubleshoot.html#my-code-has-an-untyped-list-problem"
                        }
                    ],
                    pitfall: "Over-typing variables in Cython. Typing everything cuts down readability and flexibility. Profile first, and only apply strict typing (`@cython.locals`) to the explicit loop variables causing the computational drag."
                },
                {
                    dayNumber: 28,
                    title: "Week 4 Capstone: High-Frequency End-to-End Vectorized Backtester",
                    objective: "Build a full-scale, institutional-grade execution environment. Combine Pandas data downcasting, NumPy vectorization, and Numba auto-parallelization to backtest a market microstructure strategy against massive historical data.",
                    protocol: QUANT_PROTOCOL,
                    resources: [
                        {
                            label: "Numba Overview and Limitations",
                            url: "https://numba.readthedocs.io/en/stable/user/overview.html"
                        }
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "QuantEcon: EGM Implementation via JAX (Alternative Acceleration)",
                            url: "https://python.quantecon.org/os_egm_jax.html"
                        }
                    ],
                    pitfall: "Ignoring slippage and execution latency in the simulation logic. A lightning-fast Numba backtester is worthless if it fills orders at the exact un-adjusted mid-price during periods of high LOB sparsity."
                }
            ]
        }
    ]
};