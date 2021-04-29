using Microsoft.EntityFrameworkCore.Migrations;

namespace PMS.Migrations
{
    public partial class UpdatingDatabasev11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Free",
                table: "Parkings");

            migrationBuilder.AddColumn<string>(
                name: "OrderDate",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrderDate",
                table: "Orders");

            migrationBuilder.AddColumn<bool>(
                name: "Free",
                table: "Parkings",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
