import type { Course, DailyProtocol } from "@/lib/types";

export const QUANT_PROTOCOL_DERIV: DailyProtocol = {
    synthesize:
        "45m: Read official documentation, academic papers, and specific code implementations to deconstruct the mathematical proofs and numerical constraints of the day's model.",
    grind:
        "60-90m: Implement the derivative pricing model or risk metric algorithm from scratch, prioritizing vectorization, numerical stability, and memory-safe execution.",
    bridge:
        "30m: Validate your implementation against edge cases (e.g., deep OTM options, negative interest rates, zero-variance paths) to build operational resilience.",
    template:
        "15m: Consolidate the core mathematical functions and calibration logic into your personal Python quantitative library.",
};

export const derivativesRiskRoadmap: Course = {
    id: "python-for-quants-derivatives-risk",
    title: "Python for Quants III: Derivatives Pricing & Risk",
    description:
        "An advanced, exhaustive curriculum architected to master derivatives pricing, stochastic numerical methods, and enterprise risk management. Transitions from Black-Scholes and lattice trees to Longstaff-Schwartz Monte Carlo, Local Volatility calibration, ISDA CDS pricing, XVA computation, and FRTB Standardised Approach regulatory capital.",
    difficulty: "Expert",
    tags: ["Stochastic Calculus", "Binomial Lattices", "LSM Monte Carlo", "Dupire Local Volatility", "Hull-White Calibration", "ISDA CDS", "XVA", "FRTB", "VaR/CVaR"],
    estimatedHours: 84,
    category: "Quant Finance",
    tagline: "Engineer production-grade derivative pricing and regulatory risk models.",
    prerequisites: ["python-for-quants-predictive-modeling"],
    totalDays: 28,
    weeks: [
        {
            weekNumber: 1,
            title: "Analytical Pricing & Lattice Foundations",
            days: [
                {
                    dayNumber: 1,
                    title: "Filtrations, Martingales & The Risk-Neutral Measure",
                    objective:
                        "Establish the rigorous probability theoretic foundations for pricing. Understand filtrations, conditional expectations, Girsanov's Theorem, and the transition from real-world (P) to risk-neutral (Q) measures.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Lognormal Distributions & BSM (Hilpisch)",
                            url: "https://github.com/yhilpisch/py4fi2nd/blob/master/code/ch12/bsm_functions.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Black-Scholes Options Class",
                            url: "https://github.com/yhilpisch/py4fi2nd/blob/master/code/b_bsm/bsm_option_class.py",
                        },
                    ],
                    pitfall:
                        "Confusing the real-world drift (mu) with the risk-neutral drift (r - q). When generating price paths for pricing, you must simulate under Q. When generating paths for VaR or risk management, you must simulate under P.",
                },
                {
                    dayNumber: 2,
                    title: "Black-Scholes-Merton & Characteristic Functions",
                    objective:
                        "Implement the BSM closed-form solutions. Extend pricing capabilities to handle continuous dividend yields (Merton) and explore the limits of the log-normal assumption.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "BSM Implementation & Visualization",
                            url: "https://github.com/Alqama-svg/Black-Scholes-Analysis/blob/main/black_scholes.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "BSM Pricing Engine (QuantLib SWIG)",
                            url: "https://github.com/lballabio/QuantLib-SWIG/blob/master/Python/examples/european-option.py",
                        },
                    ],
                    pitfall:
                        "The BSM formula suffers from catastrophic cancellation in deep Out-of-The-Money (OTM) options with short maturities. Standard normal CDF implementations will underflow to zero. Use asymptotic expansions or log-space CDFs for deep OTM pricing.",
                },
                {
                    dayNumber: 3,
                    title: "Binomial Lattices & Moment Matching",
                    objective:
                        "Construct Cox-Ross-Rubinstein (CRR) and Rendleman-Bartter (RB) binomial trees for European and American options. Understand risk-neutral probability boundaries.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "PyOptionTree (CRR & RB Trees)",
                            url: "https://github.com/Finsinyur/PyOptionTree/blob/master/pyop3/binomial_tree.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Binomial Tree Implementation",
                            url: "https://github.com/gokkayahmet/PRICING-DERIVATIVES-WITH-BINOMIAL-TREE-MODEL/blob/main/BinomialTree.py",
                        },
                    ],
                    pitfall:
                        "In CRR trees, if the time step (dt) is too large or volatility is too low, the up/down factors can cause the risk-neutral probability to fall outside [0,1], generating arbitrage states. Always assert 0 < p < 1 during lattice construction.",
                },
                {
                    dayNumber: 4,
                    title: "High-Performance Greeks & Sensitivities",
                    objective:
                        "Compute first, second, and third-order Greeks analytically. Optimize chain-level Greeking to prevent CPU bottlenecks when evaluating large option surfaces.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "OpenGreeks (High-speed Rust/Python)",
                            url: "https://github.com/marketcalls/opengreeks/blob/main/src/black_scholes.rs",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Interactive BSM Calculator",
                            url: "https://github.com/TFSM00/Black-Scholes-Calculator/blob/main/app.py",
                        },
                    ],
                    pitfall:
                        "Finite difference approximations of Gamma and Vega can be highly unstable due to bump-size sensitivity. Use dual-delta and dual-gamma formulas where analytical derivatives are unavailable, or leverage Automatic Differentiation (AD).",
                },
                {
                    dayNumber: 5,
                    title: "Implied Volatility Inversion & Root Finding",
                    objective:
                        "Extract implied volatility from market prices using Newton-Raphson, Bisection, and Brent's method. Handle non-convergence cases gracefully.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Numerical Model Calibration",
                            url: "https://github.com/andreachello/Computational-Finance/blob/main/6.%20Model%20Calibration.ipynb",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Let's Be Rational IV Inversion (Jaeckel)",
                            url: "https://github.com/marketcalls/opengreeks/blob/main/src/lets_be_rational.rs",
                        },
                    ],
                    pitfall:
                        "Newton-Raphson relies on Vega in the denominator. For deep ITM/OTM options, Vega approaches zero, causing the algorithm to diverge or overflow. Fall back to Brent's method (which combines bisection, secant, and inverse quadratic interpolation) when Vega < 1e-8.",
                },
                {
                    dayNumber: 6,
                    title: "Exotic Options: Barriers & Digital Payoffs",
                    objective:
                        "Price Up-and-Out, Down-and-In, and Digital/Binary options. Understand the impact of discrete vs. continuous barrier monitoring.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Exotic Options Analytical Pricer",
                            url: "https://github.com/cantaro86/Financial-Models-Numerical-Methods/blob/master/2.2%20Exotic%20options.ipynb",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Lookback Option Value",
                            url: "https://github.com/alki22/Lookback-option-value/blob/main/Lookback_Option.py",
                        },
                    ],
                    pitfall:
                        "Analytical formulas for barrier options assume continuous monitoring. Real market barriers are often monitored discretely (e.g., daily close). Failing to apply the Broadie-Glasserman-Kou continuity correction will result in systematic over/under-pricing.",
                },
                {
                    dayNumber: 7,
                    title: "Timed Simulation: Surface Calibration & Greeks",
                    objective:
                        "Simulate a real-time trading desk task to calibrate a volatility surface and compute portfolio Greeks under strict time constraints.",
                    tasks: [
                        "Load an options chain dataset spanning 4 maturities and 20 strikes.",
                        "Write a vectorized function to compute Implied Volatility for the entire chain in under 500ms using Brent's method.",
                        "Calculate the Delta, Gamma, and Vega for every option.",
                        "Aggregate the total portfolio Greeks assuming a specific position size for each contract.",
                        "Identify any arbitrage violations in the calculated IV surface (e.g., calendar spread arbitrage)."
                    ],
                },
            ],
        },
        {
            weekNumber: 2,
            title: "Monte Carlo, LSM & Local Volatility",
            days: [
                {
                    dayNumber: 8,
                    title: "Geometric Brownian Motion & Standard MC",
                    objective:
                        "Implement exact terminal simulation and Euler-Maruyama discretization for asset paths. Understand the Law of Large Numbers and Monte Carlo standard error.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Monte Carlo BSM European",
                            url: "https://github.com/jerryxyx/MonteCarlo/blob/master/MC-BlackScholes-European.ipynb",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "QuantLib SWIG Basket Option MC",
                            url: "https://github.com/lballabio/QuantLib-SWIG/blob/master/Python/examples/basket-option.py",
                        },
                    ],
                    pitfall:
                        "Failing to pre-allocate memory for massive path arrays will cause Python/NumPy to continuously re-allocate RAM, devastating performance. Always initialize path tensors upfront and fill them in-place.",
                },
                {
                    dayNumber: 9,
                    title: "Variance Reduction: Control & Antithetic Variates",
                    objective:
                        "Dramatically reduce standard error without increasing path count by utilizing Antithetic Variates and Control Variates.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Optimal Hedged Monte Carlo",
                            url: "https://github.com/jerryxyx/MonteCarlo/blob/master/HLSM-Heston-American.ipynb",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "MC Option Pricing Engine with VR",
                            url: "https://github.com/theov07/Monte_Carlo_Option_Pricing_Engine/blob/main/engine.py",
                        },
                    ],
                    pitfall:
                        "When using a Control Variate, if the correlation between the target derivative and the control is weak (rho < 0.5), the variance reduction will be negligible or even counter-productive. Always measure the covariance empirically before finalizing the control coefficient.",
                },
                {
                    dayNumber: 10,
                    title: "Quasi-Monte Carlo (QMC) & Sobol Sequences",
                    objective:
                        "Replace pseudo-random numbers with low-discrepancy sequences (Sobol, Halton) to accelerate convergence from O(1/sqrt(N)) to nearly O(1/N).",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "SciPy QMC Module",
                            url: "https://github.com/scipy/scipy/blob/main/scipy/stats/_qmc.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Numerical Methods (See MC section)",
                            url: "https://github.com/cantaro86/Financial-Models-Numerical-Methods/blob/master/1.1%20Black-Scholes%20numerical%20methods.ipynb",
                        },
                    ],
                    pitfall:
                        "Standard QMC sequences lose their low-discrepancy properties in high dimensions (e.g., long time-stepping). You must combine QMC with a Brownian Bridge construction to assign the most well-distributed coordinates to the most significant macroscopic path movements.",
                },
                {
                    dayNumber: 11,
                    title: "Least Squares Monte Carlo (Longstaff-Schwartz)",
                    objective:
                        "Implement the Longstaff-Schwartz algorithm to price American/Bermudan options by regressing continuation values against basis functions.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Longstaff-Schwartz Python Implementation",
                            url: "https://github.com/luphord/longstaff_schwartz/blob/master/longstaff_schwartz/algorithm.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "American Options Pricer (LSM)",
                            url: "https://github.com/cantaro86/Financial-Models-Numerical-Methods/blob/master/2.3%20American%20Options.ipynb",
                        },
                    ],
                    pitfall:
                        "A fatal error in LSM is running the cross-sectional regression across ALL simulated paths. You must strictly filter for only In-The-Money (ITM) paths prior to regression. Including OTM paths warps the polynomial fit and creates a highly distorted early-exercise boundary.",
                },
                {
                    dayNumber: 12,
                    title: "Finite Difference Methods (PDE Solvers)",
                    objective:
                        "Solve the Black-Scholes PDE directly using Explicit, Implicit, and Crank-Nicolson finite difference schemes. Apply the Thomas algorithm for tridiagonal matrices.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "FDM Option Pricing Engine",
                            url: "https://github.com/cantaro86/Financial-Models-Numerical-Methods/blob/master/2.3%20American%20Options.ipynb",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "QuantLib SWIG FdBlackScholesVanillaEngine",
                            url: "https://github.com/lballabio/QuantLib-SWIG/blob/master/Python/examples/european-option.py",
                        },
                    ],
                    pitfall:
                        "Explicit FDM schemes are conditionally stable. If the time step (dt) is not strictly bounded by the space step squared (dx^2) according to the Von Neumann stability condition, the solution will explode into NaN values instantly. Crank-Nicolson is unconditionally stable but can exhibit spurious oscillations near the strike discontinuity.",
                },
                {
                    dayNumber: 13,
                    title: "Dupire Local Volatility Calibration",
                    objective:
                        "Extract the Local Volatility (LV) surface directly from market prices using Dupire's equation. Understand the difference between Implied Volatility and Local Volatility.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Structured Products Pricing Engine (Local Vol)",
                            url: "https://github.com/thibault-charbonnier/structured-products-pricing-engine/blob/main/Kernel/Volatility.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Subtle Smile LV Calibration",
                            url: "https://github.com/oge-t/subtle_smile/blob/master/lib/calibrator.py",
                        },
                    ],
                    pitfall:
                        "Dupire's PDE requires calculating the second derivative of the option price with respect to strike. Raw market data is noisy; numerical second derivatives will amplify this noise, resulting in negative local variance (an impossibility). You must smooth the implied volatility surface (using SSVI or cubic splines) before applying Dupire.",
                },
                {
                    dayNumber: 14,
                    title: "Timed Simulation: Advanced Option Architecture",
                    objective:
                        "Stress-test your ability to write complex pricing engines integrating Monte Carlo, LSM, and variance reduction techniques.",
                    tasks: [
                        "Build an engine to price an American Put Option.",
                        "Implement standard MC to baseline the European equivalent.",
                        "Implement Longstaff-Schwartz using Laguerre polynomials (degree 3) for the American early exercise.",
                        "Add an Antithetic Variates implementation and measure the reduction in standard error.",
                        "Profile the code. Refactor any loops into vectorized NumPy operations to achieve a 10x speedup."
                    ],
                },
            ],
        },
        {
            weekNumber: 3,
            title: "Interest Rate Derivatives & Credit Risk",
            days: [
                {
                    dayNumber: 15,
                    title: "Short-Rate Models: Vasicek & CIR",
                    objective:
                        "Model the evolution of interest rates using mean-reverting stochastic processes. Price zero-coupon bonds analytically under these dynamics.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Vasicek Yield Curve Calibration",
                            url: "https://github.com/andreachello/Computational-Finance/blob/main/6.%20Model%20Calibration.ipynb",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "QuantLib Gaussian 1D Models",
                            url: "https://github.com/lballabio/QuantLib-SWIG/blob/master/Python/examples/gaussian1d-models.py",
                        },
                    ],
                    pitfall:
                        "The Vasicek model allows interest rates to drop below zero. While this models negative-rate environments well, CIR strictly enforces non-negativity via the Feller condition. Ensure 2*kappa*theta > sigma^2 in CIR, otherwise zero becomes an accessible boundary, breaking the continuous-time assumptions.",
                },
                {
                    dayNumber: 16,
                    title: "Swaps, Swaptions & Jamshidian's Decomposition",
                    objective:
                        "Price interest rate swaps (IRS) and swaptions. Use Jamshidian's trick to decompose a swaption into a portfolio of zero-coupon bond options.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Hull-White 1F & Jamshidian (t-vi)",
                            url: "https://github.com/t-vi/interesting-rates/blob/master/interest-rate-models/Hull-White-1f.ipynb",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "QuantLib Bermudan Swaption",
                            url: "https://github.com/lballabio/QuantLib-SWIG/blob/master/Python/examples/bermudan-swaption.py",
                        },
                    ],
                    pitfall:
                        "When applying Jamshidian's decomposition, finding the critical short rate (r*) requires a robust 1D root-finder on a monotonically decreasing function (the swap value at exercise). Poor initial guesses will cause Brent/Newton solvers to fail on steep yield curves.",
                },
                {
                    dayNumber: 17,
                    title: "Hull-White Model Calibration",
                    objective:
                        "Calibrate the mean reversion and volatility parameters of the Hull-White one-factor model to a market matrix of European swaption volatilities.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "TF Quant Finance HW Calibration",
                            url: "https://github.com/google/tf-quant-finance/blob/master/tf_quant_finance/models/hull_white/calibration.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "HW Swaption Basket Calibration",
                            url: "https://github.com/lballabio/QuantLib-SWIG/blob/master/Python/examples/gaussian1d-models.py",
                        },
                    ],
                    pitfall:
                        "Calibrating Hull-White to an entire swaption matrix requires non-linear least squares optimization (e.g., Levenberg-Marquardt). Because the parameter space is flat, the optimizer can easily get stuck in local minima. You must regularize the objective function or initialize with tightly bounded heuristics.",
                },
                {
                    dayNumber: 18,
                    title: "Credit Default Swaps (CDS) & The ISDA Standard Model",
                    objective:
                        "Understand hazard rates, survival probabilities, and the mechanics of a CDS. Bootstrap a credit curve from market CDS spreads.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Credit Default Swap Pricer (ISDA)",
                            url: "https://github.com/bakera1/CreditDefaultSwapPricer/blob/master/isda/isda.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "CDS Pricing & Bootstrapping",
                            url: "https://github.com/JazzikPeng/CDS_Pricing/blob/master/CDS.py",
                        },
                    ],
                    pitfall:
                        "During high-stress market scenarios, credit curve bootstrapping can fail due to inconsistencies between assumed recovery rates and rapidly exploding short-term spreads. If the hazard rate goes negative, step down the recovery rate one basis point iteratively to restore a valid bootstrappable curve.",
                },
                {
                    dayNumber: 19,
                    title: "Counterparty Credit Risk: Expected Exposure (EE & PFE)",
                    objective:
                        "Simulate portfolio exposure over time. Calculate Expected Exposure (EE), Expected Positive Exposure (EPE), and Potential Future Exposure (PFE).",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "QuantLib XVA Exposure Calculator",
                            url: "https://github.com/roguetrainer/quantlib-xva-engine/blob/main/src/exposure_calculator.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "CVA Calculation for OTC Derivatives",
                            url: "https://github.com/LSEG-API-Samples/Article.IPA.LD.Python.Calculating-CVA-for-OTC-derivatives-portfolio/blob/main/src/cva_calculator.py",
                        },
                    ],
                    pitfall:
                        "Simulating exposure requires valuing the derivative at every future time step across thousands of paths. Doing this using full numerical re-pricing is computationally impossible. You must use American Monte Carlo (LSM) regression techniques to approximate future valuations instantly.",
                },
                {
                    dayNumber: 20,
                    title: "Valuation Adjustments (CVA, DVA, FVA)",
                    objective:
                        "Calculate Credit Valuation Adjustment (CVA) and Debt Valuation Adjustment (DVA) by integrating discounted expected exposures against counterparty default probabilities.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "XVA Calculator Implementation",
                            url: "https://github.com/roguetrainer/quantlib-xva-engine/blob/main/src/xva_calculator.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Deep BSDE Solver for XVA",
                            url: "https://github.com/DavTrev/DeepBSDE/blob/master/src/main.py",
                        },
                    ],
                    pitfall:
                        "Assuming independence between market risk factors and counterparty credit risk ignores Wrong-Way Risk (WWR). If a counterparty is short a put option and the market crashes, exposure spikes exactly when their probability of default spikes. Copula or correlated SDEs must be used to link exposure to default intensity.",
                },
                {
                    dayNumber: 21,
                    title: "Timed Simulation: Yield Curve & Credit Spread Calibration",
                    objective:
                        "Deploy a full calibration suite for interest rate and credit models under stringent operational conditions.",
                    tasks: [
                        "Ingest a swap curve and bootstrap zero-coupon discount factors using cubic splines.",
                        "Calibrate a Vasicek model to the bootstrapped curve.",
                        "Ingest a 1Y, 3Y, 5Y, and 10Y CDS spread matrix for a specific corporate entity.",
                        "Bootstrap the piece-wise constant hazard rate curve assuming a 40% recovery rate.",
                        "Calculate the 1-year default probability implied by the curve."
                    ],
                },
            ],
        },
        {
            weekNumber: 4,
            title: "Risk Management, Regulation & Production",
            days: [
                {
                    dayNumber: 22,
                    title: "Value-at-Risk (VaR) & Expected Shortfall (CVaR)",
                    objective:
                        "Implement Historical, Parametric, and Monte Carlo VaR. Compute Conditional Value-at-Risk (Expected Shortfall) to capture tail severity.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Single Asset VaR/CVaR (Quantum Finance)",
                            url: "https://github.com/gonghui945/quantum-finance/blob/main/module_03_risk/module_03_single_asset_var_cvar.ipynb",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Conditional Maximum Loss Portfolio",
                            url: "https://github.com/fortitudo-tech/fortitudo.tech/blob/main/examples/14_ConditionalMaximumLoss.ipynb",
                        },
                    ],
                    pitfall:
                        "VaR is not a coherent risk measure because it lacks sub-additivity (the VaR of a portfolio can theoretically be greater than the sum of the VaRs of its components). CVaR is coherent and must be preferred for regulatory limits and portfolio optimization, as it accounts for the magnitude of losses beyond the VaR threshold.",
                },
                {
                    dayNumber: 23,
                    title: "Stress Testing & Scenario Generation",
                    objective:
                        "Apply deterministic historical stress events (e.g., 2008 Lehman default, 2020 COVID crash) and stochastic shock scenarios to derivative portfolios.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Market Efficiency & Stress Testing",
                            url: "https://github.com/ScottMorgan85/ml-market-efficiency/blob/main/MarketEfficiencyLightShed.ipynb",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Financial Risk: VaR with Python",
                            url: "https://github.com/JamesIgoe/AzureNotebooks/blob/master/Financial%20Risk%20-%20Calculating%20Value%20At%20Risk%20(VaR)%20with%20Python.ipynb",
                        },
                    ],
                    pitfall:
                        "Applying a flat parallel shock to a yield curve (e.g., +100bps) ignores the reality that short rates and long rates do not move in tandem (curve steepening/flattening). Stress tests must apply Principal Component Analysis (PCA) to simulate realistic non-parallel curve twists.",
                },
                {
                    dayNumber: 24,
                    title: "Regulatory Capital: FRTB Standardised Approach",
                    objective:
                        "Implement the Sensitivity-Based Method (SBM) and Default Risk Charge (DRC) mandated by the Fundamental Review of the Trading Book (FRTB).",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "FRTB Market Risk DRC Calculator",
                            url: "https://github.com/frtb-net/FRTB/blob/main/SA_DRC_Calc.py",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "GIRR FRTB Capital Aggregation",
                            url: "https://github.com/subhamsharma7/FRTB-Market-Risk/blob/main/GIRR.ipynb",
                        },
                    ],
                    pitfall:
                        "In FRTB SA-DRC calculation, failing to correctly apply the Hedge Benefit Ratio (HBR) across different obligor seniorities (Equity vs. Subordinated Debt vs. Senior Unsecured) will result in a gross failure to recognize basis risk, artificially inflating required capital reserves by millions.",
                },
                {
                    dayNumber: 25,
                    title: "Dynamic Hedging & Strategy Simulation",
                    objective:
                        "Simulate delta and gamma hedging of a short options book over time. Analyze the impact of discrete rebalancing and transaction costs on PnL.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Discrete Hedging MC Simulation",
                            url: "https://github.com/Ahmed0028/Machine-Learning-and-Reinforcement-Learning-in-Finance-Specialization/blob/master/discrete_black_scholes_m3_ex1_v3.ipynb",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Strategy Testing & PnL Variance",
                            url: "https://github.com/AliHabibnia/Algorithmic_Trading_with_Python/blob/main/Lecture%2007_%20Strategy%20Testing.ipynb",
                        },
                    ],
                    pitfall:
                        "Continuous delta hedging perfectly replicates an option in theory, but in practice, high-frequency rebalancing generates immense transaction costs that bleed out the premium. You must optimize the rebalancing bandwidth (e.g., Whalley-Wilmott bounds) to balance Greek exposure against spread crossing.",
                },
                {
                    dayNumber: 26,
                    title: "System Consolidation: Architecture Refactoring",
                    objective:
                        "Combine your disparate pricing engines, calibration routines, and risk simulators into a cohesive, object-oriented quantitative library.",
                    tasks: [
                        "Create a base `Instrument` class and inherit `EuropeanOption`, `AmericanOption`, and `CDS`.",
                        "Create an `Engine` interface implementing `Analytical`, `MonteCarlo`, and `FDM` pricers.",
                        "Write a comprehensive unit test suite utilizing PyTest to assert exact price matching (within 1e-5) between your MC engine and Analytical engine for European parameters.",
                        "Add type-hinting and Pydantic validation for all market data inputs."
                    ],
                },
                {
                    dayNumber: 27,
                    title: "Mock Project: Enterprise Portfolio Risk Run",
                    objective:
                        "Simulate the overnight risk batch calculation for a heterogeneous derivatives portfolio.",
                    tasks: [
                        "Generate a dummy portfolio containing 500 equity options, 100 interest rate swaps, and 50 CDS contracts.",
                        "Parallelize the pricing of the portfolio using Python's `multiprocessing` or `concurrent.futures`.",
                        "Shift the underlying yield curves and equity spot prices by a 99% VaR shock matrix.",
                        "Recalculate the entire portfolio MTM under the shock scenario to determine the total stressed loss.",
                        "Aggregate and export the results to a structured JSON risk report."
                    ],
                },
                {
                    dayNumber: 28,
                    title: "Final Review & The Quant Engineering Ecosystem",
                    objective:
                        "Consolidate all skills, evaluate architectural trade-offs, and map out the broader landscape of C++ pricing libraries, Rust extensions, and machine learning in derivatives.",
                    tasks: [
                        "Perform a code review of your library, identifying any N^2 time-complexity loops that can be eliminated with NumPy broadcasting.",
                        "Research PyO3 and SWIG integration to understand how Python interfaces with C++/Rust libraries like QuantLib.",
                        "Outline a 3-month continuous learning plan focusing on Stochastic Volatility models (Heston, SABR) and Adjoint Algorithmic Differentiation (AAD) for ultra-fast Greeks.",
                        "Archive the repository with a professional README detailing usage, mathematical dependencies, and continuous integration testing instructions."
                    ],
                },
            ],
        },
    ],
};