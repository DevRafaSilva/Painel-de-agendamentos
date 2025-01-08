export default class transformarDataAgendamento {
  constructor(dataMarcar) {
    this.dataInput = document.querySelector(dataMarcar);
  }

  transformarData() {
    let diaInput = this.dataInput.value.substr(8, 8);
    let mesInput = this.dataInput.value
      .substr(4, 4)
      .replace('-', '')
      .replace('0', '');
    let anoInput = this.dataInput.value.substr(0, 4);

    let formatarMes = mesInput.replace('-', '');
    let numeroMes = formatarMes;
    let numeroDia = diaInput;
    let anoAtual = anoInput;
    return {
      numeroDia,
      numeroMes,
      anoAtual,
    };
  }

  init() {
    if (this.dataInput !== null) {
      this.dataInput.addEventListener('change', () => {
        this.transformarData();
      });
    }
  }
}
