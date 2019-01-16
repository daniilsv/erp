export const state = () => ({});

export const mutations = {};
export const getters = {};

export const actions = {
  create({ commit }, { socket, item, notify }) {
    if (item.responsible instanceof Object)
      item.responsible = item.responsible.value;
    else item.responsible = null;

    if (item.performer instanceof Array)
      item.performer = item.performer
        .map(_ => (_ instanceof Object ? _.value : null))
        .filter(_ => _ !== null);

    if (item.observer instanceof Array)
      item.observer = item.observer
        .map(_ => (_ instanceof Object ? _.value : null))
        .filter(_ => _ !== null);

    return new Promise(function(success, reject) {
      socket.emit(
        "content.create",
        { content: item, notify: notify || false }, //
        function(response) {
          if (response.error !== undefined) return reject(response.error);
          if (response.success) success(response.success);
        }
      );
    });
  },
  read({ commit }, { socket, id }) {
    return new Promise(function(success, reject) {
      socket.emit(
        "content.read",
        { id: id }, //
        function(response) {
          if (response.error !== undefined) return reject(response.error);
          success(response.success);
        }
      );
    });
  },
  update({ commit }, { socket, old, item, notify }) {
    if (item.responsible instanceof Object)
      item.responsible = item.responsible.value;
    else item.responsible = null;

    if (item.performer instanceof Array)
      item.performer = item.performer
        .map(_ => (_ instanceof Object ? _.value : null))
        .filter(_ => _ !== null);

    if (item.observer instanceof Array)
      item.observer = item.observer
        .map(_ => (_ instanceof Object ? _.value : null))
        .filter(_ => _ !== null);

    item = Object.filter(
      item,
      (k, v) => JSON.stringify(v) !== JSON.stringify(old[k])
    );
    return new Promise(function(success, reject) {
      socket.emit(
        "content.update",
        { id: old._id, content: item, notify: notify || false }, //
        function(response) {
          if (response.error !== undefined) return reject(response.error);
          if (response.success) success(response.success);
        }
      );
    });
  },
  delete({ commit }, { socket, id }) {
    return new Promise(function(success, reject) {
      socket.emit(
        "content.delete",
        { id: id, notify: true }, //
        function(response) {
          if (response.error !== undefined) return reject(response.error);
          if (response.success) success(response.success);
        }
      );
    });
  }
};
