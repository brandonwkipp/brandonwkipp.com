module.exports = function runMigration(migration) {
  const neighbor = migration.addContentType('neighbor');

  neighbor
    .name('Loud machine')
    .description('Who\'s an asshole? She is!');

  neighbor.createField('loudnessLevel')
    .type('Number')
    .name('loudness in dBA')
    .required(false);
};
