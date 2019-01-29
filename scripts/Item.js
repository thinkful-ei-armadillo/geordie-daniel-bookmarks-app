'use strict';

const Item = (function () {
  const create = function(title, url, desc, rating) {
    return {
      id: cuid(),
      title,
      url,
      desc,
      rating
    };
  };

  return {
    create
  };

}());