import type { Course, DailyProtocol } from "@/lib/types";

export const QUANT_PROTOCOL_DL: DailyProtocol = {
    synthesize:
        "45m: Read official documentation, research papers, and conceptual guides to deeply understand the underlying deep learning architectures, optimization algorithms, and portfolio theory.",
    grind:
        "60-90m: Implement deep learning models (LSTM, Transformers, RL agents) and advanced portfolio optimization techniques from scratch, focusing on performance, stability, and interpretability.",
    bridge:
        "30m: Apply the day's concepts to real-world financial problems (e.g., price prediction, portfolio allocation, risk management) to build practical intuition and environmental resilience.",
    template:
        "15m: Re-write/extend the core template functions in your clean Python cheat sheet from scratch from memory to build operational muscle memory.",
};

export const deepLearningQuantRoadmap: Course = {
    id: "python-for-quants-deep-learning-portfolio",
    title: "Python for Quants: Deep Learning & Advanced Portfolio Optimization",
    description:
        "An advanced, hands-on course that takes quantitative trading to the next level with deep learning and sophisticated portfolio management. Covers time-series deep learning (LSTMs, Transformers), reinforcement learning for trading, modern portfolio optimization (risk parity, Black-Litterman), and the integration of these techniques into production-ready quant systems.",
    difficulty: "Expert",
    tags: ["Python", "PyTorch", "TensorFlow", "Deep Learning", "Reinforcement Learning", "Portfolio Optimization", "Risk Management", "Quant Finance"],
    estimatedHours: 84,
    category: "Quant Finance",
    tagline: "Deploy deep learning and advanced optimization to build cutting-edge quant strategies.",
    totalDays: 28,
    weeks: [
        {
            weekNumber: 1,
            title: "Deep Learning for Time-Series & Alpha Generation",
            days: [
                {
                    dayNumber: 1,
                    title: "PyTorch/TensorFlow Fundamentals for Quant",
                    objective:
                        "Establish a solid foundation in PyTorch (or TensorFlow) for building neural networks. Understand tensors, automatic differentiation, and the training loop, all within the context of financial data.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "PyTorch Tutorials",
                            url: "https://pytorch.org/tutorials/",
                        },
                        {
                            label: "TensorFlow Tutorials",
                            url: "https://www.tensorflow.org/tutorials",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "PyTorch for Finance (GitHub)",
                            url: "https://github.com/oliviermt/pytorch-finance",
                        },
                    ],
                    pitfall:
                        "Deep learning is data-hungry and prone to overfitting. Financial datasets are often small and noisy. Always use regularization (dropout, weight decay) and early stopping. Start with a simple baseline model before scaling up.",
                },
                {
                    dayNumber: 2,
                    title: "Recurrent Neural Networks (RNNs) & LSTMs",
                    objective:
                        "Implement RNNs and Long Short-Term Memory (LSTM) networks for sequential financial data. Use them to predict future returns, volatility, or other time-series targets.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "LSTM for Time Series (PyTorch)",
                            url: "https://pytorch.org/tutorials/beginner/nlp/sequence_models_tutorial.html",
                        },
                        {
                            label: "LSTM for Time Series (TensorFlow)",
                            url: "https://www.tensorflow.org/tutorials/structured_data/time_series",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "LSTM for Stock Prediction",
                            url: "https://www.google.com/search?q=lstm+stock+prediction+python",
                        },
                    ],
                    pitfall:
                        "LSTMs can suffer from vanishing/exploding gradients. Use gradient clipping and proper weight initialization. Also, be wary of look-ahead bias: ensure your sequences are aligned correctly in time.",
                },
                {
                    dayNumber: 3,
                    title: "Attention Mechanisms & Transformers",
                    objective:
                        "Understand the Transformer architecture and its application to financial time-series. Implement a simple Transformer or use the `transformers` library for multi-head attention and positional encoding.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "The Annotated Transformer",
                            url: "https://nlp.seas.harvard.edu/2018/04/03/attention.html",
                        },
                        {
                            label: "Hugging Face Transformers",
                            url: "https://huggingface.co/docs/transformers/index",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Transformer for Time Series",
                            url: "https://www.google.com/search?q=transformer+time+series+python",
                        },
                    ],
                    pitfall:
                        "Transformers are computationally expensive and require large datasets. For small financial datasets, they may not outperform simpler models. Use them for high-frequency or large-scale alternative data.",
                },
                {
                    dayNumber: 4,
                    title: "Autoencoders & Anomaly Detection",
                    objective:
                        "Use autoencoders (variational, denoising) to learn latent representations of financial data. Apply them for anomaly detection (e.g., market crashes, fraud) and feature extraction for subsequent models.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Autoencoders (PyTorch)",
                            url: "https://pytorch.org/tutorials/beginner/dcgan_faces_tutorial.html",
                        },
                        {
                            label: "Anomaly Detection in Finance",
                            url: "https://www.google.com/search?q=autoencoder+anomaly+detection+finance+python",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Autoencoder for Market Anomalies",
                            url: "https://www.google.com/search?q=autoencoder+financial+anomaly+detection",
                        },
                    ],
                    pitfall:
                        "Autoencoders can reconstruct anomalies well if they are common in the training set. Use a validation set with known anomalies to tune the threshold. The reconstruction error alone is not always sufficient.",
                },
                {
                    dayNumber: 5,
                    title: "Graph Neural Networks (GNNs) for Market Structure",
                    objective:
                        "Explore the use of Graph Neural Networks to model interconnections between assets (e.g., correlation networks, sector relationships). Use GNNs to generate signals based on relational data.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "PyTorch Geometric",
                            url: "https://pytorch-geometric.readthedocs.io/en/latest/",
                        },
                        {
                            label: "GNN for Finance",
                            url: "https://www.google.com/search?q=graph+neural+network+finance",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "GNN for Stock Prediction",
                            url: "https://www.google.com/search?q=gnn+stock+prediction",
                        },
                    ],
                    pitfall:
                        "GNNs require a well-defined graph structure. Building a meaningful graph (e.g., based on correlations, sector) is non-trivial. Also, GNNs are computationally heavy; start with small graphs.",
                },
                {
                    dayNumber: 6,
                    title: "Interpretability & Explainability",
                    objective:
                        "Learn to interpret deep learning models using techniques like SHAP, LIME, and attention visualization. Understand which features and patterns drive predictions to build trust and avoid black-box pitfalls.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "SHAP Documentation",
                            url: "https://shap.readthedocs.io/en/latest/",
                        },
                        {
                            label: "LIME Documentation",
                            url: "https://lime-ml.readthedocs.io/en/latest/",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Explainable AI for Finance",
                            url: "https://www.google.com/search?q=shap+finance+python",
                        },
                    ],
                    pitfall:
                        "Interpretability is crucial in finance for regulatory and risk reasons. Don't rely solely on black-box models. Always validate that the model's explanations align with domain knowledge.",
                },
                {
                    dayNumber: 7,
                    title: "Timed Simulation: Deep Learning Signal Generation",
                    objective:
                        "Simulate a research task to build a deep learning-based signal generation pipeline under time pressure.",
                    tasks: [
                        "Within a strict 90-minute block, load 5 years of high-frequency data for a single asset.",
                        "Build an LSTM model to predict 1-hour ahead returns.",
                        "Train the model with proper validation and early stopping.",
                        "Generate a trading signal based on the model's output and evaluate it on a test period.",
                    ],
                },
            ],
        },
        {
            weekNumber: 2,
            title: "Reinforcement Learning for Trading",
            days: [
                {
                    dayNumber: 8,
                    title: "RL Fundamentals & Gym Environment",
                    objective:
                        "Understand reinforcement learning basics: agents, environments, states, actions, rewards. Set up a custom trading environment using OpenAI Gym or a similar framework.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "OpenAI Gym",
                            url: "https://gym.openai.com/",
                        },
                        {
                            label: "Stable-Baselines3",
                            url: "https://stable-baselines3.readthedocs.io/",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Trading Environment with Gym",
                            url: "https://www.google.com/search?q=gym+trading+environment",
                        },
                    ],
                    pitfall:
                        "Designing a proper reward function is critical. A simple reward (e.g., profit) may lead to excessive risk-taking. Include penalties for drawdowns and transaction costs.",
                },
                {
                    dayNumber: 9,
                    title: "Deep Q-Networks (DQN) for Trading",
                    objective:
                        "Implement a DQN agent to learn optimal trading policies. Compare its performance against a benchmark strategy.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "DQN Paper (Nature)",
                            url: "https://www.nature.com/articles/nature14236",
                        },
                        {
                            label: "DQN Implementation (PyTorch)",
                            url: "https://pytorch.org/tutorials/intermediate/reinforcement_q_learning.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "DQN for Stock Trading",
                            url: "https://www.google.com/search?q=dqn+trading+python",
                        },
                    ],
                    pitfall:
                        "DQN can be unstable. Use experience replay, target networks, and careful hyperparameter tuning. Training can be slow; start with a small state space.",
                },
                {
                    dayNumber: 10,
                    title: "Policy Gradients & Actor-Critic Methods",
                    objective:
                        "Move beyond value-based methods to policy gradients and actor-critic (A2C, PPO) algorithms. Implement a simple actor-critic agent for trading.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "PPO (Proximal Policy Optimization)",
                            url: "https://openai.com/blog/openai-baselines-ppo/",
                        },
                        {
                            label: "Stable-Baselines3 PPO",
                            url: "https://stable-baselines3.readthedocs.io/en/master/modules/ppo.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Actor-Critic for Portfolio Optimization",
                            url: "https://www.google.com/search?q=actor-critic+trading",
                        },
                    ],
                    pitfall:
                        "Policy gradient methods can be sample-inefficient. Use parallel environments and careful hyperparameter tuning. Also, ensure the environment is stationary; non-stationary markets can break RL policies.",
                },
                {
                    dayNumber: 11,
                    title: "Multi-Agent & Portfolio RL",
                    objective:
                        "Extend RL to multiple assets and portfolio management. Learn to train agents that allocate capital across a portfolio, considering correlations and risk.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Multi-Agent RL (MARL)",
                            url: "https://www.google.com/search?q=multi-agent+reinforcement+learning",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Portfolio RL with Stable-Baselines3",
                            url: "https://www.google.com/search?q=portfolio+reinforcement+learning",
                        },
                    ],
                    pitfall:
                        "Multi-agent RL adds significant complexity. Start with a single-agent that controls a portfolio directly (action = allocation weights) before moving to separate agents.",
                },
                {
                    dayNumber: 12,
                    title: "Risk-Aware RL & Constrained Optimization",
                    objective:
                        "Incorporate risk constraints into RL (e.g., CVaR, max drawdown) using constrained policy optimization or reward shaping. Learn to balance return and risk.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Constrained RL",
                            url: "https://www.google.com/search?q=constrained+reinforcement+learning",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Risk-Aware RL for Finance",
                            url: "https://www.google.com/search?q=risk+constrained+rl+trading",
                        },
                    ],
                    pitfall:
                        "Adding risk constraints can make training significantly harder and less stable. Use a Lagrangian approach or reward shaping with a risk penalty.",
                },
                {
                    dayNumber: 13,
                    title: "Meta-Learning & Transfer Learning",
                    objective:
                        "Explore meta-learning (learning to learn) for trading strategies that adapt quickly to new market regimes. Use transfer learning to leverage knowledge from similar assets.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Model-Agnostic Meta-Learning (MAML)",
                            url: "https://arxiv.org/abs/1703.03400",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Meta-Learning for Finance",
                            url: "https://www.google.com/search?q=meta+learning+trading",
                        },
                    ],
                    pitfall:
                        "Meta-learning is an active research area and may not be practical for most applications. Start with simple transfer learning (fine-tuning a pre-trained model).",
                },
                {
                    dayNumber: 14,
                    title: "Timed Simulation: RL Trading Agent",
                    objective:
                        "Simulate building an RL trading agent under time pressure.",
                    tasks: [
                        "Within a strict 90-minute block, create a Gym trading environment for a single stock.",
                        "Implement a DQN agent and train it for a limited number of episodes.",
                        "Backtest the trained agent on a validation period.",
                        "Compare its performance to a buy-and-hold benchmark.",
                    ],
                },
            ],
        },
        {
            weekNumber: 3,
            title: "Advanced Portfolio Optimization & Risk Management",
            days: [
                {
                    dayNumber: 15,
                    title: "Mean-Variance Optimization Revisited",
                    objective:
                        "Review classical Markowitz mean-variance optimization. Implement it with practical constraints (long-only, turnover limits, etc.) using `scipy.optimize`.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Portfolio Optimization (scipy)",
                            url: "https://docs.scipy.org/doc/scipy/reference/optimize.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Markowitz Portfolio Optimization",
                            url: "https://www.google.com/search?q=markowitz+python+scipy",
                        },
                    ],
                    pitfall:
                        "Mean-variance optimization is highly sensitive to input estimates (returns and covariance). Use robust estimators (e.g., shrinkage, Ledoit-Wolf) and consider Bayesian approaches.",
                },
                {
                    dayNumber: 16,
                    title: "Risk Parity & Equal Risk Contribution",
                    objective:
                        "Implement risk parity portfolios where each asset contributes equally to total portfolio risk. Use optimization to find weights that equalize marginal risk contributions.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Risk Parity (PyPortfolioOpt)",
                            url: "https://pyportfolioopt.readthedocs.io/en/latest/RiskParity.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Risk Parity with Python",
                            url: "https://www.google.com/search?q=risk+parity+python",
                        },
                    ],
                    pitfall:
                        "Risk parity assumes a positive covariance matrix and may still be concentrated if correlations are high. Consider combining with minimum variance or other approaches.",
                },
                {
                    dayNumber: 17,
                    title: "Black-Litterman & Bayesian Approaches",
                    objective:
                        "Incorporate subjective views into portfolio optimization using the Black-Litterman model. Blend prior (equilibrium) returns with investor views to produce more stable allocations.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Black-Litterman (PyPortfolioOpt)",
                            url: "https://pyportfolioopt.readthedocs.io/en/latest/BlackLitterman.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Black-Litterman Example",
                            url: "https://www.google.com/search?q=black+litterman+python",
                        },
                    ],
                    pitfall:
                        "Views must be expressed carefully (absolute or relative) and with confidence. Overconfident views can dominate the prior and lead to unstable allocations.",
                },
                {
                    dayNumber: 18,
                    title: "Factor Investing & Smart Beta",
                    objective:
                        "Build factor-based portfolios (value, momentum, quality, etc.) and understand how to combine them for smart beta strategies. Use `statsmodels` or `alphalens` for factor analysis.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "alphalens (Factor Analysis)",
                            url: "https://github.com/quantopian/alphalens",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Factor Investing with Python",
                            url: "https://www.google.com/search?q=factor+investing+python",
                        },
                    ],
                    pitfall:
                        "Factors can decay over time. Regularly re-evaluate factor performance and be mindful of data-snooping bias.",
                },
                {
                    dayNumber: 19,
                    title: "Risk Management: VaR, CVaR & Stress Testing",
                    objective:
                        "Implement Value-at-Risk (VaR) and Conditional VaR (CVaR) using historical simulation, parametric, and Monte Carlo methods. Conduct stress testing on extreme market scenarios.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "VaR and CVaR (scipy)",
                            url: "https://www.google.com/search?q=var+cvar+python+scipy",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Risk Management in Python",
                            url: "https://www.google.com/search?q=value+at+risk+python",
                        },
                    ],
                    pitfall:
                        "VaR is not subadditive and can underestimate tail risk. Use CVaR for a more coherent risk measure. Always test on out-of-sample periods.",
                },
                {
                    dayNumber: 20,
                    title: "Factor Model & Performance Attribution",
                    objective:
                        "Use multi-factor models (Fama-French, Barra) to attribute portfolio performance to systematic risk factors. Understand how to decompose returns and assess manager skill.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Fama-French Data (Kenneth French)",
                            url: "https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Performance Attribution with Python",
                            url: "https://www.google.com/search?q=performance+attribution+python",
                        },
                    ],
                    pitfall:
                        "Factor models are backward-looking. Be cautious about using them to predict future performance; they explain past returns but may not capture new risk sources.",
                },
                {
                    dayNumber: 21,
                    title: "Timed Simulation: Portfolio Optimization",
                    objective:
                        "Simulate a portfolio construction task under time pressure.",
                    tasks: [
                        "Within a strict 90-minute block, load returns data for a universe of 50 stocks.",
                        "Compute the global minimum variance portfolio and the tangency portfolio (Max Sharpe).",
                        "Implement a risk parity portfolio using the equal risk contribution method.",
                        "Compare the three portfolios on a validation period using Sharpe, drawdown, and CVaR.",
                    ],
                },
            ],
        },
        {
            weekNumber: 4,
            title: "Production Systems, Monitoring & Integration",
            days: [
                {
                    dayNumber: 22,
                    title: "Deploying Deep Learning Models in Production",
                    objective:
                        "Learn to serve deep learning models using ONNX, TorchScript, or TensorFlow Serving. Build a real-time prediction service for trading signals.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "PyTorch Production",
                            url: "https://pytorch.org/tutorials/beginner/Intro_to_TorchScript_tutorial.html",
                        },
                        {
                            label: "TensorFlow Serving",
                            url: "https://www.tensorflow.org/tfx/guide/serving",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Deploy ML Model to AWS/GCP",
                            url: "https://www.google.com/search?q=deploy+ml+model+aws+lambda",
                        },
                    ],
                    pitfall:
                        "Model latency is critical for trading. Optimize inference speed (e.g., quantization, pruning). Also, ensure version control and A/B testing of models.",
                },
                {
                    dayNumber: 23,
                    title: "Real-Time Data Pipelines & Backtesting Integration",
                    objective:
                        "Build a real-time data pipeline using Kafka, WebSockets, or Redis. Integrate it with your backtesting framework to replay historical data or run live.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Apache Kafka Python",
                            url: "https://kafka-python.readthedocs.io/",
                        },
                        {
                            label: "WebSocket Client",
                            url: "https://websockets.readthedocs.io/",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Real-Time Data Pipeline",
                            url: "https://www.google.com/search?q=real+time+data+pipeline+python",
                        },
                    ],
                    pitfall:
                        "Real-time systems introduce new failure modes (connection drops, data delays, out-of-order data). Implement robust error handling and monitoring.",
                },
                {
                    dayNumber: 24,
                    title: "Automated Strategy Execution & Order Management",
                    objective:
                        "Build an order management system (OMS) that interfaces with brokerage APIs. Implement risk checks (position limits, max order size) and execution algorithms (VWAP, TWAP).",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Alpaca Trading API",
                            url: "https://alpaca.markets/docs/",
                        },
                        {
                            label: "IBKR API",
                            url: "https://interactivebrokers.github.io/tws-api/",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Automated Trading System",
                            url: "https://www.google.com/search?q=automated+trading+system+python",
                        },
                    ],
                    pitfall:
                        "Execution is non-trivial. Paper trade extensively before going live. Include slippage and latency modeling in your backtests.",
                },
                {
                    dayNumber: 25,
                    title: "Monitoring, Alerts & Logging",
                    objective:
                        "Set up monitoring dashboards (Grafana, Prometheus) and alerts for your trading system. Track performance metrics (P&L, drawdown, Sharpe) in real-time.",
                    protocol: QUANT_PROTOCOL_DL,
                    resources: [
                        {
                            label: "Prometheus Python Client",
                            url: "https://github.com/prometheus/client_python",
                        },
                    ],
                    practice: [
                        {
                            platform: "google",
                            label: "Monitoring for Trading Systems",
                            url: "https://www.google.com/search?q=monitoring+trading+system+python",
                        },
                    ],
                    pitfall:
                        "Monitoring is often neglected until something breaks. Set up alerts for excessive drawdown, connection failures, and unusual behavior.",
                },
                {
                    dayNumber: 26,
                    title: "Template Consolidation 3",
                    objective:
                        "Create a personal Python quant library with reusable templates for deep learning, RL, portfolio optimization, and production deployment.",
                    tasks: [
                        "Re-engineer from scratch core templates for: LSTM signal model, DQN agent, risk parity optimizer, and real-time prediction service.",
                        "Ensure every template includes comprehensive documentation, error handling, and logging.",
                    ],
                },
                {
                    dayNumber: 27,
                    title: "Mock Project: End-to-End Quant System",
                    objective:
                        "Simulate building a complete production-ready quant system from data ingestion to execution.",
                    tasks: [
                        "Design a deep learning-based strategy (e.g., LSTM + RL portfolio allocation).",
                        "Build a real-time data pipeline (simulated or with WebSocket).",
                        "Implement the strategy execution with risk checks and order management.",
                        "Deploy a monitoring dashboard to track performance.",
                        "Present the system architecture and results.",
                    ],
                },
                {
                    dayNumber: 28,
                    title: "Final Review & Career Path",
                    objective:
                        "Consolidate all skills and plan next steps in the quant career path.",
                    tasks: [
                        "Review all code, templates, and notes from the past 4 weeks.",
                        "Identify areas for further study (e.g., high-frequency, derivatives, crypto).",
                        "Explore resources for job interviews (quant research, trading, systematic strategies).",
                        "Rest and reset for continuous learning.",
                    ],
                },
            ],
        },
    ],
};