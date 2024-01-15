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
  }
]
const oldColors = {
  13: { initials: 'Nueva Canarias', fill: '#80C03B' }
}
const partiesStore = [
  {
    initials: ['PSOE'],
    defaultName: 'Partido Socialista Obrero Español',
    color: '#E43D32'
  },
  {
    initials: ['PP'],
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
    initials: ['CDC', 'DL', 'CiU'],
    defaultName: 'Convergencia / Convergencia i Unió',
    color: '#282968'
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
    initials: ['COMPROMÍS 2019', 'MÉS COMPROMÍS'],
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
    initials: ['IU-UPeC', 'IU-LV'],
    defaultName: 'Izquierda Unida',
    color: '#cf2e2e'
  },
  {
    initials: ['UPYD', 'UPyD'],
    defaultName: 'Izquierda Unida',
    color: '#d51c76'
  }
]
export { provinces, elections, partiesStore }
