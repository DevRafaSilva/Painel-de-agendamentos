import getTarefa from './getAgendamento.js';
import HtmlAgendamento from './HtmlAgendamentos.js';
import transformarDataAgendamento from './transformarDataAgendamento.js';
export default class agendamento {
  constructor(
    horario,
    dataInput,
    dataEnviar,
    nomeCliente,
    dataErroSpan,
    horarioMarcado,
  ) {
    this.horarioData = document.querySelectorAll(horario);
    this.dataInput = document.querySelector(dataInput);
    this.dataEnviar = document.querySelector(dataEnviar);
    this.dataInputNome = document.querySelector(nomeCliente);
    this.dataInputNome = document.querySelector(nomeCliente);
    this.dataErroSpan = document.querySelector(dataErroSpan);
    this.verificarHorario = document.querySelectorAll(horarioMarcado);
    this.pegarHorario = this.pegarHorario.bind(this);
    this.horario = '';
    this.dados = [];
    this.horarioDisponivel = false;
  }

  pegarDataFormatada() {
    const dataFormatada = new transformarDataAgendamento('[data-input]');
    dataFormatada.init();
    let { numeroDia, numeroMes, anoAtual } = dataFormatada.transformarData();
    this.compararData(numeroDia, numeroMes, anoAtual);
  }

  verificarHorarioDisponivel() {
    this.verificarHorario.forEach((item) => {
      item.addEventListener('click', () => {
        return (this.horarioDisponivel = item.classList.contains('opacity-45'));
      });
    });
  }

  compararData(numeroDia, numeroMes, ano) {
    const dataHoje = new Date();
    const diaHoje = dataHoje.getDate();
    const mesHoje = dataHoje.getMonth() + 1;
    const anoAtual = dataHoje.getFullYear();

    const verificarDiaHoje = numeroDia >= diaHoje;
    const verificarAnoAtual = ano >= anoAtual;
    const verificarMes = numeroMes >= mesHoje;

    if (
      this.horarioDisponivel == false &&
      verificarAnoAtual &&
      verificarDiaHoje &&
      verificarMes &&
      !!this.dataInputNome.value
    ) {
      this.dataErroSpan.classList.add('hidden');
      this.criarObjetoParaDados(numeroDia, numeroMes, ano);
    } else {
      this.dataErroSpan.classList.remove('hidden');
    }
  }

  horarioAtivo() {
    this.horarioData.forEach((itemClick) => {
      itemClick.addEventListener('click', () => {
        this.horarioData.forEach((itemAdd) => {
          itemAdd.classList.remove('border', 'border-[#B8952E]');
        });
        itemClick.classList.add('border', 'border-[#B8952E]');
      });
    });
  }

  pegarHorario() {
    this.horarioData.forEach((item) => {
      item.addEventListener('click', () => {
        this.horario = item.dataset.horario;
      });
    });
  }

  criarObjetoParaDados(numeroDia, numeroMes, ano) {
    const dataFormatada = numeroDia + ' ' + numeroMes + ' ' + ano;
    const objDados = {
      nome: this.dataInputNome.value,
      data: dataFormatada,
      horario: this.horario,
    };
    this.postApi(objDados);
  }

  async postApi(objDados) {
    try {
      const response = await fetch(
        `https://apiagendamento-34l5.onrender.com/registros`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objDados),
        },
      );
      const dados = await response.json();
      if (response.ok) {
        console.log('olá');
        let init = new getTarefa(
          '[data-horario]',
          '[data-horario-desabilitado] > li',
        );

        init.init();
      }
    } catch (err) {
      console.log(err);
    }
  }

  init() {
    this.dataEnviar.addEventListener('click', () => {
      this.pegarDataFormatada();
    });
    this.pegarHorario();
    this.horarioAtivo();
    this.verificarHorarioDisponivel();
  }
}
