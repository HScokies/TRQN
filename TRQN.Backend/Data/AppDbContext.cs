using Microsoft.EntityFrameworkCore;
using System;
using TRQN.Backend.Models;

namespace TRQN.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Category> categories { get; set; }
        public DbSet<Product> products { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<Size> sizes { get; set; }
        public DbSet<Cart> cart { get; set; }
        public DbSet<Country> countries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Size>().Property(p => p.price).HasColumnType("smallmoney");

            modelBuilder.Entity<Country>().Property(p => p.tax).HasColumnType("decimal(3,2)");
            modelBuilder.Entity<Country>().Property(p => p.shipping).HasColumnType("smallmoney");

            modelBuilder.Entity<Category>().HasData(
                new Category() { id = 1, name = "Sneakers" },
                new Category() { id = 2, name = "High-Tops" },
                new Category() { id = 3, name = "Retro" },
                new Category() { id = 4, name = "Skate" }
                );
        }
    }
}
