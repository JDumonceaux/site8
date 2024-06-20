type IconProps = {
  readonly ariaHidden?: boolean;
  readonly focusable?: boolean;
};

export const NoteIcon = ({
  ariaHidden = false,
  focusable = true,
}: IconProps) => {
  return (
    <svg
      aria-hidden={ariaHidden}
      enableBackground="new 0 0 512 512"
      focusable={focusable}
      height="512px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 512 512"
      width="512px"
      x="0px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      y="0px">
      <link id="dark-mode-custom-link" rel="stylesheet" type="text/css" />
      <link id="dark-mode-general-link" rel="stylesheet" type="text/css" />
      <style id="dark-mode-custom-style" lang="en" type="text/css" />
      <style id="dark-mode-native-style" lang="en" type="text/css" />
      <style id="dark-mode-native-sheet" lang="en" type="text/css" />
      <text
        fill="#FFFF00"
        fontFamily="'Verdana-Bold'"
        fontSize="20"
        transform="matrix(1 0 0 1 168.7834 543.8083)">
        simpleicon.com
      </text>
      <text
        fill="#FFFF00"
        fontFamily="'Verdana'"
        fontSize="20"
        transform="matrix(1 0 0 1 9.1926 567.8083)">
        Collection Of Flat Icon, Symbols And Glyph Icons
      </text>
      <g>
        <path
          d="M402.5,74.74c0-4.551-3.689-8.24-8.24-8.24H117.74c-4.551,0-8.24,3.689-8.24,8.24v362.52   c0,4.551,3.689,8.24,8.24,8.24h276.52c4.551,0,8.24-3.689,8.24-8.24V74.74z"
          fill="none"
        />
        <path d="M418.5,75.219c0-13.652-11.067-24.72-24.721-24.72H118.221c-13.653,0-24.721,11.067-24.721,24.72V437.78   c0,13.652,11.068,24.72,24.721,24.72H393.78c13.653,0,24.721-11.067,24.721-24.72V75.219z M402.5,437.26   c0,4.551-3.689,8.239-8.24,8.239H117.74c-4.551,0-8.24-3.688-8.24-8.239V74.739c0-4.55,3.689-8.239,8.24-8.239h276.52   c4.551,0,8.24,3.689,8.24,8.239V437.26z" />
      </g>
      <g>
        <rect height="16" width="247" x="134.5" y="248.5" />
      </g>
      <g>
        <rect height="16" width="247" x="134.5" y="207.5" />
      </g>
      <g>
        <rect height="16" width="247" x="134.5" y="289.5" />
      </g>
      <g>
        <rect height="17" width="247" x="134.5" y="330.5" />
      </g>
      <g>
        <rect height="17" width="247" x="134.5" y="371.5" />
      </g>
      <circle cx="153" cy="109.74" r="12.36" />
      <circle cx="194.2" cy="109.74" r="12.36" />
      <path d="M383.72,109.74c0,6.826-5.536,12.36-12.359,12.36c-6.824,0-12.36-5.534-12.36-12.36c0-6.826,5.536-12.36,12.36-12.36  C378.184,97.38,383.72,102.914,383.72,109.74z" />
      <path d="M342.52,109.74c0,6.826-5.536,12.36-12.359,12.36c-6.824,0-12.36-5.534-12.36-12.36c0-6.826,5.536-12.36,12.36-12.36  C336.984,97.38,342.52,102.914,342.52,109.74z" />
    </svg>
  );
};
