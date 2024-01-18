const provinces = [
  { code: '2', name: 'Albacete' },
  { code: '3', name: 'Alicante/Alacant' },
  { code: '4', name: 'Almería' },
  { code: '1', name: 'Araba/Álava' },
  { code: '3', name: 'Asturias' },
  { code: '5', name: 'Ávila' },
  { code: '6', name: 'Badajoz' },
  { code: '7', name: 'Balears, Illes' },
  { code: '8', name: 'Barcelona' },
  { code: '48', name: 'Bizkaia' },
  { code: '9', name: 'Burgos' },
  { code: '10', name: 'Cáceres' },
  { code: '11', name: 'Cádiz' },
  { code: '39', name: 'Cantabria' },
  { code: '12', name: 'Castellón/Castelló' },
  { code: '13', name: 'Ciudad Real' },
  { code: '14', name: 'Córdoba' },
  { code: '15', name: 'Coruña, A' },
  { code: '16', name: 'Cuenca' },
  { code: '20', name: 'Gipuzkoa' },
  { code: '17', name: 'Girona' },
  { code: '18', name: 'Granada' },
  { code: '19', name: 'Guadalajara' },
  { code: '21', name: 'Huelva' },
  { code: '22', name: 'Huesca' },
  { code: '23', name: 'Jaén' },
  { code: '24', name: 'León' },
  { code: '25', name: 'Lleida' },
  { code: '27', name: 'Lugo' },
  { code: '28', name: 'Madrid' },
  { code: '29', name: 'Málaga' },
  { code: '30', name: 'Murcia' },
  { code: '31', name: 'Navarra' },
  { code: '32', name: 'Ourense' },
  { code: '34', name: 'Palencia' },
  { code: '35', name: 'Palmas, Las' },
  { code: '36', name: 'Pontevedra' },
  { code: '26', name: 'Rioja, La' },
  { code: '37', name: 'Salamanca' },
  { code: '38', name: 'Santa Cruz de Tenerife' },
  { code: '40', name: 'Segovia' },
  { code: '41', name: 'Sevilla' },
  { code: '42', name: 'Soria' },
  { code: '43', name: 'Tarragona' },
  { code: '44', name: 'Teruel' },
  { code: '45', name: 'Toledo' },
  { code: '46', name: 'Valencia/València' },
  { code: '47', name: 'Valladolid' },
  { code: '49', name: 'Zamora' },
  { code: '50', name: 'Zaragoza' },
  { code: '51', name: 'Ceuta' },
  { code: '52', name: 'Melilla' }
]
const elections = [
  {
    fileNames: '202307-201911',
    currentDate: '2023-07-23',
    pastDate: '2019-11-10'
  },
  {
    fileNames: '201911-201904',
    currentDate: '2019-11-10',
    pastDate: '2019-04-28'
  },
  {
    fileNames: '201904-201606',
    currentDate: '2019-04-28',
    pastDate: '2016-06-26'
  },
  {
    fileNames: '201606-201512',
    currentDate: '2016-06-26',
    pastDate: '2015-12-20'
  },
  {
    fileNames: '201512-201111',
    currentDate: '2015-12-20',
    pastDate: '2011-11-20'
  },
  {
    fileNames: '201111-200803',
    currentDate: '2011-11-20',
    pastDate: '2008-03-09'
  },
  {
    fileNames: '200803-200403',
    currentDate: '2008-03-09',
    pastDate: '2004-03-14'
  },
  {
    fileNames: '200403-200003',
    currentDate: '2004-03-14',
    pastDate: '2000-03-12'
  },
  {
    fileNames: '200003-199603',
    currentDate: '2000-03-12',
    pastDate: '1996-03-03'
  },
  {
    fileNames: '199603-199306',
    currentDate: '1996-03-03',
    pastDate: '1993-06-06'
  },
  {
    fileNames: '199306-198910',
    currentDate: '1993-06-06',
    pastDate: '1989-10-29'
  },
  {
    fileNames: '198910-198606',
    currentDate: '1989-10-29',
    pastDate: '1986-06-22'
  },
  {
    fileNames: '198606-198210',
    currentDate: '1986-06-22',
    pastDate: '1982-10-28'
  },
  {
    fileNames: '198210-197903',
    currentDate: '1982-10-28',
    pastDate: '1979-03-01'
  },
  {
    fileNames: '197903-197706',
    currentDate: '1979-03-01',
    pastDate: '1977-06-15'
  }
]
const partiesStore = [
  {
    initials: ['PSOE', 'P.S.O.E.', 'PSOE-PROGR.'],
    defaultName: 'Partido Socialista Obrero Español',
    color: '#E43D32'
  },
  {
    initials: ['PP', 'P.P.', 'AP-PDP-PL', 'AP-PDP'],
    defaultName: 'Partido Popular',
    color: '#0157A4'
  },
  {
    initials: ['Cs', 'C\'s'],
    defaultName: 'Ciudadanos',
    color: '#FF4700'
  },
  {
    initials: [
      'PODEMOS-IU-EQUO',
      'PODEMOS-EU-MAREAS EN COMÚN-EQUO',
      'ECP-GUANYEM EL CANVI',
      'PODEMOS-IU',
      'PODEMOS-EU',
      'PODEMOS-EN MAREA-ANOVA-EU',
      'ECP',
      'PODEMOS-COMPROMÍS-EUPV',
      'PODEMOS',
      'PODEMOS-COM',
      'PODEMOS-En',
      'EN COMÚ'
    ],
    defaultName: 'Unidas Podemos',
    color: '#612760'
  },
  {
    initials: ['VOX'],
    defaultName: 'Vox',
    color: '#5AC035'
  },
  {
    initials: ['ERC-SOBIRANISTES', 'ERC', 'ERC-CATSÍ', 'ERC-CATSI', 'ESQUERRA'],
    defaultName: 'Esquerra Republicana',
    color: '#F7B93F'
  },
  {
    initials: ['JxCAT-JUNTS', 'JxCAT - JUNTS', 'CDC'],
    defaultName: 'Junts per Catalunya',
    color: '#EE5976'
  },
  {
    initials: ['CDC', 'DL', 'CiU', 'CIU'],
    defaultName: 'Convergencia / Convergencia i Unió',
    color: '#282968'
  },
  {
    initials: ['CiU'],
    defaultName: 'Convergencia i Unió',
    color: '#282968'
  },
  {
    initials: ['unio.cat'],
    defaultName: 'Unió',
    color: '#0053A1'
  },
  {
    initials: ['EAJ-PNV'],
    defaultName: 'Partido Nacionalista Vasco',
    color: '#008336'
  },
  {
    initials: ['EH Bildu'],
    defaultName: 'Euskal Herria Bildu',
    color: '#B0D136'
  },
  {
    initials: ['CCa-PNC'],
    defaultName: 'Coalición Canaria - Partido Nacionalista Canario',
    color: '#F7D04D'
  },
  {
    initials: ['NA+'],
    defaultName: 'Navarra Suma',
    color: '#DC1717'
  },
  {
    initials: ['COMPROMÍS 2019', 'MÉS COMPROMÍS', 'COMPROMÍS-Q'],
    defaultName: 'Compromís',
    color: '#D35427'
  },
  {
    initials: ['PRC'],
    defaultName: 'Partido Reginonalista de Cantabria',
    color: '#B9C714'
  },
  {
    initials: ['BNG', 'B.N.G.'],
    defaultName: 'Bloque Nacionalista Galego',
    color: '#94CCF7'
  },
  {
    initials: ['¡Teruel Existe!'],
    defaultName: '¡Teruel Existe!',
    color: '#0D7251'
  },
  {
    initials: ['CUP-PR'],
    defaultName: 'CUP',
    color: '#efd700'
  },
  {
    initials: ['MÁS PAÍS-EQUO', 'MÁS PAÍS'],
    defaultName: 'Más País',
    color: '#27e1c3'
  },
  {
    initials: ['PACMA'],
    defaultName: 'PACMA',
    color: '#00f54c'
  },
  {
    initials: ['CCa-PNC-NC', 'CCa-PNC'],
    defaultName: 'Coalición Canaria',
    color: '#ccba20'
  },
  {
    initials: ['¡TERUEL EXISTE!'],
    defaultName: '¡Teruel Existe!',
    color: '#0D7251'
  },
  {
    initials: ['Votos en blanco'],
    defaultName: 'Votos en Blanco',
    color: '#3f3f3f'
  },
  {
    initials: ['Votos nulos'],
    defaultName: 'Votos nulos',
    color: '#3f3f3f'
  },
  {
    initials: ['Abstención'],
    defaultName: 'Abstención',
    color: '#3f3f3f'
  },
  {
    initials: ['SUMAR'],
    defaultName: 'Sumar',
    color: '#e51c55'
  },
  {
    initials: ['IU-UPeC', 'IU-LV', 'I.U.', 'IU', 'PCE'],
    defaultName: 'Izquierda Unida',
    color: '#cf2e2e'
  },
  {
    initials: ['UPYD', 'UPyD'],
    defaultName: 'Izquierda Unida',
    color: '#d51c76'
  },
  {
    initials: ['EQUO'],
    defaultName: 'EQUO',
    color: '#419d3d'
  },
  {
    initials: ['EA'],
    defaultName: 'Eusko Alkartasuna',
    color: '#B50B12'
  },
  {
    initials: ['aralar'],
    defaultName: 'aralar',
    color: '#C20D0A'
  },
  {
    initials: ['IC-V'],
    defaultName: 'Iniciativa per Catalunya Verds',
    color: '#0A8F80'
  },
  {
    initials: ['HB'],
    defaultName: 'Herri Batasuna',
    color: '#FFA500'
  },
  {
    initials: ['CDS', 'C.D.S.'],
    defaultName: 'Centro Democrático Social',
    color: '#FFA500'
  },
  {
    initials: ['UCD'],
    defaultName: 'Unión de Centro Democrático',
    color: '#FF6914'
  },
  {
    initials: ['CD'],
    defaultName: 'Coalición Democrática',
    color: '#949A2C'
  },
  {
    initials: ['FEI', 'FE-I', 'FE (I)'],
    defaultName: 'FALANGE ESPAÑOLA INDEPENDIENTE',
    color: undefined
  },
  {
    initials: ['FEI', 'FE-I', 'FE (I)'],
    defaultName: 'FALANGE ESPAÑOLA INDEPENDIENTE',
    color: undefined
  },
  {
    initials: ['Ud Ca', 'Ud. Ca.', 'Ud.Ca'],
    defaultName: 'Unidad Castellana',
    color: undefined
  },
  {
    initials: [
      'L.I. (LIT-CI)',
      'LI (LIT-CI)',
      'LI-LITCI'
    ],
    defaultName: 'Lucha Internacionalista',
    color: undefined
  },
  {
    initials: ['PLIB'],
    defaultName: 'Partido Liberal',
    color: undefined
  },
  {
    initials: ['P-LIB'],
    defaultName: 'Partido Libertario',
    color: undefined
  },
  {
    initials: ['I.Fem', 'IFem'],
    defaultName: 'Iniciativa Feminista',
    color: undefined
  },
  {
    initials: ['D.N.', 'DN'],
    defaultName: 'Democracia Naciona',
    color: undefined
  },
  {
    initials: ['EU', 'E U'],
    defaultName: 'Extremadura Unida',
    color: undefined
  },
  {
    initials: ['EB', 'Eb'],
    defaultName: 'Escaños en Blanco',
    color: undefined
  },
  {
    initials: ['FA', 'F.A.'],
    defaultName: 'Falange Auténtica',
    color: undefined
  },
  {
    initials: ['F.Ast.'],
    defaultName: 'Falange Asturiana',
    color: undefined
  },
  {
    initials: ['CEX', 'CEx'],
    defaultName: 'Coalición Extremeña',
    color: undefined
  },
  {
    initials: ['AxSI', 'AxSÍ'],
    defaultName: 'ANDALUCÍA POR SÍ',
    color: undefined
  },
  {
    initials: ['EV-AV', 'E.V.-A.V'],
    defaultName: 'ELS VERDS-ALTERNATIVA VERDA',
    color: undefined
  },
  {
    initials: ['U.P.N.', 'UPN'],
    defaultName: 'Unión del Pueblo Navarro',
    color: undefined
  },
  {
    initials: ['FIA', 'F.I.A.'],
    defaultName: 'FEDERACION DE LOS INDEPENDIENTES DE ARAGON',
    color: undefined
  },
  {
    initials: ['I.M.C.', 'IMC'],
    defaultName: 'INICIATIVA MERINDADES DE CASTILLA',
    color: undefined
  },
  {
    initials: ['UPL', 'U.P.L.'],
    defaultName: 'Unión del Pueblo Leonés',
    color: undefined
  },
  {
    initials: ['AUN', 'A.u.N.'],
    defaultName: 'ALIANZA POR LA UNIDAD NACIONAL',
    color: undefined
  },
  {
    initials: ['PC', 'PCARL'],
    defaultName: 'Partido Carlista',
    color: undefined
  },
  {
    initials: ['P.Cant.'],
    defaultName: 'Partido Cantonalista',
    color: undefined
  },
  {
    initials: ['LV-CM', 'LVCM'],
    defaultName: 'LOS VERDES-COMUNIDAD DE MADRID',
    color: undefined
  },
  {
    initials: ['PCE (M-L)', 'PCE (M.L.)'],
    defaultName: 'PARTIDO COMUNISTA DE ESPAÑA (MARXISTA-LENINISTA)',
    color: undefined
  },
  {
    initials: ['NA-BAI', 'Na-Bai'],
    defaultName: 'NAFARROA BAI',
    color: undefined
  },
  {
    initials: ['PCPE', 'P.C.P.E.'],
    defaultName: 'PARTIDO COMUNISTA DE LOS PUEBLOS DE ESPAÑA',
    color: undefined
  },
  {
    initials: ['FEA', 'FE (A)'],
    defaultName: 'FALANGE ESPAÑOLA AUTÉNTICA',
    color: undefined
  },
  {
    initials: ['M.F.E.', 'MFE'],
    defaultName: 'MOVIMIENTO FALANGISTA DE ESPAÑA',
    color: undefined
  },
  {
    initials: ['+MAS+ ', '+MAS+'],
    defaultName: 'MUERTE AL SISTEMA',
    color: undefined
  },
  {
    initials: ['P.RIOJANO', 'P. RIOJANO'],
    defaultName: 'Partido Riojano',
    color: undefined
  },
  {
    initials: ['PPCr', 'PPCR'],
    defaultName: 'PARTIDO POSITIVISTA CRISTIANO',
    color: undefined
  },
  {
    initials: ['U.R.C.L.', 'URCL'],
    defaultName: 'UNIDAD REGIONALISTA DE CASTILLA Y LEON',
    color: undefined
  },
  {
    initials: ['P.R.C.', 'PRC'],
    defaultName: 'PARTIDO REGIONALISTA DE CANTABRIA',
    color: undefined
  },
  {
    initials: ['P.O.S.I.', 'POSI'],
    defaultName: 'PARTIDO OBRERO SOCIALISTA INTERNACIONALISTA',
    color: undefined
  },
  {
    initials: ['P.R.GU.', 'PRGU'],
    defaultName: 'PARTIDO REGIONALISTA DE GUADALAJARA',
    color: undefined
  },
  {
    initials: ['RECORTES CERO', 'RECORTES CE', 'RECORTES CERO-GRUPO VERDE', 'RECORTES CERO-GV'],
    defaultName: 'Recortes Cero',
    color: undefined
  }
]

export { provinces, elections, partiesStore }
