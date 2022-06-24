/**
 *
 * @param {array} privateProperties
 * @param {array} inputArray
 * @returns {array} array of objects with private properties removed
 */

exports.stripPrivateProperties = (privateProperties, inputArray) =>
  inputArray.map(obj =>
    Object.fromEntries(
      Object.entries(obj).filter(entry => !privateProperties.includes(entry[0]))
    )
  );

/**
 *
 * @param {string} inputProperty - key to be used to filter data
 * @param {array} inputArray - array of objects
 * @returns {array} - array of objects with inputProperty removed
 */

exports.excludeByProperty = (inputProperty, inputArray) =>
  inputArray.filter(obj => !obj.hasOwnProperty(inputProperty));
/**
 *
 * @param {array} inputArray - array of objects
 * @returns {array} sum of objects field values in inputArray
 */
exports.sumDeep = inputArray =>
  inputArray.map(({ objects }) => ({
    objects: objects.reduce((acc, { val }) => acc + val, 0)
  }));
/**
 *
 * @param {array} colors - array of colors
 * @param {array} statuses - array of status
 * @returns {array} - array of objects with color and status
 */
exports.applyStatusColor = (colors, listStatus) => {
  return listStatus.filter(status => {
    for (let color in colors) {
      if (colors[color].includes(status.status)) {
        status.color = color;
        return true;
      }
    }
    return false;
  });
};
/**
 *
 * @param {function} func - function to be called
 * @param {string} message - message to be displayed
 * @returns {function}
 */
exports.createGreeting = (func, message) => userName => func(message, userName);

/**
 *
 * @param {object} defaultProperties - default properties to be added to the object
 * @returns {object} - object with default properties
 */
exports.setDefaults = (defaultProperties = {}) => (data = {}) => ({
  ...defaultProperties,
  ...data
});
/**
 *
 * @param {string} userName
 * @param {object} fetchService - object with fetchService {fetchCompanyById: function,
 *  fetchStatus: function, fetchUsers: function}
 * @returns {object} - object with company, status and users
 */
exports.fetchUserByNameAndUsersCompany = async (userName, fetchService) => {
  try {
    const { fetchCompanyById, fetchStatus, fetchUsers } = fetchService;
    const [users, status] = await Promise.all([fetchUsers(), fetchStatus()]);
    const foundUser = users.find(user => user.name === userName);
    const company = await fetchCompanyById(foundUser.companyId);
    return {
      company,
      status: status,
      user: foundUser
    };
  } catch (error) {
    throw error;
  }
};
