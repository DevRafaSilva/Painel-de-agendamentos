import transformarDataAgendamento from './transformarDataAgendamento.js';
export default class HtmlAgendamento {
  constructor(
    horarioManha,
    horarioTarde,
    horarioNoite,
    dados,
    dataInput,
    dataInputFiltar,
  ) {
    this.horarioParaFiltrar = null;
    this.horarioManhaPegar = [];
    this.horarioTardePegar = [];
    this.horarioNoitePegar = [];
    this.horarioManhaHtml = document.querySelector(horarioManha);
    this.horarioTardeHtml = document.querySelector(horarioTarde);
    this.horarioNoiteHtml = document.querySelector(horarioNoite);
    this.dataInput = document.querySelector(dataInput);
    this.dataInoutFiltrar = document.querySelector(dataInputFiltar);
    this.dados = dados;
    this.concatenarData = '';
  }

  filtrarHorarios() {
    if (this.dados !== undefined) {
      const horarioTransformado = this.dados.map((dados) => {
        return {
          dadosHorario: +dados.horario.replace(':', '.'),
          dadosArray: dados,
        };
      });

      const horarioManha = horarioTransformado.filter((dados) => {
        return dados.dadosHorario >= 9 && dados.dadosHorario <= 12;
      });

      this.horarioManhaPegar = horarioManha;

      const horarioTarde = horarioTransformado.filter((dados) => {
        return dados.dadosHorario >= 13 && dados.dadosHorario <= 18;
      });
      this.horarioTardePegar = horarioTarde;
      const horarioNoite = horarioTransformado.filter((dados) => {
        return dados.dadosHorario >= 19 && dados.dadosHorario <= 21;
      });
      this.horarioNoitePegar = horarioNoite;
    }
  }
  filtrarHorarioPorData() {
    const tranformarData = new transformarDataAgendamento('[data-input]');
    tranformarData.init();
  }

  filtrarHorarioMarcado() {
    const tranformarData = new transformarDataAgendamento(
      '[data-horarios-marcados]',
    );
    tranformarData.init();
    this.horarioParaFiltrar = tranformarData.transformarData();
    this.concatenarDataFormatada();
  }

  concatenarDataFormatada() {
    let { numeroDia, numeroMes, anoAtual } = this.horarioParaFiltrar;
    this.concatenarData = numeroDia + ' ' + numeroMes + ' ' + anoAtual;
  }

  colocarNoHtmlAgendamento(elementoAppend, horarioAgendamento) {
    let horarioFiltrada = horarioAgendamento.filter(({ dadosArray }) => {
      return dadosArray.data === this.concatenarData;
    });
    elementoAppend.innerHTML = '';
    horarioFiltrada.forEach(({ dadosArray }) => {
      let criarDiv = document.createElement('div');
      criarDiv.innerHTML = '';
      criarDiv.classList.add(
        'py-2',
        'px-6',
        'border-b',
        'border-b-[#2E2C30]',
        'text-[#f5f5f7]',
        'flex',
        'justify-between',
      );

      criarDiv.innerHTML = `
      
      <h1>${dadosArray.nome}</h1>
      <p class="text-[#3E3C41]">${dadosArray.horario} h</p>

      `;
      elementoAppend.appendChild(criarDiv);
    });
  }

  iniciariHtmlDoAgendamento() {
    this.colocarNoHtmlAgendamento(
      this.horarioManhaHtml,
      this.horarioManhaPegar,
    );
    this.colocarNoHtmlAgendamento(
      this.horarioNoiteHtml,
      this.horarioNoitePegar,
    );
    this.colocarNoHtmlAgendamento(
      this.horarioTardeHtml,
      this.horarioTardePegar,
    );
  }

  init() {
    if (this.dataInput !== null) {
      this.dataInput.addEventListener('change', () => {
        this.filtrarHorarioPorData();
      });
    }
    if (this.dataInoutFiltrar !== null) {
      this.dataInoutFiltrar.addEventListener('change', () => {
        this.filtrarHorarioMarcado();
        this.filtrarHorarios();
        this.iniciariHtmlDoAgendamento();
        this.concatenarDataFormatada();
      });
    }
  }
}
