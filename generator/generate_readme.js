import fs from 'fs';
import data from '../data.json';

const table = (data) => {
  return data.map(row).join('\n');
}

const row = (rowData) => {
  return `| **${rowData.name}** | ${ community(rowData.community) } | ${rowData.description || ''} | ${ links(rowData.links) } | ${rowData.comments || ''} |`;
}

const link = (name, url) => {
  if (url) return `${name}: ${url}`
  return ''
}

const links = (list) => {
  return [
    link('Gitter', list.gitter),
    link('Slack', list.slack),
    link('Skype', list.skype),
    link('Telegram', list.telegram),
    link('Other', list.other)
  ].filter( x => x.length > 0 ).join('<br>')
}

const community = comm => {
  if (!comm) return ''
  if (!comm.icon) return `[${comm.name}](${comm.link})`
  else return `[![${comm.name}](${comm.icon})](${comm.link}) [${comm.name}](${comm.link})`
}

const content = `Это - список русскоязычных чатов об IT.

![Teaser](teaser.jpg)

Общие правила
-------------

* не используйте список для найма сотрудников
* спам с предложениями работы запрещён (\`перспективная-компания-лидер-рынка ишет 5 лет super senior swift developer\`)
* используйте теги типа \`@question\` \`@link\`  \`@offtop\`
* почему так много чатов называются \`<тема>-UA\`? Читайте об этом [здесь](https://gist.github.com/listochkin/c81c198a2b7b044a0dc5).

Как помочь?
-----------
*Мы принимаем Pull Request'ы!*

Если вы знаете русскоязычный чат на IT-тематику, то добавьте ссылку и описание в файл \`data.json\`.

Список
------

| Название             | Коммьюнити | Технологии                      |   URL   | Правила участия |
|--------------------- | ---------- | ------------------------------- | ------- |       :-:       |
${table(data)}
`

console.log('>>> Generating README.md <<<')
fs.writeFileSync('../README.md', content);
console.log('>>> 🏁 Done generating README.md <<<')

