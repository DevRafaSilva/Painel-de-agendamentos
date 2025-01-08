import HtmlAgendamento from './HtmlAgendamentos.js';
export default class getTarefa {
  constructor(dataHorario, dataBgEscuro) {
    this.horarioData = document.querySelectorAll(dataHorario);
    this.bgEscuro = document.querySelectorAll(dataBgEscuro);
    this.dadosHorario = '';
    this.desabilitarHorario = this.desabilitarHorario.bind(this);
  }

  async getApi() {
    try {
      const response = await fetch(
        `https://apiagendamento-34l5.onrender.com/registros`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const dados = await response.json();
      this.desabilitarHorario(dados);
      const dadosAgendados = new HtmlAgendamento(
        '[data-horario-manha]',
        '[data-horario-tarde]',
        '[data-horario-noite]',
        dados,
        '[data-input]',
        '[data-horarios-marcados]',
      );
      dadosAgendados.init();
    } catch (err) {
      console.log(err);
    }
  }
  desabilitarHorario(dados) {
    this.bgEscuro.forEach((item, index) => {
      dados.forEach((itemDados) => {
        if (this.horarioData[index].innerText === itemDados.horario) {
          item.classList.add('opacity-45');
        }
      });
    });
  }

  init() {
    this.getApi();
  }
}
