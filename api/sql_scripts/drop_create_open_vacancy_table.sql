USE [JobPortal]
GO

/****** Object:  Table [dbo].[OpenVacancy]    Script Date: 12/12/2020 9:26:50 AM ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[OpenVacancy]') AND type in (N'U'))
DROP TABLE [dbo].[OpenVacancy]
GO

/****** Object:  Table [dbo].[OpenVacancy]    Script Date: 12/12/2020 9:26:50 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[OpenVacancy](
	[Id] [smallint] IDENTITY(1,1) NOT NULL,
	[Position] [varchar](100) NULL,
	[DateEnd] [datetime] NULL,
	[HullNo] [varchar](100) NULL,
	[Qualification] [varchar](100) NULL,
	[CreatedBy] [varchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedBy] [varchar](100) NULL,
	[UpdatedDate] [datetime] NULL
) ON [PRIMARY]
GO

SET IDENTITY_INSERT [dbo].[OpenVacancy] ON 

INSERT [dbo].[OpenVacancy] ([Id], [Position], [DateEnd], [HullNo], [Qualification], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (1, N'2nd Officer', CAST(0x0000A98A00000000 AS DateTime), 'MW619-38', 'STPM', N'Admin', CAST(0x0000A964017D8029 AS DateTime), N'88', CAST(0x0000AA6500A5CB42 AS DateTime))
INSERT [dbo].[OpenVacancy] ([Id], [Position], [DateEnd], [HullNo], [Qualification], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (2, N'2nd Engineer', CAST(0x0000A96000000000 AS DateTime), 'MW619-38', 'SPM', N'Admin', CAST(0x0000A9640183D0C1 AS DateTime), NULL, NULL)
INSERT [dbo].[OpenVacancy] ([Id], [Position], [DateEnd], [HullNo], [Qualification], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (3, N'Electrician', CAST(0x0000A95C00000000 AS DateTime), 'MW619-38', 'A-level', N'', CAST(0x0000A964018521AA AS DateTime), NULL, NULL)
INSERT [dbo].[OpenVacancy] ([Id], [Position], [DateEnd], [HullNo], [Qualification], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (4, N'Master', CAST(0x0000A98900000000 AS DateTime), 'MW619-38', 'SPM', N'', CAST(0x0000A96C00F0D13D AS DateTime), NULL, NULL)
INSERT [dbo].[OpenVacancy] ([Id], [Position], [DateEnd], [HullNo], [Qualification], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (5, N'2nd Engineer', CAST(0x0000A98A00000000 AS DateTime), 'MW619-38', 'SPM', N'sam.tan@ncl.com.sg', CAST(0x0000A97A00AB2708 AS DateTime), NULL, NULL)
INSERT [dbo].[OpenVacancy] ([Id], [Position], [DateEnd], [HullNo], [Qualification], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (6, N'Bosun', CAST(0x0000A9C700000000 AS DateTime), 'MW619-38', 'SPM', N'88', CAST(0x0000A99300F64E2A AS DateTime), N'88', CAST(0x0000A9AC00B9DBF8 AS DateTime))
INSERT [dbo].[OpenVacancy] ([Id], [Position], [DateEnd], [HullNo], [Qualification], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (9, N'test engineer', CAST(0x0000AAC500000000 AS DateTime), 'MW619-38', 'SPM', N'89', CAST(0x0000AAAA0122E99C AS DateTime), NULL, NULL)
INSERT [dbo].[OpenVacancy] ([Id], [Position], [DateEnd], [HullNo], [Qualification], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (10, N'Master', CAST(0x0000AC2800000000 AS DateTime), 'MW619-38', 'SPM', N'89', CAST(0x0000AC2200B0D5FA AS DateTime), NULL, NULL)
INSERT [dbo].[OpenVacancy] ([Id], [Position], [DateEnd], [HullNo], [Qualification], [CreatedBy], [CreatedDate], [UpdatedBy], [UpdatedDate]) VALUES (7, N'Master', CAST(0x0000AA0200000000 AS DateTime), 'MW619-38', 'SPM', N'02', CAST(0x0000A9E600F7D930 AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[OpenVacancy] OFF
