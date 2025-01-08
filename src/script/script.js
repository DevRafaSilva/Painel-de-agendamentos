import postAgendamento from '../script/postAgendamento.js';
import getTarefa from '../script/getAgendamento.js';
import HtmlAgendamento from './HtmlAgendamentos.js';
import transformarDataAgendamento from './transformarDataAgendamento.js';

const agendamentoPost = new postAgendamento(
  '[data-horario]',
  '[data-input]',
  '[data-enviar]',
  '[data-nome-cliente]',
  '[data-span-erro]',
  '[data-horario-desabilitado] > li',
);
agendamentoPost.init();

const agendamento = new getTarefa(
  '[data-horario]',
  '[data-horario-desabilitado] > li',
);
agendamento.init();

const htmlAgendar = new HtmlAgendamento(
  '[data-horario-manha]',
  '[data-horario-tarde]',
  '[data-horario-noite]',
);

htmlAgendar.init();

const tranformarData = new transformarDataAgendamento('[data-input]');
tranformarData.init();
