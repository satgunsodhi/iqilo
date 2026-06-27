import type { Course, DailyProtocol } from "@/lib/types";

export const QUANT_PROTOCOL_DERIV: DailyProtocol = {
    synthesize:
        "45m: Read official documentation, research papers, and conceptual guides to deeply understand the underlying financial models, numerical methods, and risk management frameworks.",
    grind:
        "60-90m: Implement derivative pricing models (Black-Scholes, binomial trees, Monte Carlo) and risk metrics (Greeks, VaR) from scratch, focusing on accuracy, performance, and numerical stability.",
    bridge:
        "30m: Apply the day's concepts to real-world derivative products (options, futures, swaps) to build practical intuition and environmental resilience.",
    template:
        "15m: Re-write/extend the core template functions in your clean Python cheat sheet from scratch from memory to build operational muscle memory.",
};

export const derivativesRiskRoadmap: Course = {
    id: "python-for-quants-derivatives-risk",
    title: "Python for Quants III: Derivatives Pricing & Risk",
    description:
        "An advanced, hands-on course that equips you with the quantitative tools to price, hedge, and manage risk for derivative products. Covers option pricing (Black-Scholes, binomial, Monte Carlo), Greeks, volatility modeling (local volatility, stochastic volatility), interest rate derivatives, credit risk, and comprehensive risk management frameworks (VaR, CVaR, stress testing).",
    difficulty: "Expert",
    tags: ["Python", "Derivatives", "Options", "Risk Management", "Monte Carlo", "Black-Scholes", "Quant Finance"],
    estimatedHours: 84,
    category: "Quant Finance",
    tagline: "Master the mathematical and computational techniques to price and hedge derivatives.",
    totalDays: 28,
    weeks: [
        {
            weekNumber: 1,
            title: "Option Pricing Foundations & Analytical Models",
            days: [
                {
                    dayNumber: 1,
                    title: "Financial Derivatives Overview & Python Setup",
                    objective:
                        "Understand the basics of derivatives (options, futures, swaps) and set up a Python environment for pricing. Learn to work with yield curves and discount factors.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Derivatives Pricing (QuantLib)",
                            url: "https://www.quantlib.org/",
                        },
                        {
                            label: "Python for Finance (O'Reilly)",
                            url: "https://www.oreilly.com/library/view/python-for-finance/9781492024323/",
                        },
                    ],
                    practice: [
                        {
                            platform: "quantlib",
                            label: "QuantLib Python Tutorial",
                            url: "https://quantlib-python.readthedocs.io/en/latest/",
                        },
                    ],
                    pitfall:
                        "Always use continuously compounded rates for discounting. Ensure your time-to-expiry calculations (day count conventions) are correct. A common mistake is using 365 vs 252 days.",
                },
                {
                    dayNumber: 2,
                    title: "Black-Scholes-Merton Model",
                    objective:
                        "Implement the Black-Scholes formula for European call and put options. Derive and compute the Greeks (delta, gamma, theta, vega, rho).",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Black-Scholes (Wikipedia)",
                            url: "https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model",
                        },
                        {
                            label: "QuantLib Black-Scholes",
                            url: "https://www.quantlib.org/reference/class_black_scholes_calculator.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Black-Scholes Implementation",
                            url: "https://github.com/vittorioromeo/black-scholes",
                        },
                    ],
                    pitfall:
                        "The Black-Scholes model assumes constant volatility and log-normal returns. Real markets have volatility smiles. Be cautious when using it for out-of-the-money options.",
                },
                {
                    dayNumber: 3,
                    title: "Binomial Trees & Lattice Models",
                    objective:
                        "Implement the Cox-Ross-Rubinstein binomial tree for American and European options. Understand convergence and speed of tree methods.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Binomial Options Pricing (Investopedia)",
                            url: "https://www.investopedia.com/terms/b/binomialoptionpricing.asp",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Binomial Tree Python",
                            url: "https://github.com/jkreileder/option-pricing",
                        },
                    ],
                    pitfall:
                        "The number of steps (N) must be large enough for convergence. Use the Jarrow-Rudd or other adjustments for better accuracy. American options require checking early exercise at each node.",
                },
                {
                    dayNumber: 4,
                    title: "Greeks & Risk Sensitivities",
                    objective:
                        "Compute all Greeks analytically for European options and numerically for American options. Understand how to use them for delta-hedging and risk management.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Greeks (Wikipedia)",
                            url: "https://en.wikipedia.org/wiki/Greeks_(finance)",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Option Greeks with Python",
                            url: "https://github.com/domokane/FinancePy",
                        },
                    ],
                    pitfall:
                        "Gamma and vega can be large for at-the-money options with short time to expiry. Always monitor your delta and gamma exposures. Theta is negative for long options.",
                },
                {
                    dayNumber: 5,
                    title: "Implied Volatility & Volatility Surfaces",
                    objective:
                        "Use Newton-Raphson and Brent's method to compute implied volatility from market option prices. Build and interpolate volatility surfaces.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Implied Volatility (Investopedia)",
                            url: "https://www.investopedia.com/terms/i/impliedvolatility.asp",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Implied Volatility Python",
                            url: "https://github.com/benjaminmgross/implied_volatility",
                        },
                    ],
                    pitfall:
                        "Implied volatility is not a constant; it varies with strike and maturity. Use robust root-finding algorithms with good initial guesses. Beware of arbitrage in the surface.",
                },
                {
                    dayNumber: 6,
                    title: "Exotic Options & Barrier Options",
                    objective:
                        "Price barrier options (up-and-out, down-and-in) using analytical formulas and binomial trees. Understand the concept of rebates and barriers.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Barrier Options (Investopedia)",
                            url: "https://www.investopedia.com/terms/b/barrieroption.asp",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Barrier Option Pricing Python",
                            url: "https://github.com/quantran/option-pricing-models",
                        },
                    ],
                    pitfall:
                        "Barrier options require continuous monitoring of the barrier level. In discrete monitoring, the price is lower/higher depending on the frequency. Use the correct adjustment (e.g., Broadie-Glasserman-Kou).",
                },
                {
                    dayNumber: 7,
                    title: "Timed Simulation: Option Pricing & Greeks",
                    objective:
                        "Simulate a research task to price options and compute Greeks under time pressure.",
                    tasks: [
                        "Within a strict 90-minute block, load option market data (strike, price, maturity).",
                        "Compute implied volatility for each option using Brent's method.",
                        "Build a volatility surface using interpolation (cubic splines).",
                        "Price a European call and its Greeks using Black-Scholes.",
                        "Price a barrier option using a binomial tree.",
                    ],
                },
            ],
        },
        {
            weekNumber: 2,
            title: "Monte Carlo Methods & Numerical Techniques",
            days: [
                {
                    dayNumber: 8,
                    title: "Monte Carlo for Option Pricing",
                    objective:
                        "Implement standard Monte Carlo simulation for European options. Understand variance reduction techniques (antithetic variates, control variates).",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Monte Carlo Simulation (QuantLib)",
                            url: "https://www.quantlib.org/reference/group__montecarlo.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Monte Carlo Option Pricing Python",
                            url: "https://github.com/makmonty/monte-carlo-option-pricing",
                        },
                    ],
                    pitfall:
                        "Monte Carlo is slow for options with early exercise (American). Use Least Squares Monte Carlo (Longstaff-Schwartz) for American options. Ensure you generate enough paths for convergence.",
                },
                {
                    dayNumber: 9,
                    title: "Quasi-Monte Carlo & Low-Discrepancy Sequences",
                    objective:
                        "Use Sobol and Halton sequences for faster convergence. Implement quasi-Monte Carlo for high-dimensional problems.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Sobol Sequence (scipy)",
                            url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.qmc.Sobol.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "scipy",
                            label: "QMC for Option Pricing",
                            url: "https://docs.scipy.org/doc/scipy/reference/stats.qmc.html",
                        },
                    ],
                    pitfall:
                        "Quasi-Monte Carlo sequences are deterministic; they do not provide confidence intervals. Use randomized QMC for error estimation.",
                },
                {
                    dayNumber: 10,
                    title: "Variance Reduction & Control Variates",
                    objective:
                        "Implement control variates (using the Black-Scholes price as control) and antithetic variates to reduce variance and speed up convergence.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Control Variates (Wikipedia)",
                            url: "https://en.wikipedia.org/wiki/Control_variates",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Variance Reduction Python",
                            url: "https://github.com/QuantEcon/QuantEcon.py",
                        },
                    ],
                    pitfall:
                        "The control variate must be highly correlated with the target. Black-Scholes price is a good control for European options. Ensure the control is computable analytically.",
                },
                {
                    dayNumber: 11,
                    title: "Least Squares Monte Carlo (Longstaff-Schwartz)",
                    objective:
                        "Implement the Longstaff-Schwartz algorithm to price American options using Monte Carlo. Use regression (polynomial, basis functions) to estimate continuation values.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Longstaff-Schwartz (Paper)",
                            url: "https://people.math.ethz.ch/~hjfurrer/teaching/LongstaffSchwartzAmericanOptionsLeastSquareMonteCarlo.pdf",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "LSM for American Options Python",
                            url: "https://github.com/kevinkindwall/american-option-pricing",
                        },
                    ],
                    pitfall:
                        "The choice of basis functions and number of paths is critical. Overfitting with too many basis functions can lead to early exercise errors. Use cross-validation for robustness.",
                },
                {
                    dayNumber: 12,
                    title: "Finite Difference Methods (FDM)",
                    objective:
                        "Implement the explicit and implicit finite difference methods (Crank-Nicolson) for solving the Black-Scholes PDE. Apply to European and American options.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Finite Difference (QuantLib)",
                            url: "https://www.quantlib.org/reference/class_quant_lib_1_1_fdm_black_scholes_solver.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "FDM Option Pricing Python",
                            url: "https://github.com/augustogoulart/FDM-option-pricing",
                        },
                    ],
                    pitfall:
                        "Implicit methods are unconditionally stable but require solving a tridiagonal system. Crank-Nicolson is second-order accurate but can produce oscillations near discontinuities. Use upwinding for convection-dominated problems.",
                },
                {
                    dayNumber: 13,
                    title: "Calibration of Local Volatility Models",
                    objective:
                        "Calibrate a local volatility model (Dupire) to market implied volatility surfaces. Use the Dupire equation and numerical differentiation.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Dupire Local Volatility (QuantLib)",
                            url: "https://www.quantlib.org/reference/class_quant_lib_1_1_local_volatility_surface.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Local Volatility Calibration Python",
                            url: "https://github.com/basnijholt/local-volatility",
                        },
                    ],
                    pitfall:
                        "The Dupire formula requires smooth and arbitrage-free implied volatility surfaces. Numerical differentiation can be noisy; use regularization or smoothing techniques.",
                },
                {
                    dayNumber: 14,
                    title: "Timed Simulation: Monte Carlo & FDM",
                    objective:
                        "Simulate a research task to price options using Monte Carlo and FDM under time pressure.",
                    tasks: [
                        "Within a strict 90-minute block, price an American put using LSM and compare with a binomial tree.",
                        "Price a European option using explicit FDM and compare with Black-Scholes.",
                        "Implement a control variate with Black-Scholes to speed up Monte Carlo.",
                        "Calculate the Greeks using finite differences on the Monte Carlo price.",
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
                    title: "Interest Rate Models: Vasicek & CIR",
                    objective:
                        "Implement short-rate models (Vasicek, Cox-Ingersoll-Ross) for bond pricing. Compute bond prices and yields under these models.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Vasicek Model (QuantLib)",
                            url: "https://www.quantlib.org/reference/class_quant_lib_1_1_vasicek.html",
                        },
                        {
                            label: "CIR Model (QuantLib)",
                            url: "https://www.quantlib.org/reference/class_quant_lib_1_1_c_i_r.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Interest Rate Models Python",
                            url: "https://github.com/QuantEcon/QuantEcon.py",
                        },
                    ],
                    pitfall:
                        "Vasicek allows negative rates; CIR ensures positivity but has a more complex distribution. Calibration to market data (yield curve) is essential. Use maximum likelihood or least squares.",
                },
                {
                    dayNumber: 16,
                    title: "Bond Options & Swaptions",
                    objective:
                        "Price European options on bonds (bond options) and interest rate swaps (swaptions) using the Black model (Black-76). Use the Jamshidian approach for swaptions.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Black-76 Model (Investopedia)",
                            url: "https://www.investopedia.com/terms/b/blackmodel.asp",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Bond Option Pricing Python",
                            url: "https://github.com/domokane/FinancePy",
                        },
                    ],
                    pitfall:
                        "Swaptions are often priced using a Black model on the swap rate. The volatility smile for swaptions is not as pronounced as for equity options but still exists. Use the appropriate volatility surface.",
                },
                {
                    dayNumber: 17,
                    title: "Hull-White Model & LMM",
                    objective:
                        "Implement the Hull-White one-factor model for interest rates and the Libor Market Model (LMM) for multi-factor term structure modeling.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Hull-White (QuantLib)",
                            url: "https://www.quantlib.org/reference/class_quant_lib_1_1_hull_white.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "quantlib",
                            label: "Hull-White Calibration Python",
                            url: "https://quantlib-python.readthedocs.io/en/latest/",
                        },
                    ],
                    pitfall:
                        "The Hull-White model can be calibrated to swaption prices but requires a trinomial tree for American-style derivatives. LMM is complex to implement; use QuantLib for practical applications.",
                },
                {
                    dayNumber: 18,
                    title: "Credit Default Swaps (CDS) & Credit Risk",
                    objective:
                        "Price single-name CDS using the credit curve approach. Understand hazard rates, recovery rates, and the probability of default. Compute CDS spreads.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Credit Default Swap (Investopedia)",
                            url: "https://www.investopedia.com/terms/c/creditdefaultswap.asp",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "CDS Pricing Python",
                            url: "https://github.com/wepe/credit-default-swap",
                        },
                    ],
                    pitfall:
                        "CDS pricing requires a term structure of hazard rates. The recovery rate is assumed constant; in reality it varies. Use the market standard ISDA model.",
                },
                {
                    dayNumber: 19,
                    title: "Counterparty Credit Risk (CVA, DVA, FVA)",
                    objective:
                        "Compute Credit Value Adjustment (CVA), Debit Value Adjustment (DVA), and Funding Value Adjustment (FVA) using Monte Carlo simulation. Understand the impact on derivative pricing.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "CVA (QuantLib)",
                            url: "https://www.quantlib.org/reference/group__cva.html",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "CVA Calculation Python",
                            url: "https://github.com/danielhrisca/cva-python",
                        },
                    ],
                    pitfall:
                        "CVA is path-dependent and requires joint simulation of market and credit risk. The wrong-way risk (correlation between exposure and default) must be modeled. Computational cost is high; use nested Monte Carlo or efficient approximations.",
                },
                {
                    dayNumber: 20,
                    title: "XVA & Collateral Management",
                    objective:
                        "Extend CVA to include other valuation adjustments (FVA, MVA, KVA). Understand the role of collateral and margin requirements in OTC derivatives.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "XVA (Wikipedia)",
                            url: "https://en.wikipedia.org/wiki/XVA",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "XVA Implementation",
                            url: "https://github.com/OpenSourceRisk/OpenSourceRisk",
                        },
                    ],
                    pitfall:
                        "XVA is a complex and computationally intensive topic. In practice, many firms use specialized software. Focus on understanding the concepts and basic implementations.",
                },
                {
                    dayNumber: 21,
                    title: "Timed Simulation: Interest Rate & Credit Derivatives",
                    objective:
                        "Simulate a research task to price interest rate and credit derivatives under time pressure.",
                    tasks: [
                        "Within a strict 90-minute block, calibrate a Vasicek model to the yield curve.",
                        "Price a 5-year swaption using Black-76.",
                        "Compute the CVA for a 10-year interest rate swap using Monte Carlo.",
                        "Price a CDS and calculate its spread.",
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
                        "Implement historical, parametric, and Monte Carlo VaR for a portfolio of derivatives. Compute CVaR for tail risk analysis.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "VaR (Investopedia)",
                            url: "https://www.investopedia.com/terms/v/var.asp",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "VaR Calculation Python",
                            url: "https://github.com/QuantConnect/Lean",
                        },
                    ],
                    pitfall:
                        "VaR is not subadditive; CVaR is a coherent risk measure. For derivative portfolios, the distribution is often non-normal, so parametric VaR may be inaccurate. Use Monte Carlo or historical simulation.",
                },
                {
                    dayNumber: 23,
                    title: "Stress Testing & Scenario Analysis",
                    objective:
                        "Design stress scenarios (market crashes, volatility spikes) and evaluate their impact on a derivative portfolio. Use historical stress events (e.g., 2008 financial crisis).",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Stress Testing (Bank for International Settlements)",
                            url: "https://www.bis.org/publ/bcbs155.pdf",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Stress Testing Python",
                            url: "https://github.com/OpenSourceRisk/OpenSourceRisk",
                        },
                    ],
                    pitfall:
                        "Stress tests are only as good as the scenarios chosen. Include both historical and hypothetical scenarios. Focus on the most severe scenarios that could realistically occur.",
                },
                {
                    dayNumber: 24,
                    title: "Regulatory Capital & Reporting",
                    objective:
                        "Understand Basel III, FRTB (Fundamental Review of the Trading Book) and the calculation of regulatory capital for derivatives. Implement basic capital calculations.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "FRTB (BIS)",
                            url: "https://www.bis.org/bcbs/implementation.htm",
                        },
                    ],
                    practice: [
                        {
                            platform: "bis",
                            label: "FRTB Capital Calculation",
                            url: "https://www.bis.org/bcbs/publ/d457.pdf",
                        },
                    ],
                    pitfall:
                        "Regulatory requirements are complex and change frequently. Focus on the mathematical frameworks rather than the latest rules. Use standardized approaches where possible.",
                },
                {
                    dayNumber: 25,
                    title: "Hedging & Dynamic Risk Management",
                    objective:
                        "Implement delta-hedging and gamma-hedging strategies for option portfolios. Use rebalancing frequencies and transaction cost models.",
                    protocol: QUANT_PROTOCOL_DERIV,
                    resources: [
                        {
                            label: "Delta Hedging (Investopedia)",
                            url: "https://www.investopedia.com/terms/d/deltahedging.asp",
                        },
                    ],
                    practice: [
                        {
                            platform: "github",
                            label: "Delta Hedging Simulation Python",
                            url: "https://github.com/domokane/FinancePy",
                        },
                    ],
                    pitfall:
                        "Hedging is not perfect; it depends on the accuracy of the hedge ratio (delta) and the frequency of rebalancing. Transaction costs and discrete rebalancing lead to tracking error.",
                },
                {
                    dayNumber: 26,
                    title: "Template Consolidation 4",
                    objective:
                        "Create a personal Python quant library with reusable templates for derivatives pricing, risk, and hedging.",
                    tasks: [
                        "Re-engineer from scratch core templates for: Black-Scholes pricer, binomial tree, LSM for American options, Monte Carlo with variance reduction, VaR/CVaR calculator, and simple delta-hedging simulator.",
                        "Ensure every template includes comprehensive documentation, error handling, and performance notes.",
                    ],
                },
                {
                    dayNumber: 27,
                    title: "Mock Project: Comprehensive Derivative Portfolio Management",
                    objective:
                        "Simulate managing a large derivative portfolio with multiple asset classes under time pressure.",
                    tasks: [
                        "Generate a portfolio of 100 European call/put options on multiple underlyings with different maturities.",
                        "Compute the portfolio's Greeks (delta, gamma, vega) and aggregate exposure.",
                        "Compute the 1-day 95% VaR using historical simulation and Monte Carlo.",
                        "Design a delta-hedging strategy and simulate its performance over a week with daily rebalancing.",
                        "Present the results with visualizations and performance metrics.",
                    ],
                },
                {
                    dayNumber: 28,
                    title: "Final Review & Career Path",
                    objective:
                        "Consolidate all skills and plan next steps in the quant career path.",
                    tasks: [
                        "Review all code, templates, and notes from the past 4 weeks.",
                        "Identify areas for further study (e.g., advanced stochastic calculus, machine learning for derivatives, crypto derivatives).",
                        "Explore resources for job interviews (quant analyst, risk quant, quant developer).",
                        "Rest and reset for continuous learning.",
                    ],
                },
            ],
        },
    ],
};