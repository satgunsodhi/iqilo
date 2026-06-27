import type { Course, DailyProtocol } from "@/lib/types";

export const QUANT_PROTOCOL_ADV: DailyProtocol = {
    synthesize:
        "45m: Read official documentation and conceptual guides to deeply understand the underlying statistical models, machine learning algorithms, and their assumptions.",
    grind:
        "60-90m: Implement core predictive models (ARIMA, GARCH, Random Forest, XGBoost) on financial data, focusing on proper data preparation, model training, and performance evaluation.",
    bridge:
        "30m: Apply the day's concepts to a real financial prediction problem (e.g., volatility forecasting, signal generation) to build practical intuition and environmental resilience.",
    template:
        "15m: Re-write/extend the core template functions in your clean Python cheat sheet from scratch from memory to build operational muscle memory.",
};

export const QuantMLRoadmap: Course = {
    id: "python-for-quants-predictive-modeling",
    title: "Python for Quants II: Predictive Modeling & ML",
    description:
        "An intensive, hands-on course that bridges the gap between foundational data science and cutting-edge quantitative trading. Covers time-series analysis with statsmodels (ARIMA, GARCH), machine learning with scikit-learn and XGBoost for signal generation, feature engineering, robust backtesting, and the critical pitfalls of financial machine learning.",
    difficulty: "Advanced",
    tags: ["Python", "Statsmodels", "Scikit-learn", "XGBoost", "Time-Series", "Machine Learning", "Backtesting", "Quant Finance"],
    estimatedHours: 84,
    category: "Quant Finance",
    tagline: "Build predictive models and backtest strategies to generate alpha.",
    totalDays: 28,
    weeks: [
        {
            weekNumber: 1,
            title: "Time-Series Analysis & Forecasting with Statsmodels",
            days: [
                {
                    dayNumber: 1,
                    title: "Time-Series Fundamentals & Statsmodels",
                    objective:
                        "Revisit core time-series concepts (stationarity, autocorrelation) and learn how to leverage the `statsmodels` library for descriptive analysis, visualization, and statistical tests (ADF, KPSS).",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Time Series analysis (statsmodels.tsa)",
                            url: "https://www.statsmodels.org/stable/tsa.html",
                        },
                        {
                            label: "Time Series Analysis in Python (Official Docs)",
                            url: "https://www.statsmodels.org/stable/examples/index.html#time-series-analysis",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "QuantConnect Time-Series Tutorial",
                            url: "https://www.quantconnect.com/tutorials",
                        },
                    ],
                    pitfall:
                        "Financial time series are almost always non-stationary. Always apply a transformation (e.g., differencing, log-returns) before fitting models like ARIMA. Relying on visual inspection is not enough; always use statistical tests like ADF (Augmented Dickey-Fuller) to formally check for stationarity.",
                },
                {
                    dayNumber: 2,
                    title: "ARIMA Models for Forecasting",
                    objective:
                        "Master the ARIMA (Autoregressive Integrated Moving Average) model. Learn model identification (ACF/PACF plots), parameter selection (p, d, q), and how to use `statsmodels` to fit, forecast, and evaluate ARIMA models on financial returns.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "ARIMA Models (statsmodels)",
                            url: "https://www.statsmodels.org/stable/generated/statsmodels.tsa.arima.model.ARIMA.html",
                        },
                        {
                            label: "ARIMA Example Notebook",
                            url: "https://www.statsmodels.org/stable/examples/notebooks/generated/arima.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "ARIMA Model for Stock Price Forecasting",
                            url: "https://www.google.com/search?q=arima+model+python+finance",
                        },
                    ],
                    pitfall:
                        "ARIMA models assume linearity and a stable underlying process. They are notoriously poor at forecasting financial returns in practice due to non-linearities and structural breaks. Use them for baseline and understanding, but be cautious about deploying them for live trading.",
                },
                {
                    dayNumber: 3,
                    title: "Seasonal ARIMA (SARIMA) & Exogenous Variables (SARIMAX)",
                    objective:
                        "Extend ARIMA to handle seasonality (e.g., intraday patterns) and incorporate exogenous variables (e.g., market factors, economic indicators) using the SARIMAX model in `statsmodels`.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "SARIMAX (statsmodels)",
                            url: "https://www.statsmodels.org/stable/generated/statsmodels.tsa.statespace.sarimax.SARIMAX.html",
                        },
                        {
                            label: "SARIMAX Example",
                            url: "https://www.statsmodels.org/stable/examples/notebooks/generated/sarimax.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Advanced Time Series Forecasting with SARIMAX",
                            url: "https://www.google.com/search?q=sarimax+example+python",
                        },
                    ],
                    pitfall:
                        "Including too many exogenous variables (X) can lead to overfitting. Always use a validation set and cross-validation to select features. Also, ensure your exogenous variables are known for the forecast period, which is a significant limitation in real-time trading.",
                },
                {
                    dayNumber: 4,
                    title: "Volatility Modeling: ARCH & GARCH",
                    objective:
                        "Understand and implement volatility clustering models using the `arch` library. Fit GARCH (Generalized Autoregressive Conditional Heteroskedasticity) models to capture the time-varying volatility of financial returns.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Arch Library Documentation",
                            url: "https://arch.readthedocs.io/en/latest/",
                        },
                        {
                            label: "Arch Library (PyPI)",
                            url: "https://pypi.org/project/arch/",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Volatility Forecasting with GARCH",
                            url: "https://www.google.com/search?q=garch+model+python+finance",
                        },
                    ],
                    pitfall:
                        "GARCH models are sensitive to outliers and structural breaks. The assumption of a normal distribution for errors is often violated; consider using Student-t or skewed distributions for more robust volatility forecasts.",
                },
                {
                    dayNumber: 5,
                    title: "Vector Autoregression (VAR) for Multi-Asset",
                    objective:
                        "Move beyond univariate models to analyze multivariate time-series using VAR (Vector Autoregression). Use it to model the interdependencies between multiple assets and perform impulse response analysis.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "VAR (statsmodels)",
                            url: "https://www.statsmodels.org/stable/vector_ar.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "VAR Model for Macroeconomic Forecasting",
                            url: "https://www.google.com/search?q=var+model+python+finance",
                        },
                    ],
                    pitfall:
                        "VAR models require a large number of parameters, which quickly leads to overfitting. Use lag selection criteria (AIC, BIC) and be mindful of the curse of dimensionality. They are best suited for medium-dimensional systems (e.g., 5-10 assets).",
                },
                {
                    dayNumber: 6,
                    title: "Cointegration & Pairs Trading",
                    objective:
                        "Learn the concept of cointegration and how to identify cointegrated pairs using the Johansen test. Apply this to build a classic pairs trading strategy, a foundational statistical arbitrage technique.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Cointegration Test (statsmodels)",
                            url: "https://www.statsmodels.org/stable/generated/statsmodels.tsa.vector_ar.vecm.coint_johansen.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Pairs Trading Strategy with Python",
                            url: "https://www.google.com/search?q=pairs+trading+python+cointegration",
                        },
                    ],
                    pitfall:
                        "Cointegration is not the same as correlation. Two highly correlated assets can drift apart permanently (not cointegrated), leading to catastrophic losses in a pairs trade. Always test for cointegration and be strict with your entry/exit thresholds.",
                },
                {
                    dayNumber: 7,
                    title: "Timed Simulation: Time-Series Forecasting",
                    objective:
                        "Simulate a quantitative research task to reinforce time-series modeling skills under time pressure.",
                    tasks: [
                        "Within a strict 90-minute block, load 10 years of daily S&P 500 returns.",
                        "Fit an ARIMA, GARCH, and a simple VAR model to forecast volatility and returns.",
                        "Backtest a simple volatility-based trading strategy (e.g., buy when volatility is low).",
                        "Evaluate the models using out-of-sample RMSE and create a performance summary.",
                    ],
                },
            ],
        },
        {
            weekNumber: 2,
            title: "Machine Learning for Alpha Generation",
            days: [
                {
                    dayNumber: 8,
                    title: "ML Fundamentals & Scikit-learn",
                    objective:
                        "Establish a robust machine learning pipeline using `scikit-learn`. Master data preprocessing (scaling, encoding), cross-validation, and model evaluation metrics specifically for financial data.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Scikit-learn User Guide",
                            url: "https://scikit-learn.org/stable/user_guide.html",
                        },
                        {
                            label: "Scikit-learn: Machine Learning in Python",
                            url: "https://scikit-learn.org/stable/",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Scikit-learn Tutorials",
                            url: "https://scikit-learn.org/stable/tutorial/index.html",
                        },
                    ],
                    pitfall:
                        "In financial machine learning, standard cross-validation (e.g., k-fold) leads to look-ahead bias. Always use time-series split or purged cross-validation to respect the temporal order of data.",
                },
                {
                    dayNumber: 9,
                    title: "Feature Engineering for Financial Data",
                    objective:
                        "Learn to create predictive features from raw price and volume data: technical indicators, lagged returns, rolling statistics, and macro features. Explore automated feature engineering libraries.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Feature Engineering for Finance",
                            url: "https://www.google.com/search?q=feature+engineering+for+quant+trading+python",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "QuantConnect Feature Engineering",
                            url: "https://www.quantconnect.com/tutorials",
                        },
                    ],
                    pitfall:
                        "Feature engineering is the most important part of a quant workflow. Avoid using information that wouldn't be available at the time of prediction (look-ahead bias). Always use `.shift()` to align signals correctly.",
                },
                {
                    dayNumber: 10,
                    title: "Tree-Based Models: Random Forest & XGBoost",
                    objective:
                        "Implement and tune powerful tree-based models (Random Forest, XGBoost) for classification and regression tasks, such as predicting future price direction or returns.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "XGBoost Documentation",
                            url: "https://xgboost.readthedocs.io/en/stable/",
                        },
                        {
                            label: "Scikit-learn Ensemble Methods",
                            url: "https://scikit-learn.org/stable/modules/ensemble.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "XGBoost for Financial Forecasting",
                            url: "https://www.google.com/search?q=xgboost+finance+python",
                        },
                    ],
                    pitfall:
                        "Tree-based models are prone to overfitting, especially with a large number of features. Use early stopping, regularization, and feature importance analysis to create a more robust model.",
                },
                {
                    dayNumber: 11,
                    title: "Linear Models & Regularization (Ridge, Lasso)",
                    objective:
                        "Apply linear models with L1 (Lasso) and L2 (Ridge) regularization for feature selection and to prevent overfitting. Use these for factor modeling and risk exposure analysis.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Linear Models (scikit-learn)",
                            url: "https://scikit-learn.org/stable/modules/linear_model.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Regularized Linear Models for Finance",
                            url: "https://www.google.com/search?q=lasso+ridge+finance+python",
                        },
                    ],
                    pitfall:
                        "Linear models are highly interpretable, but they assume linearity. Feature engineering (e.g., polynomial features, interactions) can help capture non-linear relationships, but this increases the risk of overfitting.",
                },
                {
                    dayNumber: 12,
                    title: "Support Vector Machines & Neural Networks",
                    objective:
                        "Explore the application of non-linear models like SVM and Neural Networks for financial prediction. Understand their strengths, weaknesses, and computational costs.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "SVM (scikit-learn)",
                            url: "https://scikit-learn.org/stable/modules/svm.html",
                        },
                        {
                            label: "Neural Network Models (scikit-learn)",
                            url: "https://scikit-learn.org/stable/modules/neural_networks_supervised.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "MLPClassifier for Trading Signals",
                            url: "https://www.google.com/search?q=neural+network+trading+python",
                        },
                    ],
                    pitfall:
                        "Neural networks are data-hungry and prone to overfitting. For most financial datasets (which are relatively small and noisy), simpler models like regularized linear models or XGBoost often outperform deep learning.",
                },
                {
                    dayNumber: 13,
                    title: "Model Evaluation & Feature Selection",
                    objective:
                        "Master the evaluation of financial ML models. Use purged cross-validation, walk-forward analysis, and performance metrics (Sharpe, Sortino, Hit Rate) that matter to a trader.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Model Evaluation (scikit-learn)",
                            url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
                        },
                        {
                            label: "Feature Selection (scikit-learn)",
                            url: "https://scikit-learn.org/stable/modules/feature_selection.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "ML for Trading Evaluation",
                            url: "https://www.google.com/search?q=walk+forward+analysis+python",
                        },
                    ],
                    pitfall:
                        "Accuracy is a poor metric for financial classification. Focus on metrics that align with trading goals: Sharpe ratio, maximum drawdown, and profit factor. Always evaluate on a realistic, out-of-sample period.",
                },
                {
                    dayNumber: 14,
                    title: "Timed Simulation: ML Signal Generation",
                    objective:
                        "Simulate a research task to build a complete ML-based signal generation pipeline under time pressure.",
                    tasks: [
                        "Within a strict 90-minute block, engineer a set of features from 5 years of stock data.",
                        "Train an XGBoost classifier to predict next-day price movement.",
                        "Backtest a strategy based on the model's signals.",
                        "Evaluate the strategy using walk-forward analysis and report the Sharpe ratio.",
                    ],
                },
            ],
        },
        {
            weekNumber: 3,
            title: "Backtesting, Strategy Development & Deployment",
            days: [
                {
                    dayNumber: 15,
                    title: "Vectorized Backtesting with VectorBT",
                    objective:
                        "Learn to build fast, vectorized backtests using VectorBT. Design a simple momentum strategy, compute performance metrics, and visualize equity curves.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "VectorBT Documentation",
                            url: "https://vectorbt.dev/",
                        },
                        {
                            label: "VectorBT GitHub Repository",
                            url: "https://github.com/polakowo/vectorbt",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "VectorBT Examples",
                            url: "https://vectorbt.dev/examples/",
                        },
                    ],
                    pitfall:
                        "Vectorized backtesting is fast but can be unrealistic. It assumes you can trade at the exact price and ignores execution costs. Always incorporate realistic slippage and commission models.",
                },
                {
                    dayNumber: 16,
                    title: "Event-Driven Backtesting with Backtrader",
                    objective:
                        "Build an event-driven backtesting framework using Backtrader. This approach is more realistic for simulating order execution and handling complex trading rules.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Backtrader Documentation",
                            url: "https://www.backtrader.com/docu/",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Backtrader Quickstart",
                            url: "https://www.backtrader.com/docu/quickstart/quickstart.html",
                        },
                    ],
                    pitfall:
                        "Event-driven backtesting is more computationally expensive than vectorized. Use it for strategies with complex order logic, but for simple strategies, vectorized backtesting is often sufficient and much faster.",
                },
                {
                    dayNumber: 17,
                    title: "Performance Metrics & Risk Analysis",
                    objective:
                        "Go beyond Sharpe ratio. Implement a comprehensive suite of performance metrics: Sortino Ratio, Calmar Ratio, Maximum Drawdown, and statistical tests (t-test, bootstrapping) to evaluate strategy robustness.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "ffn - Financial Functions for Python",
                            url: "https://pypi.org/project/ffn/",
                        },
                        {
                            label: "Performance Metrics (QuantConnect)",
                            url: "https://www.quantconnect.com/docs/v2/lean-cli/tutorials/statistics",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Performance Metrics with ffn",
                            url: "https://www.google.com/search?q=ffn+python+finance",
                        },
                    ],
                    pitfall:
                        "Don't just look at Sharpe ratio. Evaluate maximum drawdown, win rate, and profit factor. A strategy with a high Sharpe but a huge drawdown is not suitable for live trading.",
                },
                {
                    dayNumber: 18,
                    title: "Multi-Asset & Portfolio Backtesting",
                    objective:
                        "Extend backtesting to multi-asset portfolios. Implement position sizing (e.g., Kelly Criterion, risk parity) and rebalancing logic.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Portfolio Optimization (scipy)",
                            url: "https://docs.scipy.org/doc/scipy/reference/optimize.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Portfolio Backtesting with Python",
                            url: "https://www.google.com/search?q=portfolio+backtesting+python",
                        },
                    ],
                    pitfall:
                        "Portfolio-level backtesting introduces new challenges: correlations between assets, rebalancing frequency, and transaction costs. Ignoring these can lead to overoptimistic results.",
                },
                {
                    dayNumber: 19,
                    title: "Dealing with Look-Ahead Bias & Overfitting",
                    objective:
                        "Master the critical concepts of look-ahead bias and overfitting in quant finance. Learn techniques to detect and prevent them, ensuring your strategies are robust.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Purged Cross-Validation",
                            url: "https://www.google.com/search?q=purged+cross+validation+python",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Walk-Forward Analysis Tutorial",
                            url: "https://www.google.com/search?q=walk+forward+analysis+python",
                        },
                    ],
                    pitfall:
                        "The biggest pitfall in quant finance is overfitting to historical data. Always use a strict out-of-sample period and multiple robustness checks (e.g., parameter sensitivity analysis, different market regimes).",
                },
                {
                    dayNumber: 20,
                    title: "Live Data & Alpaca/IBKR Integration",
                    objective:
                        "Connect your strategies to live market data feeds and brokerage APIs (e.g., Alpaca, Interactive Brokers). Build a simple execution system.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Alpaca Trading API Docs",
                            url: "https://alpaca.markets/docs/",
                        },
                        {
                            label: "IBKR API Python Docs",
                            url: "https://interactivebrokers.github.io/tws-api/",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Alpaca Python SDK",
                            url: "https://github.com/alpacahq/alpaca-trade-api-python",
                        },
                    ],
                    pitfall:
                        "Live trading is vastly different from backtesting. Expect execution delays, slippage, and API failures. Start with paper trading and small positions. Robust error handling is not optional.",
                },
                {
                    dayNumber: 21,
                    title: "Timed Simulation: Build a Live Strategy",
                    objective:
                        "Simulate building a complete strategy from data ingestion to live signal generation under time pressure.",
                    tasks: [
                        "Within a strict 90-minute block, write a script that pulls live data from an API.",
                        "Generate a trading signal based on a simple moving average crossover.",
                        "Place a paper trade through the Alpaca API.",
                        "Log the trade and send a notification.",
                    ],
                },
            ],
        },
        {
            weekNumber: 4,
            title: "Advanced Topics & Project Integration",
            days: [
                {
                    dayNumber: 22,
                    title: "Reinforcement Learning for Trading",
                    objective:
                        "Explore the application of Reinforcement Learning (RL) to trading. Understand the concepts of agents, environments, and rewards. Implement a simple Q-learning or DQN agent.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "Stable-Baselines3 Documentation",
                            url: "https://stable-baselines3.readthedocs.io/en/master/",
                        },
                        {
                            label: "Deep RL for Trading (Book)",
                            url: "https://www.google.com/search?q=deep+reinforcement+learning+for+trading",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "RL for Trading Tutorial",
                            url: "https://www.google.com/search?q=reinforcement+learning+trading+python",
                        },
                    ],
                    pitfall:
                        "RL is a highly advanced and computationally expensive field. It is not a silver bullet. Most successful quant firms use simpler, more interpretable models. Start with a toy problem before attempting live markets.",
                },
                {
                    dayNumber: 23,
                    title: "Alternative Data & NLP",
                    objective:
                        "Learn how to incorporate alternative data sources (e.g., news, social media sentiment) into your trading models using Natural Language Processing (NLP).",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "NLTK Documentation",
                            url: "https://www.nltk.org/",
                        },
                        {
                            label: "Sentiment Analysis with VADER",
                            url: "https://www.google.com/search?q=vader+sentiment+analysis+python",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "NLP for Trading",
                            url: "https://www.google.com/search?q=nlp+for+trading+python",
                        },
                    ],
                    pitfall:
                        "Alternative data is often noisy and requires significant cleaning. Sentiment analysis models can be easily fooled. Always validate your signals against actual price movements.",
                },
                {
                    dayNumber: 24,
                    title: "High-Frequency & Tick Data",
                    objective:
                        "Understand the challenges and opportunities of high-frequency trading. Learn to work with tick data, handle massive datasets, and implement micro-structure models.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "High-Frequency Trading (Book)",
                            url: "https://www.google.com/search?q=high+frequency+trading+python",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Tick Data Analysis",
                            url: "https://www.google.com/search?q=tick+data+analysis+python",
                        },
                    ],
                    pitfall:
                        "HFT requires ultra-low latency infrastructure. It is not feasible for retail traders. Focus on the analytical aspects, but be aware of the practical limitations.",
                },
                {
                    dayNumber: 25,
                    title: "Productionizing ML Models",
                    objective:
                        "Learn how to deploy machine learning models into a production environment. Use tools like MLflow, Docker, and cloud platforms to manage and monitor models.",
                    protocol: QUANT_PROTOCOL_ADV,
                    resources: [
                        {
                            label: "MLflow Documentation",
                            url: "https://mlflow.org/docs/latest/index.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "other",
                            label: "Deploying ML Models",
                            url: "https://www.google.com/search?q=mlflow+python+tutorial",
                        },
                    ],
                    pitfall:
                        "Production ML requires continuous monitoring and retraining. Models decay over time as market regimes change. Automate your retraining pipeline.",
                },
                {
                    dayNumber: 26,
                    title: "Template Consolidation 2",
                    objective:
                        "Create a personal Python quant library with reusable templates for machine learning and backtesting.",
                    tasks: [
                        "Re-engineer from scratch core templates for: building a time-series forecasting pipeline, training an XGBoost classifier, vectorized backtesting with VectorBT, and event-driven backtesting with Backtrader.",
                        "Ensure every template includes a robust cross-validation and evaluation framework.",
                    ],
                },
                {
                    dayNumber: 27,
                    title: "Mock Project: End-to-End ML Strategy",
                    objective:
                        "Simulate a complete quantitative research project from data ingestion to live trading signal generation.",
                    tasks: [
                        "Select a universe of 50 stocks and download 10 years of daily price data.",
                        "Engineer a set of predictive features.",
                        "Train and evaluate an XGBoost model using purged cross-validation.",
                        "Build a backtest of a strategy based on the model's signals.",
                        "Present the results in a clear, well-commented Jupyter Notebook.",
                    ],
                },
                {
                    dayNumber: 28,
                    title: "Final Review & Next Steps",
                    objective:
                        "Consolidate knowledge and plan the next phase: deep learning (PyTorch/TensorFlow) and advanced portfolio management.",
                    tasks: [
                        "Review all code, templates, and notes from the past 4 weeks.",
                        "Identify areas of weakness and plan targeted practice.",
                        "Explore the next course in the series: 'Deep Learning & Advanced Portfolio Management for Quant Trading'.",
                        "Rest and reset for the next intensive learning phase.",
                    ],
                },
            ],
        },
    ],
};