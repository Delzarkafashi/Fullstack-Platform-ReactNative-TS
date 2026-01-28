namespace Api.Dtos;

public class ResidentListItemDto

{
    public int Id { get; set; }
    public string FullName { get; set; } = "";
    public string? PersonalNumber { get; set; }
    public string Unit { get; set; } = "";
    public string? Room { get; set; }
    public string? Phone { get; set; }
    public string? EmergencyContact { get; set; }
    public bool IsActive { get; set; }
}
