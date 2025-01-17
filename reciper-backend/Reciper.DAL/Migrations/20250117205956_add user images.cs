using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reciper.DAL.Migrations
{
    /// <inheritdoc />
    public partial class adduserimages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserImages_Recipes_RecipeId",
                table: "UserImages");

            migrationBuilder.DropForeignKey(
                name: "FK_UserImages_Users_UserId",
                table: "UserImages");

            migrationBuilder.DropIndex(
                name: "IX_UserImages_RecipeId",
                table: "UserImages");

            migrationBuilder.DropColumn(
                name: "RecipeId",
                table: "UserImages");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "UserImages",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserImages_Users_UserId",
                table: "UserImages",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserImages_Users_UserId",
                table: "UserImages");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "UserImages",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "RecipeId",
                table: "UserImages",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_UserImages_RecipeId",
                table: "UserImages",
                column: "RecipeId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserImages_Recipes_RecipeId",
                table: "UserImages",
                column: "RecipeId",
                principalTable: "Recipes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserImages_Users_UserId",
                table: "UserImages",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
