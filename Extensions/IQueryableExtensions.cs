using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace vega11.Extensions {
    public static class IQueryableExtensions {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, IQueryObject queryObj, Dictionary<string, Expression<Func<T, object>>> columnsMap) {
            if (!String.IsNullOrWhiteSpace(queryObj.SortBy) && columnsMap.ContainsKey(queryObj.SortBy)) {
                if (queryObj.IsSortAscending)
                    return query.OrderBy(columnsMap[queryObj.SortBy]);
                else
                    return query.OrderByDescending(columnsMap[queryObj.SortBy]);
            } else {
                return query;
            }
        }
    }
}