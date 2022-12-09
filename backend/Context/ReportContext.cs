using Microsoft.EntityFrameworkCore;
using ProgKnow.Models;

namespace ProgKnow.Context
{
    public class ReportContext : DbContext, IReportContext
    {
        public DbSet<ReportedProgtermsTable> ReportedProgtermsTable { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(System.Configuration.ConfigurationManager.AppSettings["ConnectionStrings:SqlConnection"]);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ReportedProgtermsTable>(entity =>
            {
                entity.ToTable("reportedprogtermstable");
                entity.Property(e => e.Id)
                    .HasMaxLength(24)
                    .HasColumnName("id")
                    .IsFixedLength();
                entity.Property(e => e.Count).HasColumnName("count");
            });

        }

        public async Task<bool> ReportAsync(string id)
        {
            using (var db = new ReportContext())
            {
                try
                {
                    ReportedProgtermsTable? report = await db.Get(id);

                    if (report != null)
                    {
                        report.Count++;
                        await db.SaveChangesAsync();
                    }

                    else
                    {
                        report = new ReportedProgtermsTable()
                        {
                            Id = id,
                            Count = 1
                        };
                        await db.ReportedProgtermsTable.AddAsync(report);
                        await db.SaveChangesAsync();
                    }

                    return true;
                }

                catch
                {
                    return false;
                }

            }
        }

        public bool HasProgTermAlreadyBeenReported(string id)
        {
            return (from rep in ReportedProgtermsTable
                    where rep.Id == id
                    select rep).First() != null;
        }

        public async Task<ReportedProgtermsTable?> Get(string id)
        {
            return await (from rep in ReportedProgtermsTable
                    where rep.Id == id
                    select rep).FirstOrDefaultAsync();
        }
        
    }
}
