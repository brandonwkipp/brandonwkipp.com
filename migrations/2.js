module.exports = function runMigration(migration) {
  const dog = migration.createContentType('dog');

  dog
    .name('Friendly dog')
    .description('Who\'s a good boy? He is!');

  dog.createField('goodboys')
    .type('Number')
    .name('number of times he has been called a good boy')
    .required(false);
};
