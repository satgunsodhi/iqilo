"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrainCircuit, Search, LayoutDashboard, User, X, Code2, RefreshCw, Check, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";

import { ThemeToggle } from "./ThemeToggle";
import { StreakBadge } from "./StreakDisplay";
import { listCourses } from "@/lib/courses";
import { useGamification, useProgress } from "@/hooks/useProgress";
import { useLeetCode } from "@/hooks/useLeetCode";
import { useCses } from "@/hooks/useCses";
export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const courses = listCourses();
  const { hydrated } = useProgress();
  const { xp, streak, xpToNextLevel } = useGamification();

  const {
    username: ltUsername,
    syncStatus,
    errorMsg,
    lastSynced,
    setUsername: setLtUsername,
    sync: syncLeetCode,
  } = useLeetCode();
  
  const {
    userId: csUserId,
    syncStatus: csesSyncStatus,
    errorMsg: csesErrorMsg,
    lastSynced: csesLastSynced,
    setUserId: setCsesUserId,
    sync: syncCses,
  } = useCses();

  const [leetcodeOpen, setLeetcodeOpen] = useState(false);
  const [localUsername, setLocalUsername] = useState(ltUsername);
  const [prevUsername, setPrevUsername] = useState(ltUsername);
  const [localCsesUserId, setLocalCsesUserId] = useState(csUserId);
  const [prevCsesUserId, setPrevCsesUserId] = useState(csUserId);
  const leetcodeRef = useRef<HTMLDivElement>(null);

  // Sync state input initialization
  if (ltUsername !== prevUsername) {
    setLocalUsername(ltUsername);
    setPrevUsername(ltUsername);
  }
  if (csUserId !== prevCsesUserId) {
    setLocalCsesUserId(csUserId);
    setPrevCsesUserId(csUserId);
  }

  // Parse active day to see if it contains LeetCode/CSES problems
  const activeDayPlatforms = useMemo(() => {
    if (!pathname) return { hasLeetCode: false, hasCses: false };
    const match = pathname.match(/^\/courses\/([^/]+)\/day\/([^/]+)/);
    if (!match) return { hasLeetCode: false, hasCses: false };
    
    const courseId = match[1];
    const dayNum = parseInt(match[2], 10);
    
    const course = courses.find((c) => c.id === courseId);
    if (!course) return { hasLeetCode: false, hasCses: false };
    
    const day = course.weeks.flatMap((w) => w.days).find((d) => d.dayNumber === dayNum);
    if (!day || !day.practice) return { hasLeetCode: false, hasCses: false };
    
    return {
      hasLeetCode: day.practice.some((p) => p.platform === "leetcode"),
      hasCses: day.practice.some((p) => p.platform === "cses"),
    };
  }, [pathname, courses]);

  const syncRef = useRef({
    ltUsername,
    lastSynced,
    syncStatus,
    syncLeetCode,
    csUserId,
    csesLastSynced,
    csesSyncStatus,
    syncCses,
    activeDayPlatforms,
  });

  useEffect(() => {
    syncRef.current = {
      ltUsername,
      lastSynced,
      syncStatus,
      syncLeetCode,
      csUserId,
      csesLastSynced,
      csesSyncStatus,
      syncCses,
      activeDayPlatforms,
    };
  });

  // Auto-sync on window focus & load
  useEffect(() => {
    function handleFocus() {
      const {
        ltUsername,
        lastSynced,
        syncStatus,
        syncLeetCode,
        csUserId,
        csesLastSynced,
        csesSyncStatus,
        syncCses,
        activeDayPlatforms,
      } = syncRef.current;

      // Throttle syncs to once every 30 seconds
      const now = Date.now();
      
      if (ltUsername && activeDayPlatforms.hasLeetCode) {
        const lastSyncedTime = lastSynced ? new Date(lastSynced).getTime() : 0;
        if (now - lastSyncedTime > 30000 && syncStatus !== "syncing") {
          syncLeetCode(ltUsername);
        }
      }
      
      if (csUserId && activeDayPlatforms.hasCses) {
        const csesLastSyncedTime = csesLastSynced ? new Date(csesLastSynced).getTime() : 0;
        if (now - csesLastSyncedTime > 30000 && csesSyncStatus !== "syncing") {
          syncCses(csUserId);
        }
      }
    }

    window.addEventListener("focus", handleFocus);
    // Trigger on initial mount as well
    handleFocus();

    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Close popover when clicking outside
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (leetcodeRef.current && !leetcodeRef.current.contains(e.target as Node)) {
        setLeetcodeOpen(false);
      }
    }
    if (leetcodeOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [leetcodeOpen]);

  // Open search on Cmd+K / Ctrl+K
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
      if (e.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  // Quick search results
  const results = query.trim().length < 2
    ? []
    : (() => {
        const q = query.toLowerCase();
        const hits: { type: "course" | "day"; label: string; sub: string; href: string }[] = [];
        for (const course of courses) {
          if (course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q)) {
            hits.push({ type: "course", label: course.title, sub: `${course.totalDays} days`, href: `/courses/${course.id}` });
          }
          for (const week of course.weeks) {
            for (const day of week.days) {
              if (day.title.toLowerCase().includes(q) || day.objective.toLowerCase().includes(q)) {
                hits.push({
                  type: "day",
                  label: `Day ${day.dayNumber}: ${day.title}`,
                  sub: course.title,
                  href: `/courses/${course.id}/day/${day.dayNumber}`,
                });
              }
            }
          }
          if (hits.length >= 8) break;
        }
        return hits.slice(0, 8);
      })();

  const navLinks = [
    { href: "/", label: "Home", icon: LayoutDashboard },
    { href: "/my-learning", label: "My Learning", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-30 border-b glass-panel transition-all"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "color-mix(in srgb, var(--bg-surface) 60%, transparent)",
          backdropFilter: "blur(24px) saturate(180%)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <svg viewBox="0 0 1932 814" className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105" aria-label="iqilo logo">
              <defs>
                <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2DB6FC" />
                  <stop offset="100%" stopColor="#0584E6" />
                </linearGradient>
              </defs>
              <path fill="var(--text-primary)" opacity="1.000000" stroke="none" d=" M585.639526,528.408813   C575.298706,504.978180 572.010864,480.870697 575.134583,455.911224   C578.561279,428.530853 589.187561,404.131256 606.953308,383.072754   C628.952759,356.995850 657.220520,341.041504 690.661682,335.467102   C731.624695,328.638794 768.948120,338.297485 801.978210,363.759766   C804.298889,365.548767 806.582886,367.385376 809.261902,369.497864   C811.768555,359.768707 817.225769,353.449646 826.781799,350.798584   C843.443848,346.176117 857.931885,356.915955 857.929565,374.106567   C857.917297,465.272552 857.905457,556.438538 857.917419,647.604492   C857.919128,660.344482 863.513428,668.791687 873.938354,671.709717   C876.635437,672.464661 879.489502,672.789185 882.294983,673.003479   C895.428162,674.006897 904.183044,684.253235 903.694519,698.184448   C903.264404,710.449585 893.517517,719.789062 880.946655,719.981506   C845.063843,720.530701 816.437439,696.589905 811.078552,661.329651   C810.133972,655.114502 809.619385,648.780579 809.555054,642.494873   C809.350281,622.497375 809.451782,602.496704 809.435364,582.497253   C809.433899,580.739685 809.435181,578.982056 809.435181,576.777771   C734.573242,639.875305 623.484802,614.351440 585.639526,528.408813  M636.966187,524.429077   C662.248535,561.852356 706.576843,574.085449 746.033264,560.480347   C805.318237,540.038147 828.302063,470.061829 791.739014,419.456635   C760.466248,376.173401 695.503357,367.588348 654.510071,401.919006   C618.831055,431.799042 611.001770,485.270599 636.966187,524.429077  z"/>
              <path fill="var(--text-primary)" opacity="1.000000" stroke="none" d=" M1533.859375,421.016174   C1550.106201,463.370483 1547.490967,504.249298 1524.870361,543.033752   C1503.535889,579.613037 1471.087036,602.032288 1429.547729,609.346191   C1381.052734,617.884766 1337.590210,606.027405 1302.239746,570.795288   C1271.812866,540.470337 1258.707031,503.006287 1262.347778,460.294037   C1265.366577,424.876007 1280.352295,394.507751 1306.557129,370.596191   C1336.232544,343.517883 1371.674561,331.417114 1412.004639,333.944183   C1449.751465,336.309448 1481.267456,351.663910 1507.168701,378.916687   C1518.728394,391.079498 1527.272583,405.224487 1533.859375,421.016174  M1393.723877,565.172668   C1395.719849,565.290710 1397.714966,565.429016 1399.712036,565.523865   C1438.397827,567.361572 1475.241577,543.905273 1489.645996,508.273682   C1503.734497,473.423492 1496.009155,433.736298 1469.131104,407.724426   C1447.193359,386.493561 1420.552002,377.714874 1390.177368,381.677460   C1338.512085,388.417511 1303.339966,433.997375 1310.013428,485.137054   C1315.589966,527.870667 1349.410400,560.550537 1393.723877,565.172668  z"/>
              <path fill="var(--text-primary)" opacity="1.000000" stroke="none" d=" M1179.151367,284.886505   C1179.066284,287.042511 1178.907104,289.198547 1178.906738,291.354553   C1178.891724,389.306885 1178.898438,487.259216 1178.878052,585.211548   C1178.875732,596.799683 1171.284546,605.968445 1160.367798,607.772400   C1146.682495,610.033813 1135.203979,604.349731 1131.852905,592.981689   C1130.570190,588.630371 1130.512085,583.811646 1130.508789,579.205444   C1130.441406,484.585358 1130.456787,389.965240 1130.469116,295.345093   C1130.474365,255.364914 1130.791260,215.382172 1130.423706,175.405579   C1130.216553,152.865906 1154.317871,145.968796 1167.646118,154.109619   C1173.470337,157.667023 1177.071167,162.841507 1178.900391,169.984772   C1179.032837,170.568649 1179.230835,171.016129 1179.150269,171.477600   C1179.119873,191.967911 1179.170044,211.996765 1179.133423,232.485336   C1179.081543,250.258865 1179.116455,267.572693 1179.151367,284.886505  z"/>
              <path fill="var(--text-primary)" opacity="1.000000" stroke="none" d=" M435.251770,560.999817   C435.238037,492.674286 435.220337,424.848785 435.215363,357.023315   C435.214355,343.264557 445.165771,333.687256 459.459778,333.634766   C474.020020,333.581299 483.973206,343.147858 483.973480,357.218750   C483.974976,432.876740 483.972748,508.534698 483.969116,584.192688   C483.968414,598.805908 474.307281,608.372070 459.531616,608.404907   C445.245270,608.436707 435.279999,598.631287 435.253326,584.497498   C435.238861,576.831604 435.251770,569.165771 435.251770,560.999817  z"/>
              <path fill="var(--text-primary)" opacity="1.000000" stroke="none" d=" M983.261475,606.879150   C972.555481,602.312744 968.060364,594.441589 968.077942,583.217285   C968.196228,507.740845 968.131531,432.264130 968.136475,356.787476   C968.137329,343.158051 978.253479,333.609894 992.584778,333.658142   C1006.878906,333.706268 1016.725952,342.938873 1016.731323,356.553619   C1016.761108,431.863647 1016.382996,507.176392 1016.962952,582.481934   C1017.120544,602.947815 999.567566,612.066406 983.261475,606.879150  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1221.942749,273.410461   C1211.894409,275.265350 1201.846069,277.120239 1191.402100,278.595886   C1190.493042,274.816101 1192.038696,272.926331 1195.278687,272.033508   C1199.755493,270.799927 1202.377808,268.246887 1202.171753,263.090302   C1202.103516,261.382874 1203.474487,259.354095 1204.699463,257.905060   C1209.698364,251.991592 1215.272705,246.529358 1219.914551,240.358871   C1224.636841,234.081284 1228.450317,227.125946 1232.780884,220.545746   C1235.589600,216.277969 1238.493042,212.061249 1241.565063,207.980484   C1246.932373,200.850342 1253.081421,194.224945 1257.745361,186.673187   C1262.190430,179.475769 1268.097656,175.529633 1276.061279,173.976852   C1279.279297,175.436142 1282.497314,176.895462 1285.616455,178.849106   C1283.385376,181.837372 1281.253174,184.331299 1278.697144,187.320923   C1280.533325,188.781754 1281.971313,190.585617 1283.820923,191.258423   C1287.522705,192.604980 1289.283569,195.057037 1290.186768,198.729813   C1290.687012,200.763901 1291.984375,202.618393 1293.016602,204.502243   C1297.172607,212.087631 1304.396484,216.586456 1310.523804,222.255081   C1318.012329,229.183121 1324.649780,237.027573 1331.714233,244.419373   C1335.178955,248.044556 1338.681519,251.644043 1342.338501,255.072205   C1347.025269,259.465790 1352.707397,256.894897 1358.004395,257.339294   C1358.603149,258.446045 1359.197510,259.214752 1359.791870,259.983459   C1361.285034,264.833344 1358.187256,267.650452 1355.058105,270.335205   C1352.728882,272.333557 1350.184814,274.081482 1347.368896,275.616455   C1345.754150,274.208313 1344.648682,272.862915 1343.230225,272.097198   C1340.519775,270.633972 1337.015747,270.135895 1334.929443,268.114166   C1328.107422,261.503235 1321.814209,254.349579 1315.236694,247.482101   C1312.202271,244.313950 1309.047363,241.252518 1305.820312,238.280380   C1303.522461,236.164139 1300.746460,234.522858 1298.648804,232.242111   C1292.765137,225.844833 1287.108887,219.237610 1281.388184,212.691116   C1276.292725,206.860153 1264.652954,206.359268 1259.890381,210.983566   C1251.117065,219.502258 1242.074341,227.678772 1237.133057,239.248413   C1236.827637,239.963120 1235.949219,240.411072 1235.450439,241.068848   C1232.456177,245.017563 1229.434204,248.947647 1226.538696,252.968323   C1223.219604,257.577393 1219.953979,262.228973 1216.818237,266.963470   C1215.982300,268.225586 1215.706421,269.858490 1215.273071,271.047577   C1217.872314,271.968384 1219.907471,272.689423 1221.942749,273.410461  z"/>
              <path fill="var(--text-primary)" opacity="1.000000" stroke="none" d=" M983.100464,289.977600   C957.094849,282.067963 951.090515,251.713440 968.566895,234.100800   C979.482544,223.100128 997.253601,221.254242 1010.671631,229.597961   C1023.233704,237.409470 1029.266968,254.385208 1024.477661,268.443726   C1019.441772,283.225952 1005.324829,292.470917 989.822754,291.072479   C987.702209,290.881165 985.609497,290.382233 983.100464,289.977600  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1222.322266,273.517883   C1219.907471,272.689423 1217.872314,271.968384 1215.273071,271.047577   C1215.706421,269.858490 1215.982300,268.225586 1216.818237,266.963470   C1219.953979,262.228973 1223.219604,257.577393 1226.538696,252.968323   C1229.434204,248.947647 1232.456177,245.017563 1235.450439,241.068848   C1235.949219,240.411072 1236.827637,239.963120 1237.133057,239.248413   C1242.074341,227.678772 1251.117065,219.502258 1259.890381,210.983566   C1264.652954,206.359268 1276.292725,206.860153 1281.388184,212.691116   C1287.108887,219.237610 1292.765137,225.844833 1298.648804,232.242111   C1300.746460,234.522858 1303.522461,236.164139 1305.820312,238.280380   C1309.047363,241.252518 1312.202271,244.313950 1315.236694,247.482101   C1321.814209,254.349579 1328.107422,261.503235 1334.929443,268.114166   C1337.015747,270.135895 1340.519775,270.633972 1343.230225,272.097198   C1344.648682,272.862915 1345.754150,274.208313 1347.024658,275.678864   C1347.048340,276.065796 1347.033203,276.021942 1346.694580,276.026764   C1345.571167,276.683319 1344.786621,277.335052 1344.001953,277.986786   C1336.965210,280.421906 1329.928467,282.857056 1322.469971,284.987976   C1320.304688,277.859009 1315.621094,273.542816 1309.841431,270.031525   C1307.984619,268.903351 1305.782715,267.480469 1304.973022,265.647247   C1302.161255,259.282928 1297.753174,254.827332 1291.601807,251.656586   C1288.871094,250.249084 1286.615479,247.854370 1284.280151,245.756454   C1274.339355,236.826569 1266.629272,237.202682 1256.345581,245.946228   C1249.614624,251.669098 1245.618408,259.146088 1240.977905,266.253693   C1239.533081,268.466736 1238.959106,271.248383 1237.986572,273.769714   C1232.891602,273.721588 1227.796631,273.673462 1222.322266,273.517883  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1275.869385,173.681473   C1268.097656,175.529633 1262.190430,179.475769 1257.745361,186.673187   C1253.081421,194.224945 1246.932373,200.850342 1241.565063,207.980484   C1238.493042,212.061249 1235.589600,216.277969 1232.780884,220.545746   C1228.450317,227.125946 1224.636841,234.081284 1219.914551,240.358871   C1215.272705,246.529358 1209.698364,251.991592 1204.699463,257.905060   C1203.474487,259.354095 1202.103516,261.382874 1202.171753,263.090302   C1202.377808,268.246887 1199.755493,270.799927 1195.278687,272.033508   C1192.038696,272.926331 1190.493042,274.816101 1191.008301,278.625092   C1187.284668,280.961212 1183.558960,282.888824 1179.492310,284.851471   C1179.116455,267.572693 1179.081543,250.258865 1179.508057,232.597076   C1180.311157,233.783508 1180.930908,235.314667 1180.948853,236.852844   C1181.047974,245.328247 1180.976929,253.805496 1181.024292,262.281769   C1181.032715,263.794983 1181.323242,265.306610 1181.483521,266.818970   C1181.982788,266.910797 1182.481934,267.002594 1182.981201,267.094391   C1183.650513,265.625702 1184.294189,264.144531 1184.995728,262.691345   C1185.895142,260.828430 1186.569580,258.774841 1187.820557,257.179565   C1191.058105,253.051178 1194.892090,249.361710 1197.883057,245.074982   C1203.645630,236.815659 1209.105957,228.337662 1214.471802,219.811935   C1218.518921,213.381317 1222.121704,206.672195 1226.112183,200.204330   C1229.458862,194.780319 1233.150879,189.570053 1236.534668,184.167908   C1237.484741,182.651184 1238.894287,180.344299 1238.370850,179.163132   C1235.636475,172.993576 1237.978027,167.941071 1241.046631,162.885666   C1241.490601,162.925217 1241.934692,162.964783 1242.854614,163.274933   C1243.877563,163.411697 1244.424683,163.277847 1244.971680,163.144012   C1255.207031,166.558029 1265.442261,169.972046 1275.869385,173.681473  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1238.392090,273.863281   C1238.959106,271.248383 1239.533081,268.466736 1240.977905,266.253693   C1245.618408,259.146088 1249.614624,251.669098 1256.345581,245.946228   C1266.629272,237.202682 1274.339355,236.826569 1284.280151,245.756454   C1286.615479,247.854370 1288.871094,250.249084 1291.601807,251.656586   C1297.753174,254.827332 1302.161255,259.282928 1304.973022,265.647247   C1305.782715,267.480469 1307.984619,268.903351 1309.841431,270.031525   C1315.621094,273.542816 1320.304688,277.859009 1322.063965,285.107666   C1301.885132,289.185883 1282.496338,285.548492 1263.236572,279.528473   C1255.286499,277.043549 1246.955444,275.777313 1238.392090,273.863281  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1240.848145,162.549072   C1237.978027,167.941071 1235.636475,172.993576 1238.370850,179.163132   C1238.894287,180.344299 1237.484741,182.651184 1236.534668,184.167908   C1233.150879,189.570053 1229.458862,194.780319 1226.112183,200.204330   C1222.121704,206.672195 1218.518921,213.381317 1214.471802,219.811935   C1209.105957,228.337662 1203.645630,236.815659 1197.883057,245.074982   C1194.892090,249.361710 1191.058105,253.051178 1187.820557,257.179565   C1186.569580,258.774841 1185.895142,260.828430 1184.995728,262.691345   C1184.294189,264.144531 1183.650513,265.625702 1182.981201,267.094391   C1182.481934,267.002594 1181.982788,266.910797 1181.483521,266.818970   C1181.323242,265.306610 1181.032715,263.794983 1181.024292,262.281769   C1180.976929,253.805496 1181.047974,245.328247 1180.948853,236.852844   C1180.930908,235.314667 1180.311157,233.783508 1179.594727,232.137360   C1179.170044,211.996765 1179.119873,191.967911 1179.524658,171.592163   C1180.320801,172.947968 1180.949829,174.649216 1180.958374,176.353577   C1181.035156,191.659256 1181.002686,206.965500 1181.002441,222.271576   C1181.002319,224.004044 1181.002319,225.736496 1181.002319,228.937271   C1185.067993,225.277969 1188.198120,222.893417 1190.789307,220.022491   C1194.275269,216.160141 1198.037598,212.291016 1200.445801,207.767151   C1205.013062,199.187103 1208.741699,190.157349 1212.730591,181.274826   C1213.882935,178.708725 1214.866211,176.047592 1215.687134,173.356857   C1216.519043,170.630142 1215.832520,168.882462 1212.750366,167.609238   C1210.192505,166.552567 1208.222534,164.072998 1205.992065,162.223755   C1215.598511,161.852600 1225.203003,161.409805 1234.812744,161.170364   C1236.748535,161.122131 1238.703491,161.845078 1240.848145,162.549072  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M428.242737,245.989868   C435.905487,224.872559 461.919769,217.481079 480.224152,231.247192   C498.613708,245.077347 497.499664,275.173248 477.061676,286.000885   C476.206177,286.454132 475.470642,287.133820 474.339661,287.361664   C473.001251,285.137634 472.420288,282.768188 470.913696,281.488098   C468.071869,279.073547 467.301575,276.211609 468.234467,273.017670   C470.618195,264.856354 469.993530,258.056183 462.872070,251.934891   C454.885376,245.069931 447.587280,237.908340 435.784393,242.477249   C434.696991,242.898178 433.225739,242.327301 432.201965,242.239929   C430.784943,243.582047 429.513855,244.785950 428.242737,245.989868  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M428.072266,246.349808   C429.513855,244.785950 430.784943,243.582047 432.201965,242.239929   C433.225739,242.327301 434.696991,242.898178 435.784393,242.477249   C447.587280,237.908340 454.885376,245.069931 462.872070,251.934891   C469.993530,258.056183 470.618195,264.856354 468.234467,273.017670   C467.301575,276.211609 468.071869,279.073547 470.913696,281.488098   C472.420288,282.768188 473.001251,285.137634 473.999695,287.404846   C473.999298,287.794403 473.544647,287.974976 472.868530,287.994202   C467.833679,288.341888 463.472656,288.642334 459.117157,289.009003   C456.417969,289.236237 453.727234,289.563934 451.032684,289.846558   C438.501465,287.958405 426.480408,274.493530 426.133209,261.253357   C426.006561,256.424286 427.271606,251.558685 428.072266,246.349808  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1358.000000,257.001221   C1352.707397,256.894897 1347.025269,259.465790 1342.338501,255.072205   C1338.681519,251.644043 1335.178955,248.044556 1331.714233,244.419373   C1324.649780,237.027573 1318.012329,229.183121 1310.523804,222.255081   C1304.396484,216.586456 1297.172607,212.087631 1293.016602,204.502243   C1291.984375,202.618393 1290.687012,200.763901 1290.186768,198.729813   C1289.283569,195.057037 1287.522705,192.604980 1283.820923,191.258423   C1281.971313,190.585617 1280.533325,188.781754 1278.697144,187.320923   C1281.253174,184.331299 1283.385376,181.837372 1285.793945,179.154129   C1294.807129,181.603973 1303.543945,184.243134 1312.634766,187.395279   C1312.498047,188.916336 1312.230469,190.148254 1311.480225,190.895874   C1306.926147,195.433884 1306.884644,197.988388 1311.246704,202.788910   C1313.242310,204.985046 1314.988647,207.407013 1316.858643,209.717957   C1322.847046,217.118637 1328.134766,225.147995 1337.112305,229.629028   C1339.820312,230.980652 1342.565063,233.276657 1344.044067,235.856064   C1346.955688,240.934677 1350.148926,244.936905 1356.408569,244.230682   C1356.967773,247.216034 1357.413452,249.595032 1357.859131,251.973999   C1357.859131,251.973999 1358.002930,252.404282 1358.093506,252.858398   C1358.325562,253.613754 1358.546875,253.835220 1358.847900,253.976929   C1359.074219,254.777054 1359.300415,255.577179 1359.275635,256.695190   C1358.683228,257.009094 1358.341553,257.005157 1358.000000,257.001221  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1205.640747,162.171280   C1208.222534,164.072998 1210.192505,166.552567 1212.750366,167.609238   C1215.832520,168.882462 1216.519043,170.630142 1215.687134,173.356857   C1214.866211,176.047592 1213.882935,178.708725 1212.730591,181.274826   C1208.741699,190.157349 1205.013062,199.187103 1200.445801,207.767151   C1198.037598,212.291016 1194.275269,216.160141 1190.789307,220.022491   C1188.198120,222.893417 1185.067993,225.277969 1181.002319,228.937271   C1181.002319,225.736496 1181.002319,224.004044 1181.002441,222.271576   C1181.002686,206.965500 1181.035156,191.659256 1180.958374,176.353577   C1180.949829,174.649216 1180.320801,172.947968 1179.605225,171.130707   C1179.230835,171.016129 1179.032837,170.568649 1179.058105,170.325623   C1186.780273,167.719345 1194.477173,165.356079 1202.768066,162.953705   C1203.600098,162.828796 1203.789795,162.680923 1203.931152,162.470947   C1204.383911,162.353561 1204.836670,162.236191 1205.640747,162.171280  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1357.927612,251.528809   C1357.413452,249.595032 1356.967773,247.216034 1356.408569,244.230682   C1350.148926,244.936905 1346.955688,240.934677 1344.044067,235.856064   C1342.565063,233.276657 1339.820312,230.980652 1337.112305,229.629028   C1328.134766,225.147995 1322.847046,217.118637 1316.858643,209.717957   C1314.988647,207.407013 1313.242310,204.985046 1311.246704,202.788910   C1306.884644,197.988388 1306.926147,195.433884 1311.480225,190.895874   C1312.230469,190.148254 1312.498047,188.916336 1312.996948,187.545074   C1314.426514,187.204407 1315.847900,187.226929 1317.802734,187.508484   C1318.539185,187.907867 1318.763916,187.983963 1319.010498,187.995819   C1321.703857,188.320175 1324.397217,188.644547 1327.793945,189.232819   C1331.864136,189.809860 1335.230835,190.123016 1338.912964,190.465500   C1337.569824,194.909866 1334.693848,199.353226 1335.588989,202.823868   C1336.577271,206.655930 1341.315796,209.386230 1343.891602,212.976227   C1347.384399,217.844574 1350.265869,223.223877 1357.494751,222.262604   C1357.630615,224.894867 1357.644287,227.092361 1357.884888,229.264755   C1358.116089,231.352188 1358.670898,233.403214 1358.915161,235.489944   C1359.088989,236.975616 1358.984131,238.493942 1359.003540,239.997711   C1358.667725,243.693008 1358.332031,247.388290 1357.927612,251.528809  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1359.287109,239.754242   C1358.984131,238.493942 1359.088989,236.975616 1358.915161,235.489944   C1358.670898,233.403214 1358.116089,231.352188 1357.884888,229.264755   C1357.644287,227.092361 1357.630615,224.894867 1357.494751,222.262604   C1350.265869,223.223877 1347.384399,217.844574 1343.891602,212.976227   C1341.315796,209.386230 1336.577271,206.655930 1335.588989,202.823868   C1334.693848,199.353226 1337.569824,194.909866 1338.912964,190.465500   C1335.230835,190.123016 1331.864136,189.809860 1328.219482,189.184723   C1329.141479,188.578613 1330.356812,187.978119 1331.539062,188.037521   C1344.145996,188.670761 1356.135498,185.846756 1367.925537,181.776184   C1373.512207,179.847321 1375.291016,181.042343 1373.885254,186.598587   C1370.009644,201.917023 1365.707275,217.127579 1361.566895,232.378937   C1360.920044,234.761276 1360.236938,237.133759 1359.287109,239.754242  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M451.347809,289.973389   C453.727234,289.563934 456.417969,289.236237 459.117157,289.009003   C463.472656,288.642334 467.833679,288.341888 472.624939,288.016785   C466.243408,291.978210 459.010986,291.633850 451.347809,289.973389  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1358.004395,257.339294   C1358.341553,257.005157 1358.683228,257.009094 1359.281006,257.010559   C1359.655640,257.749573 1359.774170,258.491089 1359.842285,259.608032   C1359.197510,259.214752 1358.603149,258.446045 1358.004395,257.339294  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1344.317749,277.949921   C1344.786621,277.335052 1345.571167,276.683319 1346.713989,276.038452   C1346.259277,276.667908 1345.446411,277.290497 1344.317749,277.949921  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1244.650757,163.077316   C1244.424683,163.277847 1243.877563,163.411697 1243.181763,163.346130   C1243.465210,163.101334 1243.897583,163.055969 1244.650757,163.077316  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1358.872192,253.712296   C1358.546875,253.835220 1358.325562,253.613754 1358.114014,253.084320   C1358.328125,253.053299 1358.612305,253.250488 1358.872192,253.712296  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1318.906738,187.816467   C1318.763916,187.983963 1318.539185,187.907867 1318.209961,187.639801   C1318.367798,187.298660 1318.607544,187.340332 1318.906738,187.816467  z"/>
              <path fill="url(#brand-gradient)" opacity="1.000000" stroke="none" d=" M1203.731689,162.428436   C1203.789795,162.680923 1203.600098,162.828796 1203.183350,162.951660   C1203.103271,162.720169 1203.279175,162.519226 1203.731689,162.428436  z"/>
            </svg>
            <div className="hidden sm:block border-l-2 pl-3 ml-1 transition-colors" style={{ borderColor: "var(--border-subtle)" }}>
              <p className="text-sm font-bold tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>
                Learning
              </p>
              <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                Platform
              </p>
            </div>
          </Link>

          {/* Nav links (desktop) */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-bold transition"
                  style={{
                    background: active ? "color-mix(in srgb, var(--accent-purple) 12%, transparent)" : "transparent",
                    color: active ? "var(--accent-purple)" : "var(--text-muted)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* XP Level indicator */}
            {hydrated ? (
              <Link
                href="/profile"
                className="group/xp hidden items-center gap-2 rounded-lg px-2.5 py-1.5 transition-all hover:scale-105 sm:flex"
                style={{
                  background: "color-mix(in srgb, var(--accent-purple) 8%, var(--bg-raised))",
                  border: "1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)",
                }}
                title={`Level ${xp.level} · ${xpToNextLevel.current}/${xpToNextLevel.needed} XP to next level`}
              >
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-black"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-purple), var(--accent-indigo))",
                    color: "white",
                    boxShadow: "0 2px 8px color-mix(in srgb, var(--accent-purple) 30%, transparent)",
                  }}
                >
                  {xp.level}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-black leading-none" style={{ color: "var(--text-primary)" }}>
                    Lv {xp.level}
                  </span>
                  <div className="xp-bar-track h-1 w-12">
                    <div className="xp-bar-fill" style={{ width: `${xpToNextLevel.percent}%` }} />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="h-9 w-20 rounded-lg bg-[var(--bg-raised)] border border-[var(--border-subtle)] animate-pulse hidden sm:block" />
            )}

            {/* Streak */}
            {hydrated ? (
              <StreakBadge current={streak.current} />
            ) : (
              <div className="h-9 w-12 rounded-lg bg-[var(--bg-raised)] border border-[var(--border-subtle)] animate-pulse" />
            )}

            {/* LeetCode Sync */}
            {hydrated ? (
              <div className="relative" ref={leetcodeRef}>
                <button
                  type="button"
                  onClick={() => setLeetcodeOpen(!leetcodeOpen)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 hover:scale-105"
                  style={{
                    borderColor: leetcodeOpen
                      ? "var(--accent-yellow)"
                      : "var(--border-default)",
                    background: leetcodeOpen
                      ? "color-mix(in srgb, var(--accent-yellow) 8%, var(--bg-surface))"
                      : "var(--bg-surface)",
                    color: leetcodeOpen ? "var(--accent-yellow)" : "var(--text-muted)",
                  }}
                  title="LeetCode Integration"
                >
                  <Code2 className="h-4 w-4" />
                </button>

                {leetcodeOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 origin-top-right rounded-xl border p-4 shadow-xl transition-all duration-200 animate-scale-in"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border-subtle)",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h3 className="mb-2 text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                      LeetCode Sync
                    </h3>
                    <p className="mb-3 text-[11px]" style={{ color: "var(--text-muted)" }}>
                      Automatically pull your latest accepted runs to mark practice questions as solved.
                    </p>

                    <div className="flex flex-col gap-2">
                      <div>
                        <label className="mb-1 block text-[10px] font-bold" style={{ color: "var(--text-faint)" }}>
                          Username
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="LeetCode Username"
                            value={localUsername}
                            onChange={(e) => setLocalUsername(e.target.value)}
                            className="flex-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none transition"
                            style={{
                              borderColor: "var(--border-default)",
                              background: "var(--bg-sunken)",
                              color: "var(--text-primary)",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setLtUsername(localUsername);
                              syncLeetCode(localUsername);
                            }}
                            disabled={syncStatus === "syncing"}
                            className="flex items-center justify-center rounded-lg px-3 text-xs font-bold text-white transition-all disabled:opacity-50"
                            style={{
                              background: "linear-gradient(135deg, #f59e0b, #d97706)",
                              boxShadow: "0 2px 4px color-mix(in srgb, #f59e0b 20%, transparent)",
                            }}
                          >
                            {syncStatus === "syncing" ? (
                              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              "Sync"
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Feedback message */}
                      {syncStatus === "success" && (
                        <div className="flex items-center gap-1.5 rounded-lg p-2 text-[11px] font-semibold animate-fade-in" style={{ background: "color-mix(in srgb, var(--accent-green) 10%, transparent)", color: "var(--accent-green)" }}>
                          <Check className="h-3 w-3 shrink-0" />
                          <span>Synced successfully!</span>
                        </div>
                      )}

                      {syncStatus === "error" && errorMsg && (
                        <div className="flex items-center gap-1.5 rounded-lg p-2 text-[11px] font-semibold animate-fade-in" style={{ background: "color-mix(in srgb, var(--accent-red) 10%, transparent)", color: "var(--accent-red)" }}>
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span className="truncate text-xs">{errorMsg}</span>
                        </div>
                      )}

                      {/* Last synced timestamp */}
                      {lastSynced && (() => {
                        const syncDate = new Date(lastSynced);
                        const isToday = syncDate.toDateString() === new Date().toDateString();
                        const timeStr = syncDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const label = isToday
                          ? timeStr
                          : `${syncDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} · ${timeStr}`;
                        return (
                          <div className="text-[10px] font-medium mt-1 text-right" style={{ color: "var(--text-faint)" }}>
                            Last synced: {label}
                          </div>
                        );
                      })()}
                    </div>
                    
                    {/* CSES Sync Section */}
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                      <h3 className="mb-2 text-xs font-black uppercase tracking-wider" style={{ color: "var(--text-primary)" }}>
                        CSES Sync
                      </h3>
                      <div className="flex flex-col gap-2">
                        <div>
                          <label className="mb-1 block text-[10px] font-bold" style={{ color: "var(--text-faint)" }}>
                            CSES User ID (numeric)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="CSES ID"
                              value={localCsesUserId}
                              onChange={(e) => setLocalCsesUserId(e.target.value)}
                              className="flex-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold outline-none transition"
                              style={{
                                borderColor: "var(--border-default)",
                                background: "var(--bg-sunken)",
                                color: "var(--text-primary)",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setCsesUserId(localCsesUserId);
                                syncCses(localCsesUserId);
                              }}
                              disabled={csesSyncStatus === "syncing"}
                              className="flex items-center justify-center rounded-lg px-3 text-xs font-bold text-white transition-all disabled:opacity-50"
                              style={{
                                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                                boxShadow: "0 2px 4px color-mix(in srgb, #3b82f6 20%, transparent)",
                              }}
                            >
                              {csesSyncStatus === "syncing" ? (
                                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                "Sync"
                              )}
                            </button>
                          </div>
                        </div>

                        {csesSyncStatus === "success" && (
                          <div className="flex items-center gap-1.5 rounded-lg p-2 text-[11px] font-semibold animate-fade-in" style={{ background: "color-mix(in srgb, var(--accent-green) 10%, transparent)", color: "var(--accent-green)" }}>
                            <Check className="h-3 w-3 shrink-0" />
                            <span>Synced successfully!</span>
                          </div>
                        )}

                        {csesSyncStatus === "error" && csesErrorMsg && (
                          <div className="flex items-center gap-1.5 rounded-lg p-2 text-[11px] font-semibold animate-fade-in" style={{ background: "color-mix(in srgb, var(--accent-red) 10%, transparent)", color: "var(--accent-red)" }}>
                            <AlertCircle className="h-3 w-3 shrink-0" />
                            <span className="truncate text-xs">{csesErrorMsg}</span>
                          </div>
                        )}

                        {csesLastSynced && (() => {
                          const syncDate = new Date(csesLastSynced);
                          const isToday = syncDate.toDateString() === new Date().toDateString();
                          const timeStr = syncDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                          const label = isToday
                            ? timeStr
                            : `${syncDate.toLocaleDateString([], { month: 'short', day: 'numeric' })} · ${timeStr}`;
                          return (
                            <div className="text-[10px] font-medium mt-1 text-right" style={{ color: "var(--text-faint)" }}>
                              Last synced: {label}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Search trigger */}
            <button
              type="button"
              id="search-trigger"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:opacity-80"
              style={{ border: "1px solid var(--border-default)", background: "var(--bg-surface)", color: "var(--text-muted)" }}
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd
                className="hidden rounded px-1.5 py-0.5 text-[10px] font-bold sm:inline"
                style={{ background: "var(--bg-sunken)", color: "var(--text-faint)" }}
              >
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ── Search modal ──────────────────────────────────────────── */}
      {searchOpen && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center px-4 pt-20">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setSearchOpen(false)}
          />

          {/* Modal */}
          <div
            className="relative w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl animate-scale-in"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" }}
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b px-4 py-3.5" style={{ borderColor: "var(--border-subtle)" }}>
              <Search className="h-4 w-4 shrink-0" style={{ color: "var(--text-faint)" }} />
              <input
                ref={searchRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses and days…"
                className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:italic"
                style={{ color: "var(--text-primary)" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && results.length > 0) {
                    router.push(results[0].href);
                    setSearchOpen(false);
                    setQuery("");
                  }
                }}
              />
              <button type="button" onClick={() => { setSearchOpen(false); setQuery(""); }}>
                <X className="h-4 w-4" style={{ color: "var(--text-faint)" }} />
              </button>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <ul className="max-h-80 overflow-y-auto py-2">
                {results.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      onClick={() => { setSearchOpen(false); setQuery(""); }}
                      className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-[var(--bg-raised)]"
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-black"
                        style={{
                          background: r.type === "course"
                            ? "color-mix(in srgb, var(--accent-purple) 15%, transparent)"
                            : "color-mix(in srgb, var(--accent-blue) 12%, transparent)",
                          color: r.type === "course" ? "var(--accent-purple)" : "var(--accent-blue)",
                        }}
                      >
                        {r.type === "course" ? "C" : "D"}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold" style={{ color: "var(--text-primary)" }}>{r.label}</p>
                        <p className="truncate text-xs font-medium" style={{ color: "var(--text-muted)" }}>{r.sub}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {query.trim().length >= 2 && results.length === 0 && (
              <div className="px-4 py-6 text-center text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                No results for &quot;<strong>{query}</strong>&quot;
              </div>
            )}

            {query.trim().length < 2 && (
              <div className="px-4 py-5">
                <p className="mb-2 text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
                  Quick links
                </p>
                <div className="flex flex-wrap gap-2">
                  {courses.map((c) => (
                    <Link
                      key={c.id}
                      href={`/courses/${c.id}`}
                      onClick={() => setSearchOpen(false)}
                      className="rounded-lg px-3 py-1.5 text-xs font-bold transition hover:opacity-80"
                      style={{
                        background: "color-mix(in srgb, var(--accent-purple) 10%, transparent)",
                        color: "var(--accent-purple)",
                        border: "1px solid color-mix(in srgb, var(--accent-purple) 20%, transparent)",
                      }}
                    >
                      {c.title.split(":")[0].trim()}
                    </Link>
                  ))}
                  <Link
                    href="/my-learning"
                    onClick={() => setSearchOpen(false)}
                    className="rounded-lg px-3 py-1.5 text-xs font-bold transition hover:opacity-80"
                    style={{
                      background: "color-mix(in srgb, var(--accent-green) 10%, transparent)",
                      color: "var(--accent-green)",
                      border: "1px solid color-mix(in srgb, var(--accent-green) 20%, transparent)",
                    }}
                  >
                    My Learning
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
