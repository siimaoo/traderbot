import axios from 'axios';
import cron from 'node-cron';
import { GenerateMessage } from '../utils/GenerateMessage';

export class GetStockPrice {
  constructor(
    private ativos: Array<string>,
    private generateMessage = new GenerateMessage(),
  ) {}

  public async execute() {
    console.log('Create job to get stock price: success');

    cron.schedule('0,20,40 10,17 * * 1-5', () => {
      let content = [];
      let promises = [];
      for (let ativo of this.ativos) {
        promises.push(
          axios
            .get(`${process.env.HGBRASIL_BASE_URL}${ativo}`)
            .then(({ data }) => {
              let obj = {
                name: data.results[ativo].symbol,
                value: `Valor: ${data.results[ativo].price} \n Variação: ${data.results[ativo].change_percent}% \n Atualizado em: ${data.results[ativo].updated_at}`,
              };

              content.push(obj);
            })
            .catch(e => {
              console.log(e);
            }),
        );
      }

      Promise.all(promises).then(() => {
        if (content.length > 0) {
          this.generateMessage.execute(
            '#0099ff',
            'Hora da atualização! \n Confira os dados dos ativos que me pediram pra olhar:',
            content,
          );
        }
      });
    }, { timezone: 'America/Sao_Paulo'});
  }
}
