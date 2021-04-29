module.exports = {
  generateResourceTags: (tags) => {
    return new TagsGenerator()
        .addTag('mon:feature', tags.featureName)
        .addTag('mon:team', tags.teamName)
        .addTag('mon:application', tags.applicationName)
        .addTag('mon:module', tags.moduleName)
        .toString();
  },
};

class TagsGenerator {
  constructor() {
    this.tags = [];
  }

  addTag(tagName, tagValue) {
    if (tagValue) {
      this.tags.push(`Key=${tagName},Value=${tagValue}`);
      return this;
    } else {
      throw new Error(`Invalid value for tag ${tagName}`);
    }
  }

  toString() {
    return this.tags.join(',');
  }
}
