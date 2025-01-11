using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reciper.DAL.Migrations
{
    /// <inheritdoc />
    public partial class addcompositeuniqueindexforratings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(name: "IX_Ratings_UserId", table: "Ratings");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_UserId_RecipeId",
                table: "Ratings",
                columns: new[] { "UserId", "RecipeId" },
                unique: true
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(name: "IX_Ratings_UserId_RecipeId", table: "Ratings");

            migrationBuilder.CreateIndex(
                name: "IX_Ratings_UserId",
                table: "Ratings",
                column: "UserId"
            );
        }
    }
}
