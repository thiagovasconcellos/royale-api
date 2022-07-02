import 'dotenv/config';
import { formateDate } from './helpers/formatDate.js';
import { generateClanReport } from './reports/generateClanReport.js';

import { getClanByTag } from './services/getClanByTag.js';


(async () => {
  const { CLAN_TAG } = process.env;
  const clan = await getClanByTag(CLAN_TAG);

  for (const member of clan.memberList) {
    member.lastSeenFormatted = formateDate(member.lastSeen);
    member.balance = (member.donations - member.donationsReceived);
    member.arenaName = member.arena.name;
  }

  const generated = await generateClanReport(clan.memberList);
  console.log(`finish: ${generated}`);
})()