module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define("Topic", {
    // Giving the Topic model a name of type STRING
    name: DataTypes.STRING,
    topicURL: DataTypes.TEXT,
    category: DataTypes.STRING
  },

    // Here we'll pass a second "classMethods" object into the define method
    // This is for any additional configuration we want to give our models
    {
      // We're saying that we want our Topic to have Items
      classMethods: {
        associate: function(models) {
          // Associating Topic with Items
          // When an Topic is deleted, also delete any associated Items
          Topic.hasMany(models.Item, {
            onDelete: "cascade"
          });
        }
      }
    }
  );
  return Topic;
};
