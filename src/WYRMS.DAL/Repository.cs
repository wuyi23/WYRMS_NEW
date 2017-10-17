using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using EntityFramework.Extensions;
using WYRMS.DAL.Interfaces;
using WYRMS.Domain.Model;


namespace WYRMS.DAL
{
    /// <summary>
    /// 数据访问仓储类
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Repository<T> : IRepository<T> where T : class,new()
    {
        #region 构造函数注入
        private readonly SysEntities _ctx;

        public Repository(SysEntities dbContext)
        {
            _ctx = dbContext;
        }
        #endregion

        public DbSet<T> Entities
        {
            get { return _ctx.Set<T>(); }
        }

        #region 查询

        /// <summary>
        /// 根据条件查找对象
        /// </summary>
        /// <param name="wh">where表达式</param>
        /// <returns>返回实体或默认值</returns>
        public T FirstOrDefault(Expression<Func<T, bool>> wh)
        {
            return _ctx.Set<T>().FirstOrDefault(wh);
        }

        /// <summary>
        /// 是否存在满足条件的对象，满足返回true，否则为false
        /// </summary>
        /// <param name="wh"></param>
        /// <returns></returns>
        public bool Exist(Expression<Func<T, bool>> wh)
        {
            return _ctx.Set<T>().Any(wh);
        }

        /// <summary>
        /// 返回所有实体列表总数
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <returns></returns>
        public int LoadEntitiesCount(Expression<Func<T, bool>> whereLambda)
        {
            return _ctx.Set<T>().Where<T>(whereLambda).Count();
        }
        #endregion

        #region 删除

        /// <summary>
        /// 删除实体对象
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="isSaveChanges"></param>
        /// <returns></returns>
        public int Delete(T entity, bool isSaveChanges = true)
        {
            _ctx.Entry(entity).State = EntityState.Deleted;
            return IsSaveChanges(isSaveChanges);
        }

        /// <summary>
        ///    删除所有符合特定表达式的数据(默认自动执行savechanges)（EntityFramework.Extensions扩展））,用法详见https://github.com/loresoft/EntityFramework.Extended
        /// </summary>
        /// <param name="predicate"> 查询条件谓语表达式 </param>
        /// <returns> 操作影响的行数 </returns>
        public int Delete(Expression<Func<T, bool>> predicate)
        {
            return _ctx.Set<T>().Where(predicate).Delete();
        }

        /// <summary>
        ///     删除实体记录集合
        /// </summary>
        /// <param name="entities"> 实体记录集合 </param>
        /// <returns> 操作影响的行数 </returns>
        public int Delete(IEnumerable<T> entities, bool isSaveChanges = true)
        {
            _ctx.Set<T>().RemoveRange(entities);
            return IsSaveChanges(isSaveChanges);
        }
        #endregion

        #region 新增

        /// <summary>
        ///   插入实体记录
        /// </summary>
        /// <param name="entity"> 实体对象 </param>
        /// <param name="isSaveChanges"></param>
        /// <returns> 操作影响的行数 </returns>
        public int Add(T entity, bool isSaveChanges = true)
        {
            _ctx.Set<T>().Add(entity);
            return IsSaveChanges(isSaveChanges);
        }

        /// <summary>
        ///  批量插入实体记录集合
        /// </summary>
        /// <param name="entities"> 实体记录集合 </param>
        /// <param name="isSaveChanges"></param>
        /// <returns> 操作影响的行数 </returns>
        public int AddRange(IEnumerable<T> entities, bool isSaveChanges = true)
        {
            _ctx.Set<T>().AddRange(entities);
            return IsSaveChanges(isSaveChanges);
        }
        #endregion

        #region 更新

        /// <summary>
        ///     更新实体记录
        /// </summary>
        /// <param name="entity"> 实体对象 </param>
        /// <param name="isSaveChanges"></param>
        /// <returns> 操作影响的行数 </returns>
        public int Update(T entity, bool isSaveChanges = true)
        {
            _ctx.Entry(entity).State = EntityState.Modified;
            return IsSaveChanges(isSaveChanges);
        }

        /// <summary>
        /// （扩展）修改所有符合特定表达式的数据,默认自动执行savechanges（EntityFramework.Extensions扩展）,用法详见https://github.com/loresoft/EntityFramework.Extended
        /// </summary>
        /// <param name="whereLambda">查询条件谓语表达式</param>
        /// <param name="updateLambda">需要修改的字段谓词表达式</param>
        /// <returns>操作影响的行数</returns>
        public int Update(Expression<Func<T, bool>> whereLambda, Expression<Func<T, T>> updateLambda)
        {
            return _ctx.Set<T>().Where(whereLambda).Update(updateLambda);
        }
        #endregion

        #region ToList
        /// <summary>
        /// 返回所有实体（不带排序）
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <returns></returns>
        public List<T> ToList(Expression<Func<T, bool>> whereLambda)
        {
            return _ctx.Set<T>().Where<T>(whereLambda).ToList();
        }

        /// <summary>
        /// 返回所有实体（带排序，默认升序）
        /// </summary>
        /// <typeparam name="TS">排序字段类型</typeparam>
        /// <param name="whereLambda"></param>
        /// <param name="orderByLambda"></param>
        /// <param name="isAsc">是否为升序(默认为升序)</param>
        /// <returns></returns>
        public List<T> ToList<TS>(Expression<Func<T, bool>> whereLambda, Expression<Func<T, TS>> orderByLambda, bool isAsc = true)
        {
            if (isAsc)
            {
                return _ctx.Set<T>().Where<T>(whereLambda).OrderBy<T, TS>(orderByLambda).ToList();
            }
            return _ctx.Set<T>().Where<T>(whereLambda).OrderByDescending<T, TS>(orderByLambda).ToList();
        }
        #endregion

        #region ToListEx
        /// <summary>
        /// 返回实体部分字段列表
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <param name="selector"></param>
        /// <returns></returns>
        public List<TResult> ToListEx<TResult>(Expression<Func<T, bool>> whereLambda, Expression<Func<T, TResult>> selector)
        {
            return _ctx.Set<T>().Where<T>(whereLambda).Select(selector).ToList();
        }

        /// <summary>
        /// 返回实体部分字段列表(带排序)
        /// </summary>
        /// <param name="whereLambda"></param>
        /// <param name="selector"></param>
        /// <param name="orderByLambda"></param>
        /// <param name="isAsc">是否为升序(默认为升序)</param>
        /// <returns></returns>
        public List<TResult> ToListEx<TResult, TS>(Expression<Func<T, bool>> whereLambda, Expression<Func<T, TResult>> selector, Expression<Func<T, TS>> orderByLambda, bool isAsc = true)
        {
            if (isAsc)
            {
                return _ctx.Set<T>().Where<T>(whereLambda).OrderBy<T, TS>(orderByLambda).Select(selector).ToList();
            }
            return _ctx.Set<T>().Where<T>(whereLambda).OrderByDescending<T, TS>(orderByLambda).Select(selector).ToList();
        }

        /// <summary>
        /// 返回实体部分字段列表
        /// </summary>
        /// <param name="selector"></param>
        /// <returns></returns>
        public List<TResult> ToListEx<TResult>(Expression<Func<T, TResult>> selector)
        {
            return _ctx.Set<T>().Select(selector).ToList();
        }
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
        public List<T> ToPageList<TS>(int offset, int pageSize, out  int total, Expression<Func<T, bool>> whereLambda, Expression<Func<T, TS>> orderByLambda, bool isAsc = true)
        {

            var temp = _ctx.Set<T>().Where<T>(whereLambda);
            total = temp.Count();//得到数据总条数
            if (isAsc)
            {
                temp = temp.OrderBy(orderByLambda)
                       .Skip<T>(offset)  //越过条数
                       .Take<T>(pageSize); //取出条数
            }
            else
            {
                temp = temp.OrderByDescending(orderByLambda)
                      .Skip<T>(offset) //越过条数
                      .Take<T>(pageSize); //取出条数
            }
            return temp.ToList();
        }

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
        public List<T> ToPageList<TS, TSt>(int offset, int pageSize, out int total, Expression<Func<T, bool>> whereLambda,
              Expression<Func<T, TS>> orderByLambda, Expression<Func<T, TSt>> thenByLambda, bool isAscOrderBy = true,
              bool isAscThenBy = true)
        {

            var temp = _ctx.Set<T>().Where<T>(whereLambda);
            total = temp.Count();//得到数据总条数
            if (isAscOrderBy)
            {
                if (isAscThenBy)
                {
                    temp = temp.OrderBy(orderByLambda).ThenBy(thenByLambda)
                         .Skip<T>(offset)  //越过条数
                         .Take<T>(pageSize);//取出条数
                }
                else
                {
                    temp = temp.OrderBy(orderByLambda).ThenByDescending(thenByLambda)
                        .Skip<T>(offset) //越过条数
                        .Take<T>(pageSize); //取出条数
                }
            }
            else
            {
                if (isAscThenBy)
                {
                    temp = temp.OrderByDescending(orderByLambda).ThenBy(thenByLambda)
                        .Skip<T>(offset) //越过条数
                        .Take<T>(pageSize); //取出条数
                }
                else
                {
                    temp = temp.OrderByDescending(orderByLambda).ThenByDescending(thenByLambda)
                        .Skip<T>(offset) //越过条数
                        .Take<T>(pageSize); //取出条数
                }

            }
            return temp.ToList();

        }
        #endregion

        #region 私有函数
        private int IsSaveChanges(bool isSaveChanges)
        {
            if (isSaveChanges)
            {
                return _ctx.SaveChanges();
            }
            return 0;
        }
        #endregion
    }
}
