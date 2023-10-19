using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TRQN.Backend.Migrations
{
    /// <inheritdoc />
    public partial class DefaultCategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "categories",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { 1, "Sneakers" },
                    { 2, "High-Tops" },
                    { 3, "Retro" },
                    { 4, "Skate" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "categories",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "categories",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "categories",
                keyColumn: "id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "categories",
                keyColumn: "id",
                keyValue: 4);
        }
    }
}
