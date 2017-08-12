using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega11.Migrations {
    public partial class SeedDatabase : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Toyota')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('BMW')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES ('Ford')");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Prius', (SELECT Id FROM Makes WHERE Name = 'Toyota'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Camry', (SELECT Id FROM Makes WHERE Name = 'Toyota'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Rav4', (SELECT Id FROM Makes WHERE Name = 'Toyota'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('i', (SELECT Id FROM Makes WHERE Name = 'BMW'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('330i', (SELECT Id FROM Makes WHERE Name = 'BMW'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('M6', (SELECT Id FROM Makes WHERE Name = 'BMW'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Focus', (SELECT Id FROM Makes WHERE Name = 'Ford'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Mustang', (SELECT Id FROM Makes WHERE Name = 'Ford'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) VALUES ('Taurus', (SELECT Id FROM Makes WHERE Name = 'Ford'))"); 
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.Sql("DELETE FROM Makes");
            migrationBuilder.Sql("DELETE FROM Models");
        }
    }
}
