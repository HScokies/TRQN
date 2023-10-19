﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TRQN.Backend.Data;

#nullable disable

namespace TRQN.Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TRQN.Backend.Models.Category", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("categories");

                    b.HasData(
                        new
                        {
                            id = 1,
                            name = "Sneakers"
                        },
                        new
                        {
                            id = 2,
                            name = "High-Tops"
                        },
                        new
                        {
                            id = 3,
                            name = "Retro"
                        },
                        new
                        {
                            id = 4,
                            name = "Skate"
                        });
                });

            modelBuilder.Entity("TRQN.Backend.Models.Product", b =>
                {
                    b.Property<string>("SKU")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("categoryid")
                        .HasColumnType("int");

                    b.Property<string>("colorway")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("descriptionShort")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("image")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("releaseDate")
                        .HasColumnType("date");

                    b.HasKey("SKU");

                    b.HasIndex("categoryid");

                    b.ToTable("products");
                });

            modelBuilder.Entity("TRQN.Backend.Models.Size", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<decimal>("price")
                        .HasColumnType("smallmoney");

                    b.Property<string>("productId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("size")
                        .HasColumnType("float");

                    b.HasKey("id");

                    b.HasIndex("productId");

                    b.ToTable("sizes");
                });

            modelBuilder.Entity("TRQN.Backend.Models.User", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("id"));

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("role")
                        .HasColumnType("int");

                    b.Property<Guid>("token")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("id");

                    b.ToTable("users");
                });

            modelBuilder.Entity("TRQN.Backend.Models.Product", b =>
                {
                    b.HasOne("TRQN.Backend.Models.Category", "category")
                        .WithMany()
                        .HasForeignKey("categoryid")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("category");
                });

            modelBuilder.Entity("TRQN.Backend.Models.Size", b =>
                {
                    b.HasOne("TRQN.Backend.Models.Product", null)
                        .WithMany("sizes")
                        .HasForeignKey("productId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TRQN.Backend.Models.Product", b =>
                {
                    b.Navigation("sizes");
                });
#pragma warning restore 612, 618
        }
    }
}
