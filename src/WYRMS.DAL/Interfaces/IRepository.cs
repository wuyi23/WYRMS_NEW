using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq.Expressions;
using WYRMS.Domain.Model;

namespace WYRMS.DAL.Interfaces
{
    /// <summary>
    /// 仓储类接口，用于将多次增删改，一次性提交到数据库，线程内唯一
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IRepository<T> where T : class ,new()
    {
        #region DbSet<T>
        DbSet<T> Entities { get; }
        #endregion

        #region 查询
        /// <summary>
        /// 根据条件查找对象
        /// </summary>
        /// <param name="wh">where表达式</param>
        /// <returns>返回实体或默认值</returns>
        T FirstOrDefault(Expression<Func<T, bool>> wh);

        /// <summary>
        /// 是否存在满足条件的对象，满足返回true，否则为false
        /// </summary>
        /// <param name="wh"></param>
        /// <returns></returns>
        bool Exist(Expression<Func<T, bool>> wh);

        /// <summary>
        /// 返回所有实体列表总数
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <returns></returns>
        int LoadEntitiesCount(Expression<Func<T, bool>> whereLambda); 
        #endregion

        #region 删除
        /// <summary>
        /// 删除实体对象
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="isSaveChanges"></param>
        /// <returns></returns>
        int Delete(T entity, bool isSaveChanges = true);

        /// <summary>
        ///    删除所有符合特定表达式的数据(默认自动执行savechanges)（EntityFramework.Extensions扩展））,用法详见https://github.com/loresoft/EntityFramework.Extended
        /// </summary>
        /// <param name="predicate"> 查询条件谓语表达式 </param>
        /// <returns> 操作影响的行数 </returns>
        int Delete(Expression<Func<T, bool>> predicate);

        /// <summary>
        ///     删除实体记录集合
        /// </summary>
        /// <param name="entities"> 实体记录集合 </param>
        /// <param name="isSaveChanges"></param>
        /// <returns> 操作影响的行数 </returns>
        int Delete(IEnumerable<T> entities, bool isSaveChanges = true);
        #endregion

        #region 新增
        /// <summary>
        ///   插入实体记录
        /// </summary>
        /// <param name="entity"> 实体对象 </param>
        /// <param name="isSaveChanges"></param>
        /// <returns> 操作影响的行数 </returns>
        int Add(T entity, bool isSaveChanges = true);

        /// <summary>
        ///  批量插入实体记录集合
        /// </summary>
        /// <param name="entities"> 实体记录集合 </param>
        /// <param name="isSaveChanges"></param>
        /// <returns> 操作影响的行数 </returns>
        int AddRange(IEnumerable<T> entities, bool isSaveChanges = true);
        #endregion

        #region 更新
        /// <summary>
        ///  更新实体记录
        /// </summary>
        /// <param name="entity"> 实体对象 </param>
        /// <param name="isSaveChanges"></param>
        /// <returns> 操作影响的行数 </returns>
        int Update(T entity, bool isSaveChanges = true);

        /// <summary>
        /// （扩展）修改所有符合特定表达式的数据,默认自动执行savechanges（EntityFramework.Extensions扩展）,用法详见https://github.com/loresoft/EntityFramework.Extended
        /// </summary>
        /// <param name="whereLambda">查询条件谓语表达式</param>
        /// <param name="updateLambda">需要修改的字段谓词表达式</param>
        /// <returns>操作影响的行数</returns>
        int Update(Expression<Func<T, bool>> whereLambda, Expression<Func<T, T>> updateLambda); 
        #endregion

        #region ToList
        /// <summary>
        /// 返回所有实体（不带排序）
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <returns></returns>
        List<T> ToList(Expression<Func<T, bool>> whereLambda);

        /// <summary>
        /// 返回所有实体（带排序，默认升序）
        /// </summary>
        /// <typeparam name="TS">排序字段类型</typeparam>
        /// <param name="whereLambda"></param>
        /// <param name="orderByLambda"></param>
        /// <param name="isAsc">是否为升序(默认为升序)</param>
        /// <returns></returns>
        List<T> ToList<TS>(Expression<Func<T, bool>> whereLambda, Expression<Func<T, TS>> orderByLambda, bool isAsc = true);
        #endregion

        #region ToListEx
        /// <summary>
        /// 按条件返回实体部分字段列表
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        List<TResult> ToListEx<TResult>(Expression<Func<T, bool>> whereLambda,
            Expression<Func<T, TResult>> selector);

        /// <summary>
        /// 返回实体部分字段列表
        /// </summary>
        /// <param name="selector"></param>
        /// <returns></returns>
        List<TResult> ToListEx<TResult>(
            Expression<Func<T, TResult>> selector);

        /// <summary>
        /// 返回实体部分字段列表(带排序)
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <param name="selector"></param>
        /// <param name="orderByLambda"></param>
        /// <param name="isAsc">是否为升序(默认为升序)</param>
        /// <returns></returns>
        List<TResult> ToListEx<TResult, TS>(Expression<Func<T, bool>> whereLambda,
            Expression<Func<T, TResult>> selector, Expression<Func<T, TS>> orderByLambda, bool isAsc = true); 
        #endregion

        #region 分页查询
        /// <summary>
        /// 实现对数据的分页查询
        /// </summary>
        /// <typeparam name="TS">排序字段类型</typeparam>
        /// <param name="offset">越过条数</param>
        /// <param name="pageSize">每页行数</param>
        /// <param name="total">总行数</param>
        /// <param name="whereLambda"></param>
        /// <param name="orderByLambda"></param>
        /// <param name="isAsc">是否升序(默认为升序)</param>
        /// <returns></returns>
        List<T> ToPageList<TS>(int offset, int pageSize, out  int total, Expression<Func<T, bool>> whereLambda, Expression<Func<T, TS>> orderByLambda, bool isAsc = true);

        /// <summary>
        /// 实现对数据的分页查询
        /// </summary>
        /// <typeparam name="TS">排序字段类型</typeparam>
        /// <typeparam name="TSt">排序字段类型</typeparam>
        /// <param name="offset">越过条数</param>
        /// <param name="pageSize">每页行数</param>
        /// <param name="total">总行数</param>
        /// <param name="whereLambda"></param>
        /// <param name="orderByLambda"></param>
        /// <param name="thenByLambda"></param>
        /// <param name="isAscOrderBy">orderby是否升序(默认为升序)</param>
        /// <param name="isAscThenBy">thenby是否升序(默认为升序)</param>
        /// <returns></returns>
        List<T> ToPageList<TS, TSt>(int offset, int pageSize, out  int total, Expression<Func<T, bool>> whereLambda, Expression<Func<T, TS>> orderByLambda, Expression<Func<T, TSt>> thenByLambda, bool isAscOrderBy = true, bool isAscThenBy = true);
        
        #endregion
    }
}
