/*
 * Menu delle pagine di presentazione, ripreso dalla UI di SRM (AppHeader e AppSideBar
 * di srm-servicerunmanagement-ui-servicerunmonitoring): barra blu in alto con l'hamburger,
 * sidebar estesa (240 px) o mini a sole icone (72 px), drawer sopra il contenuto sotto i 900 px.
 *
 * Uso: primo figlio del <body>, prima di qualunque contenuto, cosi' barra, sidebar e
 * larghezza ricordata ci sono gia' al primo disegno.
 *   <body data-nav="bandi" data-nav-title="Bandi di finanziamento" data-nav-note="Scouting dei bandi R&amp;S T&amp;L">
 *   <script src="js/srm-nav.js"></script>
 * data-nav e' l'id della voce corrente (vedi NAV). Su index.html le voci delle sezioni
 * puntano alle ancore della pagina e la voce corrente la decide lo scroll-spy, con
 * window.SRM_NAV.setActive(id).
 *
 * Testi in italiano: li traduce js/i18n.js (content/translations.js) come il resto della pagina.
 * Icone: le stesse Material Icons della UI (@mui/icons-material, licenza Apache 2.0).
 * Loghi: src/assets della UI (logoDark.svg, srmLogo3.svg, srmLogo2.svg).
 */
(function () {
  var body = document.body;
  if (!body || body.classList.contains('srm-shell')) return;

  var ICON = {
    "AutoAwesomeOutlined": "m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zm0 6-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25zm-7.5-5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12zm-1.51 3.49L9 15.17l-.99-2.18L5.83 12l2.18-.99L9 8.83l.99 2.18 2.18.99z",
    "DnsOutlined": "M19 15v4H5v-4zm1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1M7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5M19 5v4H5V5zm1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1M7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5",
    "EuroOutlined": "M15 18.5c-2.51 0-4.68-1.42-5.76-3.5H15l1-2H8.58c-.05-.33-.08-.66-.08-1s.03-.67.08-1H15l1-2H9.24C10.32 6.92 12.5 5.5 15 5.5c1.61 0 3.09.59 4.23 1.57L21 5.3C19.41 3.87 17.3 3 15 3c-3.92 0-7.24 2.51-8.48 6H3l-1 2h4.06c-.04.33-.06.66-.06 1s.02.67.06 1H3l-1 2h4.52c1.24 3.49 4.56 6 8.48 6 2.31 0 4.41-.87 6-2.3l-1.78-1.77c-1.13.98-2.6 1.57-4.22 1.57",
    "ExpandMore": "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z",
    "GridViewOutlined": "M3 3v8h8V3zm6 6H5V5h4zm-6 4v8h8v-8zm6 6H5v-4h4zm4-16v8h8V3zm6 6h-4V5h4zm-6 4v8h8v-8zm6 6h-4v-4h4z",
    "GroupsOutlined": "M4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29M20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24zm-7.76-2.78c-1.17-.52-2.61-.9-4.24-.9s-3.07.39-4.24.9C6.68 14.13 6 15.21 6 16.39V18h12v-1.61c0-1.18-.68-2.26-1.76-2.74M8.07 16c.09-.23.13-.39.91-.69.97-.38 1.99-.56 3.02-.56s2.05.18 3.02.56c.77.3.81.46.91.69zM12 8c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m0-2c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3",
    "HomeOutlined": "m12 5.69 5 4.5V18h-2v-6H9v6H7v-7.81zM12 3 2 12h3v8h6v-6h2v6h6v-8h3z",
    "HubOutlined": "M21 6.5c-1.66 0-3 1.34-3 3 0 .07 0 .14.01.21l-2.03.68c-.64-1.21-1.82-2.09-3.22-2.32V5.91C14.04 5.57 15 4.4 15 3c0-1.66-1.34-3-3-3S9 1.34 9 3c0 1.4.96 2.57 2.25 2.91v2.16c-1.4.23-2.58 1.11-3.22 2.32l-2.04-.68C6 9.64 6 9.57 6 9.5c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3c1.06 0 1.98-.55 2.52-1.37l2.03.68c-.2 1.29.17 2.66 1.09 3.69l-1.41 1.77Q6.66 17 6 17c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.68-.22-1.3-.6-1.8l1.41-1.77c1.36.76 3.02.75 4.37 0l1.41 1.77c-.37.5-.59 1.12-.59 1.8 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.44 0-.85.09-1.23.26l-1.41-1.77c.93-1.04 1.29-2.4 1.09-3.69l2.03-.68c.53.82 1.46 1.37 2.52 1.37 1.66 0 3-1.34 3-3S22.66 6.5 21 6.5m-18 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1M6 21c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m5-18c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1m1 12c-1.38 0-2.5-1.12-2.5-2.5S10.62 10 12 10s2.5 1.12 2.5 2.5S13.38 15 12 15m6 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1m3-8.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1",
    "LayersOutlined": "m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27zm0-11.47L17.74 9 12 13.47 6.26 9z",
    "LightbulbOutlined": "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7m2.85 11.1-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1",
    "Menu": "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z",
    "PeopleAltOutlined": "M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24C14.5 5.27 15 6.58 15 8s-.5 2.73-1.33 3.76c.42.14.86.24 1.33.24m-6 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4m6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2z",
    "SmartToyOutlined": "M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3m-2 10H6V7h12zm-9-6c-.83 0-1.5-.67-1.5-1.5S8.17 10 9 10s1.5.67 1.5 1.5S9.83 13 9 13m7.5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5M8 15h8v2H8z",
    "SyncOutlined": "M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4z",
    "TimelineOutlined": "M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2"
  };
  var LOGO = {
    "moova": "<svg viewBox=\"0 0 560 200\"><path d=\"M450.14 64.39l-36.36 86.25-27.6-65.54-1.5-3.58A8.07 8.07 0 00383 79a.36.36 0 01-.08-.19l-.39-.25a8 8 0 00-1.82-1.19 1.81 1.81 0 00-.33-.2h-.09l-.15-.06a.1.1 0 01-.06-.09h-.32c-.24-.08-.48-.14-.72-.2l-.15-.06h-.09a8.47 8.47 0 00-.88-.12 5.15 5.15 0 00-.55 0h-.27a5.56 5.56 0 00-1.49.15h-.3a3.42 3.42 0 01-1.19.3c-.15.15-.15.15-.3.15a8.24 8.24 0 00-1.19.74l-.3.15c-.3.3-.6.45-.9.75a1.13 1.13 0 00-.29.44v.06q-.19.21-.36.42a1.86 1.86 0 00-.35.42c-.15 0-.15 0-.15.15a4 4 0 00-.59 1.19l-36.84 87.09 26.11-20.76 18.18-42 27.34 64.9 1.76 4.21a8.38 8.38 0 001.68 2.46.33.33 0 01.08.19l.4.25a7.82 7.82 0 001.82 1.19l.32.2H410.78a.11.11 0 01.06.1h.32a6.44 6.44 0 00.72.2l.15.06h.09a6.57 6.57 0 00.89.12h.81a5.56 5.56 0 001.49-.15h.3a3.76 3.76 0 011.19-.29c.15-.15.15-.15.3-.15a8.22 8.22 0 001.19-.75l.3-.15c.3-.29.6-.44.9-.74a1.15 1.15 0 00.3-.45.47.47 0 01.06-.09c.11-.12.22-.25.32-.38a1.55 1.55 0 00.36-.43c.15 0 .15 0 .15-.15a4.3 4.3 0 00.6-1.19l43.85-103.73a21.42 21.42 0 01-14.99-6.73zM530.26 168.61l-36.54-87.09a5.37 5.37 0 01-.74-1.19.15.15 0 00-.15-.15 4 4 0 00-.75-.9c0-.3-.15-.3-.15-.44a5.84 5.84 0 01-1-.75h-.15c-.45-.3-1.05-.74-1.34-.89h-.15a.15.15 0 01-.15-.15 3.48 3.48 0 01-1.19-.3h-.3a5 5 0 00-1.49-.15 5.52 5.52 0 00-1.49.15h-.3a3.53 3.53 0 01-1.2.3c-.14.15-.14.15-.29.15a8.39 8.39 0 00-1.2.74l-.3.15c-.29.3-.59.45-.89.75a1 1 0 00-.3.44c-.15.3-.59.6-.74.9-.15 0-.15 0-.15.15a4.3 4.3 0 00-.6 1.19l-36.84 87.09a8.23 8.23 0 0015.14 6.26l8.58-20.37h41l8.59 20.37a8 8 0 0010.58 4.32 7.93 7.93 0 004.51-10.58zm-57.67-30.67l13.53-32.11 13.52 32.11z\" fill=\"#fff\" opacity=\"0.4\"></path><circle cx=\"465.76\" cy=\"49.63\" r=\"12.95\" fill=\"#fff\"></circle><path d=\"M348.27 88.45a48.3 48.3 0 00-35.64-16 49.79 49.79 0 00-36.54 16 55.67 55.67 0 00-6.36 8.22 52.08 52.08 0 00-6.4-8.22 50.32 50.32 0 00-36.53-16 48.84 48.84 0 00-35.64 16 54.47 54.47 0 00-10.59 16L170.8 127V79.57a8.51 8.51 0 00-8.35-8.2h-.15a8.16 8.16 0 00-6.71 3.43L125.91 116 96.24 74.8a8.09 8.09 0 00-6.56-3.43h-.45a8.28 8.28 0 00-8.2 8.2v88a8.28 8.28 0 0016.55 0v-62.79l21.32 29.82a8.41 8.41 0 006.86 3.43h.3a8.12 8.12 0 006.71-3.43l21.48-29.82v62.78a8.24 8.24 0 00.58 3l-.08.26a4.83 4.83 0 01.74 1.19c0 .15.16.15.16.15a3.13 3.13 0 00.61.76l.13.14c0 .29.15.29.15.44a5.84 5.84 0 011 .75h.15l.27.18c.39.27.83.59 1.07.71h.15a.15.15 0 01.15.15 3.42 3.42 0 011.19.3h.31a5 5 0 001.49.15h.79a6.88 6.88 0 00.81-.11h.18l.41-.14c.11 0 .23-.05.34-.09a2 2 0 01.45-.07c.15-.15.15-.15.3-.15a2.58 2.58 0 00.62-.35 8.38 8.38 0 004.44-6.08l9.36-22.11a55.78 55.78 0 0011.1 17.29 48.28 48.28 0 0035.64 16 49.74 49.74 0 0036.53-16 54.35 54.35 0 006.36-8.22 53.28 53.28 0 006.4 8.22 50.35 50.35 0 0036.54 16 48.85 48.85 0 0035.64-16 54.79 54.79 0 000-75.46zM251 152.27a32.44 32.44 0 01-24.16 10.59 32.11 32.11 0 01-23.56-10.59 38.58 38.58 0 01-10.14-26.09 38 38 0 0110.14-25.95c6.26-6.71 14.61-10.73 23.56-10.73A32.61 32.61 0 01251 100.23a37.31 37.31 0 0110.14 26A37.93 37.93 0 01251 152.27zm85.23-.14c-6.26 6.71-14.61 10.73-23.56 10.73a32.59 32.59 0 01-24.16-10.73 37.33 37.33 0 01-10.14-25.95 38 38 0 0110.14-26.1 32.19 32.19 0 0147.72 0 38.66 38.66 0 0110.14 26.1 38 38 0 01-10.18 25.95z\" fill=\"#fff\"></path></svg>",
    "srm": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 -15 175.74 80\"><defs><style>.cls-1{fill:currentColor;}</style></defs><g id=\"Livello_2\" data-name=\"Livello 2\"><g id=\"srm\"><path class=\"cls-1\" d=\"M0,52.05l10-9.33C14.34,47.17,19.32,50,26.17,50c5.39,0,9.15-2.14,10-5.65l0-.17c.79-3.34-.86-5.06-10.27-7.62C14.59,33.47,7.59,30.14,10.41,18.24l0-.18C13,7.19,23.47,0,35.71,0c8.73,0,15.53,2.74,20.45,7.62L47,17.55c-4.44-3.68-9.13-5.91-14.18-5.91S24.53,14,23.84,16.87l0,.17c-.94,3.94,1.33,5.22,11.06,7.87,11.4,3.17,17.22,7.54,14.74,18l0,.17C46.74,55,36.08,61.64,23.15,61.64,14.08,61.64,5.67,58.47,0,52.05Z\"/><path class=\"cls-1\" d=\"M62.48.86H89.87c7.62,0,13,2.14,16,6.08,2.54,3.33,3.22,8,1.89,13.69l-.05.17c-2.29,9.68-8.95,15.76-17.24,18.58l9.57,21.4H84.66l-8.3-19.17H66L61.46,60.78H48.27ZM82.12,30c6.42,0,10.91-3.43,12.11-8.48l0-.17c1.34-5.65-1.91-8.56-8.33-8.56H72.84L68.76,30Z\"/><path class=\"cls-1\" d=\"M115.81.86H130l9.75,25.34L161.53.86h14.21l-14.2,59.92h-13.1l9.27-39.12-22.93,25.6h-.34L123.75,21.92l-9.21,38.86H101.61Z\"/></g></g></svg>",
    "payoff": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 175.86 9.25\"><defs><style>.cls-1{fill:currentColor;}</style></defs><g id=\"Livello_2\" data-name=\"Livello 2\"><g id=\"payoff\"><path class=\"cls-1\" d=\"M.71,6.71a2.29,2.29,0,0,0,2.51,1.9c1.63,0,2.25-.82,2.25-1.8S5,5.17,3.07,4.68.38,3.58.38,2.29,1.23,0,3.14,0A2.61,2.61,0,0,1,6,2.3H5.32A2,2,0,0,0,3.1.64c-1.28,0-2,.61-2,1.61S1.7,3.62,3.34,4c2.5.63,2.87,1.65,2.87,2.73,0,1.32-1,2.46-3,2.46A2.86,2.86,0,0,1,0,6.71Z\"/><path class=\"cls-1\" d=\"M16.17,5c0-1.77,0-3.45.06-4.35h0C15.83,1.85,14,6.28,12.9,9.12h-.67C11.38,6.92,9.51,2,9.1.63h0c.06,1,.09,3.12.09,4.66V9.12H8.48v-9h1c1.22,3.08,2.75,7.12,3.08,8.13h0c.2-.65,2-5.14,3.22-8.13h1v9h-.69Z\"/><path class=\"cls-1\" d=\"M20.65,6,19.52,9.12h-.7l3.26-9h.81l3.4,9h-.74L24.39,6Zm3.51-.64c-1-2.67-1.5-4-1.67-4.56h0c-.21.68-.78,2.27-1.58,4.56Z\"/><path class=\"cls-1\" d=\"M29,4.92v4.2h-.7v-9h3.19c1.75,0,2.68,1,2.68,2.36A2,2,0,0,1,32.45,4.6C33.37,4.82,34,5.42,34,7V7.3a6.2,6.2,0,0,0,.11,1.82h-.7a6.23,6.23,0,0,1-.12-1.87V7c0-1.47-.44-2.09-2.14-2.09Zm0-.64h2.14c1.57,0,2.29-.59,2.29-1.77S32.67.77,31.28.77H29Z\"/><path class=\"cls-1\" d=\"M38.52.77h-3V.13h6.68V.77h-3V9.12h-.7Z\"/><path class=\"cls-1\" d=\"M48.3,4.92v4.2h-.7v-9h3.19c1.75,0,2.68,1,2.68,2.36A2,2,0,0,1,51.8,4.6c.92.22,1.53.82,1.53,2.35V7.3a5.88,5.88,0,0,0,.11,1.82h-.7a6.17,6.17,0,0,1-.13-1.87V7c0-1.47-.43-2.09-2.13-2.09Zm0-.64h2.14c1.57,0,2.29-.59,2.29-1.77S52,.77,50.63.77H48.3Z\"/><path class=\"cls-1\" d=\"M61.24,4.7H56.7V8.48h5l-.1.64H56v-9h5.44V.77H56.7V4.06h4.54Z\"/><path class=\"cls-1\" d=\"M64.91,6,63.78,9.12h-.7l3.26-9h.81l3.41,9h-.75L68.65,6Zm3.51-.64c-1-2.67-1.5-4-1.67-4.56h0c-.21.68-.78,2.27-1.58,4.56Z\"/><path class=\"cls-1\" d=\"M72.51.13h.69V8.48H78l-.13.64H72.51Z\"/><path class=\"cls-1\" d=\"M82.52,5.52v.63h-3.2V5.52Z\"/><path class=\"cls-1\" d=\"M85.88.77h-3V.13h6.68V.77h-3V9.12h-.7Z\"/><path class=\"cls-1\" d=\"M92,.13v9h-.68v-9Z\"/><path class=\"cls-1\" d=\"M102.65,5c0-1.77,0-3.45,0-4.35h0c-.36,1.21-2.16,5.64-3.29,8.48H98.7C97.85,6.92,96,2,95.58.63h0c.06,1,.08,3.12.08,4.66V9.12H95v-9h1c1.22,3.08,2.75,7.12,3.08,8.13h0c.2-.65,2-5.14,3.22-8.13h1v9h-.69Z\"/><path class=\"cls-1\" d=\"M111.55,4.7H107V8.48h5l-.1.64h-5.54v-9h5.44V.77H107V4.06h4.53Z\"/><path class=\"cls-1\" d=\"M125.49,5c0-1.77,0-3.45.05-4.35h0c-.36,1.21-2.16,5.64-3.29,8.48h-.67c-.85-2.2-2.72-7.13-3.13-8.49h0c.06,1,.09,3.12.09,4.66V9.12h-.69v-9h1c1.22,3.08,2.75,7.12,3.08,8.13h0c.2-.65,2-5.14,3.22-8.13h1v9h-.69Z\"/><path class=\"cls-1\" d=\"M136.51,4.56c0,2.45-1.29,4.69-4,4.69-2.5,0-4-2-4-4.63s1.41-4.62,4-4.62C135,0,136.51,1.94,136.51,4.56Zm-7.26,0c0,2.07,1.13,4,3.27,4s3.26-1.9,3.26-4S134.69.64,132.54.64,129.25,2.56,129.25,4.59Z\"/><path class=\"cls-1\" d=\"M138.85.13H142c1.7,0,2.61.91,2.61,2.21a1.93,1.93,0,0,1-1.37,2,2.27,2.27,0,0,1,1.69,2.23c0,1.8-1.33,2.59-2.88,2.59h-3.15ZM141.72,4c1.54,0,2.12-.58,2.12-1.62,0-.89-.61-1.61-1.85-1.61h-2.46V4Zm-2.19,4.48H142a1.89,1.89,0,0,0,2.14-1.91c0-1.15-.72-1.93-2.51-1.93h-2.13Z\"/><path class=\"cls-1\" d=\"M148,.13v9h-.69v-9Z\"/><path class=\"cls-1\" d=\"M151,.13h.68V8.48h4.78l-.13.64H151Z\"/><path class=\"cls-1\" d=\"M158.88.13v9h-.69v-9Z\"/><path class=\"cls-1\" d=\"M163.65.77h-3V.13h6.67V.77h-3V9.12h-.7Z\"/><path class=\"cls-1\" d=\"M171.81,9.12V5.74a.39.39,0,0,0-.05-.2L168.59.13h.8c.89,1.53,2.44,4.19,2.82,4.86.38-.67,1.94-3.31,2.89-4.86h.76l-3.31,5.46a.34.34,0,0,0,0,.19V9.12Z\"/></g></g></svg>"
  };

  var NAV = [
    { items: [
      { id: 'intro', label: 'Cosa è SRM', icon: 'HomeOutlined', href: 'index.html#intro' }
    ] },
    { label: 'Presentazione', items: [
      { id: 'perchi', label: 'Per chi è SRM', icon: 'GroupsOutlined', href: 'index.html#perchi' },
      { id: 'perche', label: 'Perché SRM', icon: 'LightbulbOutlined', href: 'index.html#perche' },
      { group: 'Architettura', icon: 'HubOutlined', items: [
        { id: 'architettura', label: 'Principi e stack', icon: 'LayersOutlined', href: 'index.html#architettura' },
        { id: 'infrastruttura', label: 'Infrastruttura', icon: 'DnsOutlined', href: 'infrastruttura-srm.html' }
      ] },
      { id: 'prodotto', label: 'Il prodotto', icon: 'GridViewOutlined', href: 'index.html#prodotto' },
      { id: 'team', label: 'Il team', icon: 'PeopleAltOutlined', href: 'index.html#team' },
      { id: 'metodo', label: 'Metodo di lavoro', icon: 'SyncOutlined', href: 'index.html#metodo' },
      { id: 'roadmap-sec', label: 'Roadmap', icon: 'TimelineOutlined', href: 'index.html#roadmap-sec' }
    ] },
    { label: 'Smart services', items: [
      { id: 'smart-services', label: 'AI e servizi evoluti', icon: 'AutoAwesomeOutlined', href: 'smart-services.html' },
      { id: 'assistente', label: 'Assistente SRM', icon: 'SmartToyOutlined', href: 'assistente-srm.html' }
    ] },
    { label: 'Opportunità', items: [
      { id: 'bandi', label: 'Bandi di finanziamento', icon: 'EuroOutlined', href: 'bandi-finanziamento.html' }
    ] }
  ];

  var VERSION = 'v1.0';
  var STORAGE_KEY = 'srm.sidebar';
  var onIndex = /(^|\/)(index\.html)?$/.test(location.pathname);
  var current = body.dataset.nav || '';
  var title = body.dataset.navTitle || '';
  var note = body.dataset.navNote || 'Pagina di presentazione';

  var CSS = [
    // Valori del tema della UI SRM: primary #0062a2, paper #f2f2f2, text.disabled, divider, radius.md
    '.srm-shell{--sn-primary:#0062a2;--sn-hover:rgba(0,98,162,.10);--sn-hover-group:rgba(0,98,162,.07);--sn-paper:#f2f2f2;',
    '--sn-text:#070707;--sn-text-2:rgba(0,0,0,.6);--sn-text-dis:rgba(0,0,0,.38);--sn-divider:rgba(0,0,0,.12);',
    '--sn-header:50px;--sn-drawer:240px;--sn-mini:72px;--sidebar:var(--sn-drawer);padding-top:var(--sn-header)}',
    '.srm-shell.srm-mini{--sidebar:var(--sn-mini)}',
    // ancore e scroll-snap si fermano sotto la barra
    'html:has(>body.srm-shell){scroll-padding-top:50px}',
    '.srm-shell main,.srm-shell .main{transition:margin-left .25s}',
    '.sn-appbar,.sn-sidebar,.sn-tooltip{font-family:"Segoe UI",Roboto,system-ui,-apple-system,Arial,sans-serif;line-height:1.43;box-sizing:border-box}',
    '.sn-appbar *,.sn-sidebar *{box-sizing:border-box}',
    '.sn-i{width:24px;height:24px;fill:currentColor;flex:none}',

    // barra in alto
    '.sn-appbar{position:fixed;top:0;left:0;right:0;height:var(--sn-header);background:var(--sn-primary);color:#fff;display:flex;align-items:center;z-index:30;padding-right:120px}',
    '.sn-left{width:var(--sn-drawer);height:40px;display:flex;align-items:center;padding:0 8px;flex:none;transition:width .25s}',
    '.srm-mini .sn-left{width:var(--sn-mini);justify-content:center}',
    '.sn-burger{width:40px;height:40px;border:0;border-radius:50%;background:transparent;color:inherit;display:grid;place-items:center;cursor:pointer;flex:none;padding:0}',
    '.sn-burger:hover{background:rgba(255,255,255,.12)}',
    '.sn-burger:focus-visible{outline:2px solid #fff;outline-offset:1px}',
    '.sn-lockup{display:flex;align-items:center;height:36px;margin-bottom:8px;color:#fff;text-decoration:none}',
    '.sn-lockup svg{height:36px;width:auto}',
    '.srm-mini .sn-lockup{display:none}',
    '.sn-mark-phone{display:none;color:#fff;text-decoration:none}',
    '.sn-mark-phone svg{height:26px;width:auto;display:block}',
    '.sn-title{margin-left:16px;font-size:13px;font-weight:600;letter-spacing:.04em;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    // selettore lingua di i18n.js, portato dentro la barra
    '.srm-shell .language-switcher{top:10px;right:16px;border:0;background:rgba(255,255,255,.14);box-shadow:none;backdrop-filter:none}',
    '.srm-shell .language-switcher button{color:#fff;opacity:.85}',
    '.srm-shell .language-switcher button.active{background:#fff;color:var(--sn-primary);opacity:1}',
    '.srm-shell .language-switcher button:focus-visible{outline-color:rgba(255,255,255,.6)}',

    // sidebar
    '.sn-sidebar{position:fixed;top:var(--sn-header);left:0;bottom:0;width:var(--sidebar);background:var(--sn-paper);color:var(--sn-text);border-right:1px solid var(--sn-divider);display:flex;flex-direction:column;overflow-x:hidden;white-space:nowrap;transition:width .25s,transform .25s;z-index:20}',
    '.sn-logo{min-height:52px;padding:16px 20px;margin-bottom:8px;border-bottom:1px solid var(--sn-divider);display:flex;align-items:center;color:var(--sn-primary);flex:none}',
    '.sn-logo .sn-payoff{height:10px;width:auto;max-width:100%}',
    '.sn-logo .sn-mark{display:none;height:28px;width:auto}',
    '.srm-mini .sn-logo{justify-content:center;padding:16px 8px}',
    '.srm-mini .sn-logo .sn-payoff{display:none}',
    '.srm-mini .sn-logo .sn-mark{display:block}',
    '.sn-list{flex:1;min-height:0;overflow-y:auto;overflow-x:hidden}',
    '.sn-section{padding:4px 0}',
    '.sn-divider{height:1px;background:var(--sn-divider);margin:4px 16px}',
    '.srm-mini .sn-divider{margin:4px 8px}',
    '.sn-label{display:block;padding:4px 16px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--sn-text-dis)}',
    '.srm-mini .sn-label{display:none}',
    '.sn-item,.sn-group{position:relative}',
    '.sn-btn{display:flex;align-items:center;gap:12px;width:calc(100% - 16px);margin:0 8px 2px;padding:6px 16px;border:0;border-radius:8px;background:transparent;color:inherit;font-family:inherit;font-size:14px;font-weight:600;line-height:1.43;letter-spacing:normal;text-align:left;text-decoration:none;cursor:pointer;transition:color .2s}',
    '.sn-btn:hover{background:var(--sn-hover)}',
    '.sn-btn:focus-visible{outline:2px solid var(--sn-primary);outline-offset:-2px}',
    '.sn-btn .sn-lbl{flex:1;overflow:hidden;text-overflow:ellipsis}',
    '.sn-btn.sn-nested{padding-left:32px;font-weight:400}',
    '.sn-group>.sn-btn:hover{background:var(--sn-hover-group)}',
    // voce corrente: segnalibro a sinistra e colore primario, come le voci con tab aperte in SRM
    '.sn-item.sn-active>.sn-btn{color:var(--sn-primary)}',
    '.sn-item.sn-active:not(.sn-in-group)::before,.sn-group.sn-has-active.sn-collapsed::before,.srm-mini .sn-group.sn-has-active::before{content:"";position:absolute;left:0;top:50%;transform:translateY(-50%);width:3px;height:65%;background:var(--sn-primary);border-radius:0 8px 8px 0;z-index:1}',
    '.sn-group.sn-has-active.sn-collapsed>.sn-btn,.srm-mini .sn-group.sn-has-active>.sn-btn{color:var(--sn-primary)}',
    '.sn-dot{display:none;width:6px;height:6px;border-radius:50%;background:var(--sn-primary);margin:0 -6px 0 -4px;flex:none}',
    '.sn-in-group.sn-active .sn-dot{display:block}',
    '.sn-chev{width:20px;height:20px;fill:currentColor;flex:none;transition:transform .2s}',
    '.sn-group:not(.sn-collapsed)>.sn-btn .sn-chev{transform:rotate(180deg)}',
    '.sn-group.sn-collapsed .sn-children{display:none}',
    '.sn-mini-chev{display:none}',
    // versione mini: icone centrate, nome nel tooltip
    '.srm-mini .sn-btn{width:44px;margin:0 auto 2px;padding:6px 0;justify-content:center;gap:0;position:relative}',
    '.srm-mini .sn-btn .sn-lbl,.srm-mini .sn-btn .sn-chev,.srm-mini .sn-dot,.srm-mini .sn-children{display:none}',
    '.srm-mini .sn-mini-chev{display:block;position:absolute;width:10px;height:10px;right:4px;bottom:6px;opacity:.6;fill:currentColor}',
    '.sn-tooltip{position:fixed;z-index:50;background:rgba(97,97,97,.92);color:#fff;font-size:11px;font-weight:500;padding:4px 8px;border-radius:4px;pointer-events:none;white-space:nowrap;opacity:0;transform:scale(.9);transition:opacity .15s,transform .15s}',
    '.sn-tooltip.sn-show{opacity:1;transform:none}',
    '.sn-foot{border-top:1px solid var(--sn-divider);flex:none}',
    '.sn-card{display:flex;align-items:center;gap:12px;padding:12px 16px}',
    '.sn-avatar{width:36px;height:36px;border-radius:50%;background:var(--sn-primary);color:#fff;display:grid;place-items:center;flex:none}',
    '.sn-avatar svg{width:22px;height:auto}',
    '.sn-card-text{min-width:0}',
    '.sn-card-t{font-size:13px;font-weight:600;line-height:1.3}',
    '.sn-card-s{font-size:12px;color:var(--sn-text-2);line-height:1.3;overflow:hidden;text-overflow:ellipsis}',
    '.srm-mini .sn-card{justify-content:center;padding:12px 0}',
    '.srm-mini .sn-card-text{display:none}',
    '.sn-version{text-align:center;font-size:10px;letter-spacing:.04em;color:var(--sn-text-2);padding:4px 0;user-select:none}',
    '.sn-scrim{display:none;position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:35}',

    // sotto i 900 px: drawer temporaneo sopra il contenuto, sempre esteso
    '@media(max-width:900px){',
    '.srm-shell,.srm-shell.srm-mini{--sidebar:0px}',
    '.sn-appbar{padding-right:100px}',
    '.sn-left,.srm-mini .sn-left{width:auto;justify-content:flex-start;gap:4px}',
    '.sn-lockup,.srm-mini .sn-lockup,.sn-title{display:none}',
    '.sn-mark-phone{display:block}',
    '.sn-sidebar{top:0;width:var(--sn-drawer);transform:translateX(-100%);z-index:40;box-shadow:0 8px 10px -5px rgba(0,0,0,.2),0 16px 24px 2px rgba(0,0,0,.14)}',
    '.srm-drawer-open .sn-sidebar{transform:none}',
    '.srm-drawer-open .sn-scrim{display:block}',
    '.srm-mini .sn-label{display:block}',
    '.srm-mini .sn-divider{margin:4px 16px}',
    '.srm-mini .sn-btn{width:calc(100% - 16px);margin:0 8px 2px;padding:6px 16px;justify-content:flex-start;gap:12px}',
    '.srm-mini .sn-btn.sn-nested{padding-left:32px}',
    '.srm-mini .sn-btn .sn-lbl,.srm-mini .sn-btn .sn-chev,.srm-mini .sn-children{display:block}',
    '.srm-mini .sn-group.sn-collapsed .sn-children{display:none}',
    '.srm-mini .sn-in-group.sn-active .sn-dot{display:block}',
    '.srm-mini .sn-mini-chev{display:none}',
    '.srm-mini .sn-group.sn-has-active:not(.sn-collapsed)::before{display:none}',
    '.srm-mini .sn-group.sn-has-active:not(.sn-collapsed)>.sn-btn{color:inherit}',
    '.srm-mini .sn-logo{justify-content:flex-start;padding:16px 20px}',
    '.srm-mini .sn-logo .sn-payoff{display:block}',
    '.srm-mini .sn-logo .sn-mark{display:none}',
    '.srm-mini .sn-card{justify-content:flex-start;padding:12px 16px}',
    '.srm-mini .sn-card-text{display:block}',
    '}',
    '@media print{.sn-appbar,.sn-sidebar,.sn-scrim{display:none}.srm-shell{padding-top:0;--sidebar:0px}}'
  ].join('\n');

  function esc(text) {
    return String(text).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function icon(name, cls) {
    return '<svg class="' + (cls || 'sn-i') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + ICON[name] + '"/></svg>';
  }
  function logo(name, cls) {
    // data-i18n-ignore: lo <style> interno degli SVG non e' testo da tradurre
    return LOGO[name].replace('<svg', '<svg aria-hidden="true" focusable="false" data-i18n-ignore' + (cls ? ' class="' + cls + '"' : ''));
  }
  // Su index.html le sezioni sono ancore della stessa pagina: niente ricaricamento
  function hrefOf(item) {
    return onIndex && item.href.indexOf('index.html#') === 0 ? item.href.slice(10) : item.href;
  }
  function itemHtml(item, inGroup) {
    var active = item.id === current;
    return '<div class="sn-item' + (inGroup ? ' sn-in-group' : '') + (active ? ' sn-active' : '') + '">' +
      '<a class="sn-btn' + (inGroup ? ' sn-nested' : '') + '" href="' + esc(hrefOf(item)) + '" data-nav-id="' + esc(item.id) + '"' +
      (active ? ' aria-current="page"' : '') + '>' +
      '<span class="sn-dot"></span>' + icon(item.icon) + '<span class="sn-lbl">' + esc(item.label) + '</span></a></div>';
  }
  function groupHtml(group) {
    var active = group.items.some(function (item) { return item.id === current; });
    return '<div class="sn-group' + (active ? ' sn-has-active' : ' sn-collapsed') + '">' +
      '<button class="sn-btn" type="button" aria-expanded="' + active + '">' +
      icon(group.icon) + icon('ExpandMore', 'sn-mini-chev') + '<span class="sn-lbl">' + esc(group.group) + '</span>' + icon('ExpandMore', 'sn-chev') +
      '</button><div class="sn-children">' +
      group.items.map(function (item) { return itemHtml(item, true); }).join('') + '</div></div>';
  }

  var style = document.createElement('style');
  style.id = 'srm-nav-style';
  style.textContent = CSS;
  document.head.appendChild(style);

  body.classList.add('srm-shell');
  var phone = window.matchMedia('(max-width:900px)');
  try { if (localStorage.getItem(STORAGE_KEY) === 'mini') body.classList.add('srm-mini'); } catch (e) { /* storage non disponibile */ }

  var homeHref = onIndex ? '#intro' : 'index.html';
  var appbar = document.createElement('header');
  appbar.className = 'sn-appbar';
  appbar.innerHTML =
    '<div class="sn-left">' +
      '<button class="sn-burger" type="button" aria-controls="sn-sidebar" aria-label="Apri o chiudi il menu">' + icon('Menu') + '</button>' +
      '<a class="sn-lockup" href="' + homeHref + '" aria-label="MOOVA SRM">' + logo('moova') + logo('srm') + '</a>' +
      '<a class="sn-mark-phone" href="' + homeHref + '" aria-label="MOOVA SRM">' + logo('srm') + '</a>' +
    '</div>' +
    (title ? '<div class="sn-title">' + esc(title) + '</div>' : '');

  var sidebar = document.createElement('aside');
  sidebar.className = 'sn-sidebar';
  sidebar.id = 'sn-sidebar';
  sidebar.setAttribute('aria-label', 'Menu principale');
  sidebar.innerHTML =
    '<div class="sn-logo">' + logo('payoff', 'sn-payoff') + logo('srm', 'sn-mark') + '</div>' +
    '<nav class="sn-list">' + NAV.map(function (section, index) {
      return (index > 0 ? '<div class="sn-divider"></div>' : '') + '<div class="sn-section">' +
        (section.label ? '<span class="sn-label">' + esc(section.label) + '</span>' : '') +
        section.items.map(function (entry) { return entry.group ? groupHtml(entry) : itemHtml(entry, false); }).join('') +
        '</div>';
    }).join('') + '</nav>' +
    '<div class="sn-foot"><div class="sn-card"><span class="sn-avatar">' + logo('srm') + '</span>' +
      '<span class="sn-card-text"><div class="sn-card-t">MOOVA SRM</div><div class="sn-card-s">' + esc(note) + '</div></span></div>' +
      '<div class="sn-version">' + VERSION + '</div></div>';

  var scrim = document.createElement('div');
  scrim.className = 'sn-scrim';
  var tooltip = document.createElement('div');
  tooltip.className = 'sn-tooltip';
  tooltip.setAttribute('role', 'tooltip');

  body.insertBefore(tooltip, body.firstChild);
  body.insertBefore(scrim, body.firstChild);
  body.insertBefore(sidebar, body.firstChild);
  body.insertBefore(appbar, body.firstChild);

  var burger = appbar.querySelector('.sn-burger');
  var list = sidebar.querySelector('.sn-list');

  function isMini() { return body.classList.contains('srm-mini') && !phone.matches; }
  function syncAria() {
    burger.setAttribute('aria-expanded', String(phone.matches ? body.classList.contains('srm-drawer-open') : !body.classList.contains('srm-mini')));
  }
  function remember() {
    try { localStorage.setItem(STORAGE_KEY, body.classList.contains('srm-mini') ? 'mini' : 'open'); } catch (e) { /* storage non disponibile */ }
  }
  function openDrawer() {
    body.classList.add('srm-drawer-open');
    syncAria();
    var first = list.querySelector('.sn-btn');
    if (first) first.focus();
  }
  function closeDrawer(returnFocus) {
    if (!body.classList.contains('srm-drawer-open')) return;
    body.classList.remove('srm-drawer-open');
    syncAria();
    if (returnFocus) burger.focus();
  }
  function hideTooltip() { tooltip.classList.remove('sn-show'); }

  burger.addEventListener('click', function () {
    hideTooltip();
    if (phone.matches) {
      if (body.classList.contains('srm-drawer-open')) closeDrawer(false); else openDrawer();
      return;
    }
    body.classList.toggle('srm-mini');
    remember();
    syncAria();
  });
  scrim.addEventListener('click', function () { closeDrawer(false); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeDrawer(true);
  });
  var onBreakpoint = function () { closeDrawer(false); syncAria(); };
  if (phone.addEventListener) phone.addEventListener('change', onBreakpoint); else phone.addListener(onBreakpoint);
  syncAria();

  // Gruppi: apri/chiudi; dalla versione mini un clic estende la sidebar e apre il gruppo
  list.querySelectorAll('.sn-group > .sn-btn').forEach(function (button) {
    button.addEventListener('click', function () {
      var group = button.parentElement;
      if (isMini()) {
        body.classList.remove('srm-mini');
        group.classList.remove('sn-collapsed');
        remember();
        syncAria();
      } else {
        group.classList.toggle('sn-collapsed');
      }
      button.setAttribute('aria-expanded', String(!group.classList.contains('sn-collapsed')));
      hideTooltip();
    });
  });

  // Scelta di una voce: il drawer copre il contenuto, quindi si chiude
  list.addEventListener('click', function (event) {
    if (event.target.closest('a.sn-btn') && phone.matches) closeDrawer(false);
  });

  // Tooltip a destra, solo nella versione mini (il testo e' quello gia' tradotto)
  list.addEventListener('mouseover', function (event) {
    var button = event.target.closest('.sn-btn');
    if (!button || !isMini()) return;
    var label = button.querySelector('.sn-lbl');
    var rect = button.getBoundingClientRect();
    tooltip.textContent = label ? label.textContent : '';
    tooltip.style.left = (rect.right + 10) + 'px';
    tooltip.style.top = (rect.top + rect.height / 2 - 12) + 'px';
    tooltip.classList.add('sn-show');
  });
  list.addEventListener('mouseout', function (event) {
    if (event.target.closest('.sn-btn')) hideTooltip();
  });
  list.addEventListener('scroll', hideTooltip, { passive: true });

  function setActive(id) {
    if (id === current) return;
    current = id;
    list.querySelectorAll('.sn-item').forEach(function (element) {
      var link = element.querySelector('a');
      var on = link.dataset.navId === id;
      element.classList.toggle('sn-active', on);
      if (on) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    list.querySelectorAll('.sn-group').forEach(function (group) {
      group.classList.toggle('sn-has-active', !!group.querySelector('.sn-item.sn-active'));
    });
  }

  window.SRM_NAV = { setActive: setActive, closeDrawer: function () { closeDrawer(false); } };
})();
