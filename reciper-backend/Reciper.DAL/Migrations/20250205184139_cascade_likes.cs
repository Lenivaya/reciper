using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reciper.DAL.Migrations
{
    /// <inheritdoc />
    public partial class cascade_likes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeLikes_Users_UserId",
                table: "RecipeLikes");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeLikes_Users_UserId",
                table: "RecipeLikes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecipeLikes_Users_UserId",
                table: "RecipeLikes");

            migrationBuilder.AddForeignKey(
                name: "FK_RecipeLikes_Users_UserId",
                table: "RecipeLikes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
