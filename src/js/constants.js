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
const oldColors = {
  0: { initials: 'PSOE', color: '#E02020' },
  1: { initials: 'PP', fill: '#23A1DD' },
  2: { initials: 'VOX', fill: '#66bf00' },
  3: { initials: 'UP', fill: '#723871' },
  4: { initials: 'Cs', fill: '#EA8046' },
  5: { initials: 'Más País', fill: '#27e1c3' },
  6: { initials: 'ERC', fill: '#FCB232' },
  7: { initials: 'JxCat', fill: '#314583' },
  8: { initials: 'PNV', fill: '#16823b' },
  9: { initials: 'Bildu', fill: '#a3ba5b' },
  10: { initials: 'CUP', fill: '#efd700' },
  12: { initials: 'Coalición Canaria', fill: '#ccba20' },
  13: { initials: 'Nueva Canarias', fill: '#80C03B' },
  14: { initials: 'NA+', fill: '#1C659C' },
  15: { initials: 'BNG', fill: '#94CCF7' },
  16: { initials: 'PRC', fill: '#AFB014' },
  17: { initials: '¡Teruel Existe!', fill: '#0D7251' },
  defaultColor: '#C6A15B'
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
    initials: ['Cs'],
    defaultName: 'Ciudadanos',
    color: '#FF4700'
  },
  {
    initials: [
      'PODEMOS-IU-EQUO',
      'PODEMOS-EU-MAREAS EN COMÚN-EQUO',
      'ECP-GUANYEM EL CANVI'
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
    initials: ['ERC-SOBIRANISTES'],
    defaultName: 'Esquerra Republicana',
    color: '#F7B93F'
  },
  {
    initials: ['JxCAT-JUNTS'],
    defaultName: 'Junts per Catalunya',
    color: '#EE5976'
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
    initials: ['COMPROMÍS'],
    defaultName: 'Compromís',
    color: '#D35427'
  },
  {
    initials: ['PRC'],
    defaultName: 'Partido Reginonalista de Cantabria',
    color: '#B9C714'
  },
  {
    initials: ['BNG'],
    defaultName: 'Bloque Nacionalista Galego',
    color: '#94CCF7'
  },
  {
    initials: '¡Teruel Existe!',
    defaultName: '¡Teruel Existe!',
    color: '#0D7251'
  }
]
export { provinces, partiesStore }
