const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
        {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true, 
                autoIncrement: true,
                allowNull: false,
            },
        }, 
        {
            sequelize,
            timestamps: false,
            modelName: 'User',
            tableName: 'user_table',
            paranoid: false,
        });
    } 
    static associate(db) {
        db.User.hasMany(db.Map, { foreignKey: 'userId', sourceKey:'user_id', as:'maps'});
    }
};