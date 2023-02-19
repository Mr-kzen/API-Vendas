//interface para conexão e envio do email já em operação

interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'contato@aluiziodeveloper.cf', //email criado em Amazon AWS
      name: 'Jorge Alizio',
    },
  },
} as IMailConfig;
