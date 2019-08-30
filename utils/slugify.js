const _ = require('lodash');

const slugify = (text) => _.kebabCase(text);

async function createUniqueSlug(Model, slug, count) {
  const user = await Model.findOne({ slug: `${slug}-${count}` });

  if (!user) {
    return `${slug}-${count}`;
  }

  return createUniqueSlug(Model, slug, count + 1);
}

async function generateSlug(Model, name, filter = {}) {
  const originalSlug = slugify(name);

  const exist = await Model.findOne(Object.assign({ slug: originalSlug }, filter), 'id');

  if (!exist) {
    return originalSlug;
  }

  return createUniqueSlug(Model, originalSlug, 1);
}

module.exports = generateSlug;
