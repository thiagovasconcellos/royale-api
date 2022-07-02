import Excel from 'exceljs';
import { resolve } from 'path';
import * as url from 'url';

async function generateClanReport(data) {
  try {
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const path = resolve(__dirname, 'out');
    console.log(path);
    const workbook = new Excel.Workbook();

    const worksheet = workbook.addWorksheet('Membros');

    worksheet.columns = [
      { header: 'Posição', key: 'clanRank' },
      { header: 'Tag', key: 'tag' },
      { header: 'Nome', key: 'name' },
      { header: 'Role', key: 'role' },
      { header: 'Level', key: 'expLevel' },
      { header: 'Troféus', key: 'trophies' },
      { header: 'Doações', key: 'donations' },
      { header: 'Recebidas', key: 'donationsReceived' },
      { header: 'Saldo', key: 'balance' },
      { header: 'Visto', key: 'lastSeenFormatted' },
      { header: 'Arena', key: 'arenaName' },
    ];

    worksheet.autoFilter = 'A1:J1';

    const promise = data.map(async row => {
      await worksheet.addRow(row);
    });
    await Promise.all(promise);

    const roleCol = worksheet.getColumn('role');
    const balanceCol = worksheet.getColumn('balance');
    const lastSeenCol = worksheet.getColumn('lastSeenFormatted');

    roleCol.eachCell(cell => {
      if (cell.text === 'elder') {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '75aaff' },
        };
      }
      if (cell.text === 'coLeader') {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'f2e602' },
        };
      }
      if (cell.text === 'leader') {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ffa500' },
        };
      }
    });

    balanceCol.eachCell(cell => {
      if (Number(cell.text) <= 0) {
        cell.font = { color: { argb: 'e00000' }, bold: true };
      }
    });

    lastSeenCol.eachCell(cell => {
      if (cell.text.includes('dias')) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ff1919' },
        };
        cell.font = { color: { argb: 'ffffff' }, bold: true };
      }
    });

    await workbook.xlsx.writeFile(`${path}/report.xlsx`);

    return workbook;
  } catch (error) {
    return error;
  }
}

export { generateClanReport };
