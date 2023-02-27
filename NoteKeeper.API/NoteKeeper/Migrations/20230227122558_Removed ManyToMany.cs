using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoteKeeper.Migrations
{
    public partial class RemovedManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NoteTag");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NoteTag",
                columns: table => new
                {
                    NotesNoteId = table.Column<int>(type: "integer", nullable: false),
                    TagsTagId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NoteTag", x => new { x.NotesNoteId, x.TagsTagId });
                    table.ForeignKey(
                        name: "FK_NoteTag_Notes_NotesNoteId",
                        column: x => x.NotesNoteId,
                        principalTable: "Notes",
                        principalColumn: "NoteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_NoteTag_Tags_TagsTagId",
                        column: x => x.TagsTagId,
                        principalTable: "Tags",
                        principalColumn: "TagId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NoteTag_TagsTagId",
                table: "NoteTag",
                column: "TagsTagId");
        }
    }
}
