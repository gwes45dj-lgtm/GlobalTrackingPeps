export function WorldMap() {
  return (
    <svg
      viewBox="0 0 1000 500"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1000" height="500" fill="url(#grid)" className="text-slate-400" />

      {/* Simplified continent shapes for a stylised world map */}
      <g className="text-slate-300" fill="currentColor" fillOpacity="0.35">
        {/* North America */}
        <path d="M90,120 C140,80 230,85 290,115 C315,130 305,170 285,190 C270,210 250,230 230,240 C205,250 180,255 160,250 C130,245 105,225 90,195 C75,170 78,140 90,120 Z" />
        {/* Greenland */}
        <path d="M300,55 L345,50 L355,85 L310,90 Z" />
        {/* South America */}
        <path d="M225,285 C265,275 310,285 330,315 C350,355 340,415 300,455 C270,475 240,465 225,435 C205,395 208,335 225,285 Z" />
        {/* Europe */}
        <path d="M430,125 C460,115 500,120 530,135 C550,150 545,170 525,180 C505,190 475,185 455,175 C435,165 425,145 430,125 Z" />
        {/* Africa */}
        <path d="M440,205 C495,195 550,205 570,255 C580,305 560,365 515,405 C475,425 435,405 425,355 C415,305 415,245 440,205 Z" />
        {/* Asia */}
        <path d="M535,130 C600,110 760,120 855,160 C905,190 925,250 885,310 C845,340 785,340 725,320 C675,300 625,260 585,240 C555,220 535,190 535,160 Z" />
        {/* Australia */}
        <path d="M785,360 C835,350 885,360 895,390 C905,420 865,440 825,440 C785,440 765,420 775,390 Z" />
      </g>
    </svg>
  );
}
