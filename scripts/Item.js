'use strict';
/* global cuid */

const Item = (function () {
  const create = function(title, url, desc, rating) {
    return {
      id: cuid(),
      title,
      url,
      desc,
      rating,
      hidden: false
    };
  };

  return {
    create
  };

}());