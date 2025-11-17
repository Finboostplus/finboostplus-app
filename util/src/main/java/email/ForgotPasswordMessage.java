package email;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordMessage implements Serializable {
    private String email;
    private String name;
    private String password;
}
